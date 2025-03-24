package routes

import (
	"net/http"

	"github.com/go-chi/chi/v5"
)

// Routes initializes the router and defines API endpoints
func Routes() *chi.Mux {
	r := chi.NewRouter()

	// Define routes
	r.Get("/users", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Temporary request."))
	})
	// r.Post("/users", CreateUserHandler)


	return r
}