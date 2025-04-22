package errors

import (
	"net/http"
)

// log Error method, generic helper for loggin an error message in *application, in requested method and request URL.

// errorResponse.
func errorResponse(w http.ResponseWriter, r *http.Request, status int, message interface{}) {
	// env := envelope{"error": message}

	// err := helpers.WriteJSON()(w, status, env, nil)
	// if err != nil {
	// 	w.WriteHeader(500)
	// }
}
