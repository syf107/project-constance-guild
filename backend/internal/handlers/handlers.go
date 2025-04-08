package handlers

import (
	"net/http"

	"github.com/syf107/constance-guild-project/internal/helpers"
)

func createQuestHandler(w http.ResponseWriter, r *http.Request) {
	resp := map[string]string{"message": "pong"}
	helpers.WriteJSON(w, http.StatusOK, resp, nil)
}
