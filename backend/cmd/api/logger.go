package main

import (
	"log"
	"os"
)

func (app *application) New() *log.Logger {
	return log.New(os.Stdout, "INFO\t", log.Ldate|log.Ltime)

}
