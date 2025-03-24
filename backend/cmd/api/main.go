package main

import (
	"log"
	"net/http"
	"os"

	_ "github.com/lib/pq"
	"github.com/syf107/constance-guild-project/internal/data"
	"github.com/syf107/constance-guild-project/internal/routes"
)

func main() {
	// Initialize the database

	db, err := data.OpenDB()
	if err != nil {
		log.Fatal(err)
	}

	defer db.Close()

	// Setup the router
	r := routes.Routes()

	// Start the server
	port := os.Getenv("PORT")
	if port == "" {
		port = "4000"
	}

	log.Println("Server running on port", port)
	err = http.ListenAndServe(":"+port, r)
	if err != nil {
		log.Fatal("Server error:", err)
	}

}