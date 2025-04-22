package main

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/syf107/constance-guild-project/internals/data"
	"github.com/syf107/constance-guild-project/internals/helpers"
)

// USER handler
func (app *application) registerUserHandler(w http.ResponseWriter, r *http.Request) {
	var input struct {
		FullName string `json:"full_name" validate:"required"`
		Email    string `json:"email" validate:"required,email"`
		Password string `json:"password" validate:"required,min8"`
	}

	// read the input data
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	//validating the input
	if err := app.Validator.Struct(input); err != nil {
		http.Error(w, "Validation failed: "+err.Error(), http.StatusUnprocessableEntity)
		return
	}

	user := &data.User{
		FullName:  input.FullName,
		Email:     input.Email,
		Activated: false,
	}

	//hash password.
	if err := user.Password.Set(input.Password); err != nil {
		http.Error(w, "Failed to hash password", http.StatusInternalServerError)
		return
	}

	err := app.Models.Users.Insert(user)
	if err != nil {
		http.Error(w, "Could not create user", http.StatusInternalServerError)
		return
	}

	token, err := app.Models.Tokens.New(user.ID, 3*24*time.Hour, data.ScopeActivation)
	if err != nil {
		http.Error(w, "Failed to generate token", http.StatusInternalServerError)
		return
	}

	// Later you can send the token to email, for now return in JSON
	helpers.WriteJSON(w, http.StatusCreated, helpers.Envelope{
		"message": "user registered",
		"token":   token.Plaintext,
	}, nil)

}

func (app *application) activateUserHandler(w http.ResponseWriter, r *http.Request) {
	var input struct {
		TokenPlaintext string `json:"email" validate:"required, len=26"`
	}

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	// validate the token
	if err := app.Validator.Struct(input); err != nil {
		http.Error(w, "Validation error:"+err.Error(), http.StatusUnprocessableEntity)
		return
	}

	user, err := app.Models.Users.GetForToken(data.ScopeActivation, input.TokenPlaintext)

	user.Activated = true

	err = app.Models.Users.Update(user)
	if err != nil {
		http.Error(w, "Could not activate user", http.StatusInternalServerError)
		return
	}

	err = app.Models.Tokens.DeleteAllForUser(data.ScopeActivation, user.ID)
	if err != nil {
		http.Error(w, "Token cleanup failed", http.StatusInternalServerError)
	}

	helpers.WriteJSON(w, http.StatusOK, helpers.Envelope{"message": "activated"}, nil)
}
