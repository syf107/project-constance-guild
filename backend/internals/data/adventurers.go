package data

import (
	"context"
	"database/sql"
	"log"
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

type AdventurerWithUser struct {
	ID                 int64  `json:"id"`
	Class              string `json:"class"`
	Reputation         string `json:"reputation"`
	Party              string `json:"party"`
	ContributionPoints int    `json:"contribution_points"`
	FullName           string `json:"full_name"`
}

type AdventurerModel struct {
	DB       *sql.DB
	InfoLog  *log.Logger
	ErrorLog *log.Logger
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

func (m AdventurerModel) GetAll() ([]*AdventurerWithUser, error) {
	query := `
		SELECT adventurers.id, adventurers.class,  adventurers.reputation, adventurers.party, adventurers.contribution_points 
		FROM adventurers 
		JOIN users ON adventurers.user_id = users.id
		`

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	rows, err := m.DB.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer func() {
		if err := rows.Close(); err != nil {
			m.ErrorLog.Println(err)
		}
	}()

	adventurers := []*AdventurerWithUser{}

	for rows.Next() {
		var adventurer AdventurerWithUser

		err := rows.Scan(
			&adventurer.ID,
			&adventurer.Class,
			&adventurer.Reputation,
			&adventurer.Party,
			&adventurer.ContributionPoints,
			&adventurer.FullName,
		)
		if err != nil {
			return nil, err
		}
		// add the adventurer to the slice
		adventurers = append(adventurers, &adventurer)
	}

	// When the rows.Next() loop has finished, call rows.Err() to retrieve any error
	// that was encountered during the iteration.
	if err := rows.Err(); err != nil {
		return nil, err
	}

	return adventurers, nil

}
