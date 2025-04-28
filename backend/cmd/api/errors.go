package main

import (
	"fmt"
	"net/http"
)

func (app *application) logError(r *http.Request, err error) {
	app.logger.Println(err)
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
