package main

import (
	"errors"
	"net/http"
	"time"

	"github.com/syf107/constance-guild-project/internals/data"
)

// USER handler
func (app *application) registerUserHandler(w http.ResponseWriter, r *http.Request) {
	var input struct {
		FullName string `json:"full_name" validate:"required"`
		Email    string `json:"email" validate:"required,email"`
		Password string `json:"password" validate:"required,min=6"`
	}

	// read the input data
	if err := app.readJSON(w, r, &input); err != nil {
		app.badRequestResponse(w, r, err)
		return
	}

	//validating the input
	if err := app.validator.Struct(input); err != nil {
		errors := app.collectValidationErrors(err)
		app.failedValidationResponse(w, r, errors)
		return
	}

	user := &data.User{
		FullName:  input.FullName,
		Email:     input.Email,
		Activated: false,
	}

	//hash password.
	if err := user.Password.Set(input.Password); err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	err := app.models.Users.Insert(user)
	if err != nil {
		switch {
		case errors.Is(err, data.ErrDuplicateEmail):
			app.failedValidationResponse(w, r, map[string]string{"email": "a user with this email already exists"})
		default:
			app.serverErrorResponse(w, r, err)
		}
		return
	}

	token, err := app.models.Tokens.New(user.ID, 3*24*time.Hour, data.ScopeActivation)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	// Later you can send the token to email, for now return in JSON
	app.writeJSON(w, http.StatusCreated, envelope{
		"message": "user registered",
		"token":   token.Plaintext,
	}, nil)

}

func (app *application) activateUserHandler(w http.ResponseWriter, r *http.Request) {
	var input struct {
		TokenPlaintext string `json:"token" validate:"required,len=26"`
	}

	// read the json and put it to input variable.
	if err := app.readJSON(w, r, &input); err != nil {
		app.badRequestResponse(w, r, err)
		return
	}

	// validate the token
	if err := app.validator.Struct(input); err != nil {
		errors := app.collectValidationErrors(err)
		app.failedValidationResponse(w, r, errors)
		return
	}

	// get the user from the token.
	user, err := app.models.Users.GetForToken(data.ScopeActivation, input.TokenPlaintext)
	if err != nil {
		app.badRequestResponse(w, r, err)
		return
	}

	// change the value of user into activated.
	user.Activated = true

	// update the new user value to users, with activated = true
	err = app.models.Users.Update(user)
	if err != nil {
		switch {
		case errors.Is(err, data.ErrEditConflict):
			app.editConflictResponse(w, r)
		default:
			app.serverErrorResponse(w, r, err)
		}
	}

	// delete all the token with scope and user related.
	err = app.models.Tokens.DeleteAllForUser(data.ScopeActivation, user.ID)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}

	err = app.writeJSON(w, http.StatusOK, envelope{"user": user}, nil)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
}
