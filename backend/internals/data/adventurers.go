package data

import (
	"context"
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

func (m AdventurerModel) Insert(adventurer *Adventurer) error {
	query := `
		INSERT INTO adventurers(user_id, class)
		VALUES ($1, $2)
		RETURNIN id, created_at
		`

	args := []interface{}{adventurer.ID, adventurer.Class}

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	return m.DB.QueryRowContext(ctx, query, args...).Scan(&adventurer.ID, &adventurer.CreatedAt)
}
