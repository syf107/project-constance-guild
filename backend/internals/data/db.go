package data

import (
	"database/sql"
	"fmt"
	"log"
	"time"
)

func OpenDB(dsn string) (*sql.DB, error) {

	db, err := sql.Open("postgres", dsn)
	if err != nil {
		log.Fatal("Missing database connection string: ", err)
	}

	// Set database connection settings.
	db.SetMaxOpenConns(25)
	db.SetMaxIdleConns(10)
	db.SetConnMaxIdleTime(5 * time.Minute)

	// Test database connection
	err = db.Ping()
	if err != nil {
		return nil, err
	}

	fmt.Println("Database connected successfully")
	return db, nil

}
