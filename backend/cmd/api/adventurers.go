package main

import (
	"fmt"
	"net/http"

	"github.com/syf107/constance-guild-project/internals/data"
)

// Adventurer Handler
func (app *application) createAdventurerHandler(w http.ResponseWriter, r *http.Request) {
	// declare anonymous struct to hold the info.
	var input struct {
		Class string `json:"class" validate:"required,oneof=warrior assassin mage range cleric"`
	}

	// read the input.
	if err := app.readJSON(w, r, &input); err != nil {
		app.badRequestResponse(w, r, err)
		return
	}

	// validating the data.
	if err := app.validator.Struct(input); err != nil {
		errors := app.collectValidationErrors(err)
		app.failedValidationResponse(w, r, errors)
		return
	}

	// put all the data into the
	adventurer := &data.Adventurer{
		UserID: user.ID,
		Class:  input.Class,
	}

	if err := app.models.Adventurers.Insert(adventurer); err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	headers := make(http.Header)
	headers.Set("Location", fmt.Sprintf("/v1/adventurers/%d", adventurer.ID))

	if err := app.writeJSON(w, http.StatusCreated, envelope{"adventurer": adventurer}, headers); err != nil {
		app.serverErrorResponse(w, r, err)
	}

}

func (app *application) listOfAdventurersHandler(w http.ResponseWriter, r *http.Request) {

}

func (app *application) showMyAdventurerDataHandler(w http.ResponseWriter, r *http.Request) {

}

func (app *application) updateMyAdventurerDataHandler(w http.ResponseWriter, r *http.Request) {

}

func (app *application) showAdventurerHandler(w http.ResponseWriter, r *http.Request) {

}
