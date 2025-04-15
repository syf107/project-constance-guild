package main

import (
	"fmt"
	"net/http"
)

// User handler
func RegisterUserHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("RegisterUser Handler Hit!!")
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"message": "Route is connected."}`))

}

// Quest Handler
func CreateQuestHandler(w http.ResponseWriter, r *http.Request) {
}

func ShowQuestHandler(w http.ResponseWriter, r *http.Request) {

}

func ApplyQuestsHandler(w http.ResponseWriter, r *http.Request) {

}

func ShowAppliedQuestHandler(w http.ResponseWriter, r *http.Request) {

}

func CancelAppliedQuestHandler(w http.ResponseWriter, r *http.Request) {

}

// Adventurer Handler
func CreateAdventurerHandler(w http.ResponseWriter, r *http.Request) {

}

func ShowAdventurersHandler(w http.ResponseWriter, r *http.Request) {

}

// Notification Handler
