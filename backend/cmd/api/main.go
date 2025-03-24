package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	_ "github.com/lib/pq"
)

func main() {
	r := chi.NewRouter()

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("API is running..."))
	})

	r.Get("/users", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("This going to be the users information."))
	})

	dbURL := os.Getenv("DATABASE_URL")
	db, err := sql.Open("postgres", dbURL)
	if err != nil {
		log.Fatal(err)
	}

	defer db.Close()

	fmt.Println("Server running on the port 8000")
	http.ListenAndServe(":8000", r)

}