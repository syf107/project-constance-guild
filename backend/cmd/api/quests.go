package main

import (
	"fmt"
	"net/http"

	"github.com/syf107/constance-guild-project/internals/data"
)

// Quest Handler
func (app *application) createQuestHandler(w http.ResponseWriter, r *http.Request) {
	var input struct {
		Title        string   `json:"title" validate:"required"`
		Description  string   `json:"description" validate:"required"`
		Type         string   `json:"type" validate:"required, oneof='Kill Monsters' 'Collect Items' 'Protect/Escort'"`
		Difficulty   int32    `json:"difficulty" validate:"required, gte=1,lte=5"`
		Location     string   `json:"location" validate:"required"`
		RewardPoints int64    `json:"reward_points" validate:"required,gt=0"`
		RewardGold   int64    `json:"reward_golds" validate:"required,gt=0"`
		RewardItems  []string `json:"reward_items" validate:"required,dive,required"`
		TimeToDoDays int32    `json:"time_to_do_days" validate:"required,gt=0"`
	}

	// read the data and put it to the input.
	if err := app.readJSON(w, r, &input); err != nil {
		app.badRequestResponse(w, r, err)
		return
	}

	// validate the data.
	if err := app.validator.Struct(input); err != nil {
		errors := app.collectValidationErrors(err)
		app.failedValidationResponse(w, r, errors)
		return
	}

	// put all the freaking data.
	quest := &data.Quest{
		Title:        input.Title,
		Description:  input.Description,
		Type:         input.Type,
		Difficulty:   input.Difficulty,
		Location:     input.Location,
		RewardPoints: input.RewardPoints,
		RewardGold:   input.RewardGold,
		RewardItems:  input.RewardItems,
		TimeToDoDays: input.TimeToDoDays,
	}

	if err := app.models.Quests.Insert(quest); err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	headers := make(http.Header)
	headers.Set("Location", fmt.Sprintf("/v1/quests/%d", quest.ID))

	if err := app.writeJSON(w, http.StatusCreated, envelope{"quest": quest}, headers); err != nil {
		app.serverErrorResponse(w, r, err)
	}

}

func (app *application) showAllQuestsHandler(w http.ResponseWriter, r *http.Request) {
	quests, err := app.models.Quests.GetAll()
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}

	if err := app.writeJSON(w, http.StatusOK, envelope{"quests": quests}, nil); err != nil {
		app.serverErrorResponse(w, r, err)
	}

}

func (app *application) showOneQuestHandler(w http.ResponseWriter, r *http.Request) {

}

// quest application handler
func (app *application) applyQuestsHandler(w http.ResponseWriter, r *http.Request) {

}

func (app *application) listAdventurerAppliedQuestHandler(w http.ResponseWriter, r *http.Request) {

}

func (app *application) showOneAppliedQuest(w http.ResponseWriter, r *http.Request) {

}

func (app *application) withdrawAppliedQuestHandler(w http.ResponseWriter, r *http.Request) {

}

func (app *application) completeAppliedQuestHandler(w http.ResponseWriter, r *http.Request) {

}
