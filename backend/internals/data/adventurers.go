package data

import (
	"database/sql"
	"time"
)

type Adventurer struct {
	ID                 int64     `json:"id"`
	UserID             int64     `json:"user_id"`
	Class              string    `json:"class"`
	Reputation         string    `json:"reputation"`
	Party              string    `json:"party"`
	ContributionPoints int       `json:"contribution_points"`
	CreatedAt          time.Time `json:"created_at"`
}

type AdventurerModel struct {
	DB *sql.DB
}
