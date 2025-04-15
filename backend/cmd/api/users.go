package main

import (
	"fmt"
	"net/http"
)

// USER handler
func (app *application) registerUserHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("RegisterUser Handler Hit!!")
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"message": "Route is connected."}`))
}

func (app *application) activateUserHandler(w http.ResponseWriter, r *http.Request) {

}
