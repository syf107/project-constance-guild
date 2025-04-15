package routes

import (
	"net/http"

	"github.com/go-chi/chi/v5"
)

// Routes initializes the router and defines API endpoints
func (app *application) routes() http.Handler {
	r := chi.NewRouter()

	userHandler := handlers.

		// adventurers handler.
		r.Post("/v1/register", app.RegisterUserHandler)

	// quest handlers.
	r.Post("/v1/quests", handlers.CreateQuestHandler)

	r.Get("/v1/healthcheck", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Temporary request."))
	})

	return r
}
