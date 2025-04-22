package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
)

// Routes initializes the router and defines API endpoints
func (app *application) routes() http.Handler {
	r := chi.NewRouter()

	//user handler
	r.Post("/v1/users", app.registerUserHandler)
	r.Put("/v1/users/activated", app.activateUserHandler)

	// quest handlers.
	r.Post("/v1/quests", app.createQuestHandler)
	r.Get("/v1/quests", app.showAllQuestsHandler)
	r.Get("v1/quests/{id}", app.showOneQuestHandler)

	// adventurer handlers.
	r.Post("/v1/adventurers", app.createAdventurerHandler)
	r.Get("/v1/adventurers", app.showAdventurersHandler)
	r.Put("/v1/adventurers/{id}", app.redeemAdventurerPrizeHandler) // notification button

	// quest application handler.
	r.Post("/v1/quests/applications", app.applyQuestsHandler)
	r.Get("/v1/quests/applications/{id}", app.showAllAppliedQuest)
	r.Get("/v1/quests/applications/{id}", app.showOneAppliedQuest)
	r.Put("/v1/quests/applications/{id}", app.withdrawAppliedQuestHandler)
	r.Put("/v1/quests/applications/{id}", app.completeAppliedQuestHandler)
	r.Delete("/v1/quests/applications/{id}", app.deleteAppliedQuestHandler)

	// party handler
	r.Post("/v1/parties", app.createPartyHandler)
	r.Get("/v1/parties", app.showAllPartiesHandler)
	r.Get("/v1/parties/{id}", app.showPartyDetailsHandler)
	r.Put("/v1/parties/{id}", app.addPartyMemberHandler)
	r.Put("/v1/parties/{id}", app.requestJoinPartyHandler)
	r.Put("/v1/parties/{id}", app.leavePartyHandler)
	r.Delete("/v1/parties/{id}", app.disbandPartyHandler)

	// notification handler
	r.Get("/v1/notifications", app.showAllNotifications)
	r.Post("/v1/notifications", app.addNewNotification)
	r.Delete("/v1/notifications", app.deleteNotificationHandler)

	return r
}
