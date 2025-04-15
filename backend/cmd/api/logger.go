package main

import (
	"log"
	"os"
)

func New() *log.Logger {
	return log.New(os.Stdout, "INFO\t", log.Ldate|log.Ltime)

}
