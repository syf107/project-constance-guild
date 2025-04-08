package routes

import (
	"net/http"

	"github.com/go-chi/chi/v5"
)

// Routes initializes the router and defines API endpoints
func Routes() *chi.Mux {
	r := chi.NewRouter()

	// adventurers handler.

	// quest handlers.
	r.Post("v1/quests", handlers.createQuestHandler)

	r.Get("/v1/healthcheck", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Temporary request."))
	})

	return r
}
