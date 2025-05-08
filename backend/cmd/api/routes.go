package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
)

// Routes initializes the router and defines API endpoints
func (app *application) routes() http.Handler {
	r := chi.NewRouter()

	r.NotFound(app.notFoundResponse)
	r.MethodNotAllowed(app.methodNotAllowedResponse)

	//user handler
	r.Post("/v1/users", app.registerUserHandler)
	r.Put("/v1/users/activated", app.activateUserHandler)

	// adventurer handlers.
	r.Post("/v1/adventurers", app.createAdventurerHandler)
	r.Get("/v1/adventurers", app.listOfAdventurersHandler)
	r.Get("/v1/adventurers/{id}", app.showAdventurerHandler)
	r.Get("/v1/adventurers/user", app.showMyAdventurerDataHandler)
	r.Put("/v1/adventurers/user", app.updateMyAdventurerDataHandler) // notification button

	// quest handlers.
	r.Post("/v1/quests", app.createQuestHandler)
	r.Get("/v1/quests", app.showAllQuestsHandler)

	// quest application handler.
	r.Post("/v1/quests/applications", app.applyQuestsHandler)
	r.Get("/v1/quests/applications", app.listAdventurerAppliedQuestHandler)
	r.Put("/v1/quests/applications/{id}", app.withdrawAppliedQuestHandler)
	r.Put("/v1/quests/applications/{id}", app.completeAppliedQuestHandler)

	// party handler
	r.Post("/v1/parties", app.createPartyHandler)
	r.Get("/v1/parties", app.showAllPartiesHandler)
	r.Get("/v1/parties/{id}", app.showPartyDetailsHandler)
	r.Put("/v1/parties/{id}", app.addPartyMemberHandler)
	r.Put("/v1/parties/{id}", app.requestJoiningParty)
	r.Put("/v1/parties/{id}", app.leavePartyHandler)
	r.Delete("/v1/parties/{id}", app.disbandPartyHandler)

	// notification handler
	r.Get("/v1/notifications", app.showAllNotifications)
	r.Post("/v1/notifications", app.addNewNotification)
	r.Delete("/v1/notifications", app.deleteNotificationHandler)

	return r
}
