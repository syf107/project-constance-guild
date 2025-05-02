package main

import (
	"fmt"
	"net/http"

	"github.com/go-playground/validator"
)

func (app *application) logError(r *http.Request, err error) {
	app.logger.PrintError(err, map[string]string{
		"request_method": r.Method,
		"request_url":    r.URL.String(),
	})
}

func (app *application) erroResponse(w http.ResponseWriter, r *http.Request, status int, message interface{}) {
	env := envelope{"error": message}

	err := app.writeJSON(w, status, env, nil)
	if err != nil {
		app.logError(r, err)
		w.WriteHeader(500)
	}
}

// The serverErrorResponse() method will be used when our application encounters an
// unexpected problem at runtime. It logs the detailed error message, then uses the
// errorResponse() helper to send a 500 Internal Server Error status code and JSON
// response (containing a generic error message) to the client.
func (app *application) serverErrorResponse(w http.ResponseWriter, r *http.Request, err error) {
	app.logError(r, err)

	message := "the server encountered a problem and could not process your request"
	app.erroResponse(w, r, http.StatusInternalServerError, message)
}

// not found error route
func (app *application) notFoundResponse(w http.ResponseWriter, r *http.Request) {
	message := "the requested resource could not be found"
	app.erroResponse(w, r, http.StatusNotFound, message)
}

// method not allowed route
func (app *application) methodNotAllowedResponse(w http.ResponseWriter, r *http.Request) {
	message := fmt.Sprintf("the %s method is not supported for this resource", r.Method)
	app.erroResponse(w, r, http.StatusMethodNotAllowed, message)
}

// bad request response for error 400 bad request
func (app *application) badRequestResponse(w http.ResponseWriter, r *http.Request, err error) {
	app.erroResponse(w, r, http.StatusBadRequest, err.Error())
}

func (app *application) translateValidationError(e validator.FieldError) string {
	switch e.Tag() {
	case "required":
		return "this field is required"
	case "email":
		return "must be a valid email address"
	case "min":
		return "must be at least " + e.Param() + " characters long"
	case "len":
		return "must be exactly " + e.Param() + " characters long"
	default:
		return "invalid value"
	}
}

func (app *application) collectValidationErrors(err error) map[string]string {
	errors := make(map[string]string)

	validationErrors, ok := err.(validator.ValidationErrors)
	if !ok {
		// not a validation error --return empty map
		return errors
	}

	for _, e := range validationErrors {
		errors[e.Field()] = app.translateValidationError(e)
	}

	return errors

}

// error unprocessiable entity 422 status
func (app *application) failedValidationResponse(w http.ResponseWriter, r *http.Request, errors map[string]string) {
	app.erroResponse(w, r, http.StatusUnprocessableEntity, errors)
}

// edit conflict response 409 conflict status code.
func (app *application) editConflictResponse(w http.ResponseWriter, r *http.Request) {
	message := "unable to update the record due to an edit conflict, please try again"
	app.erroResponse(w, r, http.StatusConflict, message)
}

// rate limit exceeded, 429 too many request
func (app *application) rateLimitExceededResponse(w http.ResponseWriter, r *http.Request) {
	message := "rate limit exceeded"
	app.erroResponse(w, r, http.StatusTooManyRequests, message)
}

// invalid credentials, errors with 401 unauthorized status code.
func (app *application) invalidCredentialsResponse(w http.ResponseWriter, r *http.Request) {
	message := "invalid authentication credentials"
	app.erroResponse(w, r, http.StatusUnauthorized, message)
}

// invalidAuthenticationTokenResponse sends a JSON-formatted error with a 401 Unauthorized status code and "WWW-Authenticate: Bearer" header to the client.
func (app *application) invalidAuthenticationTokenResponse(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("WWW-Authenticate", "Bearer")

	message := "invalid or missing authentication token"
	app.erroResponse(w, r, http.StatusUnauthorized, message)
}

func (app *application) inactiveAccountResponse(w http.ResponseWriter, r *http.Request) {
	message := "your user account must be activated to access this resource"
	app.erroResponse(w, r, http.StatusForbidden, message)
}

func (app *application) notPermittedResponse(w http.ResponseWriter, r *http.Request) {
	message := "your user account doesn't have the necessary permission to access this resource."
	app.erroResponse(w, r, http.StatusForbidden, message)
}
