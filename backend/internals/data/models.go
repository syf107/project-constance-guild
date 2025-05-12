package data

import (
	"database/sql"
	"errors"
	"log"
	"os"
)

var (

	// ErrRecordNotFound is returned when a movie record doesn't exist in database.
	ErrRecordNotFound = errors.New("record not found")

	// ErrEditConflict is returned when a there is a data race, and we have an edit conflict.
	ErrEditConflict = errors.New("edit conflict")
)

type Models struct {
	Users       UserModel
	Tokens      TokenModel
	Adventurers AdventurerModel
	Quests      QuestModel
}

func NewModels(db *sql.DB) Models {
	infoLog := log.New(os.Stdout, "INFO\t", log.Ldate|log.Ltime)
	errorLog := log.New(os.Stderr, "ERROR\t", log.Ldate|log.Ltime|log.Lshortfile)
	return Models{
		Users: UserModel{
			DB:       db,
			InfoLog:  infoLog,
			ErrorLog: errorLog,
		},
		Tokens: TokenModel{
			DB:       db,
			InfoLog:  infoLog,
			ErrorLog: errorLog},
		Adventurers: AdventurerModel{
			DB:       db,
			InfoLog:  infoLog,
			ErrorLog: errorLog},
		Quests: QuestModel{
			DB:       db,
			InfoLog:  infoLog,
			ErrorLog: errorLog},
	}
}
