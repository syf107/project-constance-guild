package main

import (
	"errors"
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
		token := headerParts[1]

		// validate if the token is there and has 26 characters.
		if token == "" || len(token) != 26 {
			app.invalidAuthenticationTokenResponse(w, r)
			return
		}

		// retrieve the details of user associated with the authentication token.
		user, err := app.models.Users.GetForToken(data.ScopeAuthentication, token)
		if err != nil {
			switch {
			case errors.Is(err, data.ErrRecordNotFound):
				app.invalidAuthenticationTokenResponse(w, r)
			default:
				app.serverErrorResponse(w, r, err)
			}
		}

		// Call the contextSetUser header to add the user information to the request context.
		r = app.contextSetUser(r, user)

		next.ServeHTTP(w, r)
	})
}

// requireAuthenticatedUser checks that the user is not anonymous (i.e., they are authenticated).
func (app *application) requireAuthenticatedUser(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Use the contextGetUser helper to retrieve the user information from the request context.
		user := app.contextGetUser(r)

		// If the user is anonymous, then call authenticationRequiredResponse to inform the client
		// that they should be authenticated before trying again.
		if user.IsAnonymous() {
			app.authenticationRequiredResponse(w, r)
			return
		}

		next.ServeHTTP(w, r)

	})
}

// requiredActivatedUser checks that the user is both authenticated and activated.
func (app *application) requiredActivatedUser(next http.Handler) http.Handler {
	fn := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Retrieve the user from the request context.
		user := app.contextGetUser(r)

		// Check that a user is activated
		if !user.Activated {
			app.inactiveAccountResponse(w, r)
			return
		}
		next.ServeHTTP(w, r)

	})
	return app.requireAuthenticatedUser(fn)
}
