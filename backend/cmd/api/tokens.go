package main

import (
	"errors"
	"net/http"

	"github.com/syf107/constance-guild-project/internals/data"
)

func (app *application) createAuthenticationTokenHandler(w http.ResponseWriter, r *http.Request) {
	var input struct {
		Email    string `json:"email" validate:"required,email"`
		Password string `json:"password" validate:"required,min=7"`
	}

	if err := app.readJSON(w, r, &input); err != nil {
		app.badRequestResponse(w, r, err)
		return
	}

	// email, password validation check
	if err := app.validator.Struct(input); err != nil {
		errors := app.collectValidationErrors(err)
		app.failedValidationResponse(w, r, errors)
		return
	}

	// check if there's any user with that email.
	if user, err := app.models.Users.GetByEmail(input.Email); err != nil {
		switch {
		case errors.Is(err, data.ErrRecordNotFound):
			app.invalidCredentialsResponse(w, r)
		default:
			app.serverErrorResponse(w, r, err)
		}
		return
	}

	// Check if the provided password matches the actual password from user we get.

}
