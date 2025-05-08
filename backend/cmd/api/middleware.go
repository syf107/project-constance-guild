package main

import (
	"net/http"
	"strings"

	"github.com/syf107/constance-guild-project/internals/data"
)

// Logging

// Rate limiting

// Panic recovery

// CORS

// Auth
func (app *application) authenticate(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Add the "Vary: Authorization" header to the response.
		w.Header().Set("Vary", "Authorization")

		// Retrieve the value of the Authorization header from the request.
		authorizationHeader := r.Header.Get("Authorization")

		// If there is no Authorization header found, use the contextSetUser() helper to add
		// an AnonymousUser to the request context.
		if authorizationHeader == "" {
			r = app.contextSetUser(r, data.AnonymousUser)
			next.ServeHTTP(w, r)
			return
		}

		// breaking down the value of authorization.
		headerParts := strings.Split(authorizationHeader, " ")
		if len(headerParts) != 2 || headerParts[0] != "Bearer" {
			app.invalidAuthenticationTokenResponse(w, r)
			return
		}

		// Extract the actual authentication toekn from the header parts
		tokenPlain := headerParts[1]
		if tokenPlain == "" || len(tokenPlain) != 26 {
			app.invalidAuthenticationTokenResponse(w, r)
			return
		}

		next.ServeHTTP(w, r)

	})

}
