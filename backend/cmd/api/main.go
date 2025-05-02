package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/syf107/constance-guild-project/internals/data"
	"github.com/syf107/constance-guild-project/internals/jsonlog"

	_ "github.com/lib/pq"
)

// config holds app-wide settings.
type config struct {
	port int
	env  string
	dsn  string
}

// application holds dependencies.
type application struct {
	config    config
	Models    data.Models
	Validator *validator.Validate
	logger    *jsonlog.Logger
}

func main() {
	// Declaring config struct
	var cfg config

	flag.IntVar(&cfg.port, "port", 4000, "API server port")
	flag.StringVar(&cfg.env, "env", "development", "Environment (development | staging | production)")
	flag.StringVar(&cfg.dsn, "db-dsn", os.Getenv("CONSTANCEGUILD_DB_DSN"), "PostgreSQL DSN")
	flag.Parse()

	logger := jsonlog.NewLogger(os.Stdout, jsonlog.LevelInfo)

	db, err := data.OpenDB(cfg.dsn)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	app := &application{
		config:    cfg,
		Models:    data.NewModels(db),
		Validator: validator.New(),
		logger:    logger,
	}

	srv := &http.Server{
		Addr:         fmt.Sprintf(":%d", cfg.port),
		Handler:      app.routes(),
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	log.Printf("Starting server on :%d", cfg.port)
	err = srv.ListenAndServe()
	log.Fatal(err)
}
