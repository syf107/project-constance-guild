package data

import (
	"context"
	"database/sql"
	"errors"
	"log"
	"time"
)

type Party struct {
	ID          int          `json:"id"`
	Name        string       `json:"name"`
	Description string       `json:"description"`
	LeaderID    int64        `json:"leader_id"`
	CreatedAt   time.Time    `json:"created_at"`
	Members     []Adventurer `json:"members,omitempty"`
}

type PartyModel struct {
	DB       *sql.DB
	InfoLog  *log.Logger
	ErrorLog *log.Logger
}

func (m PartyModel) Insert(party *Party) error {
	query := `
		INSERT INTO parties (name, description, leader_id)
		VALUES ($1, $2, $3)
		RETURNING id, created_at`

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	args := []interface{}{
		party.ID,
		party.Description,
		party.LeaderID,
	}

	return m.DB.QueryRowContext(ctx, query, args...).Scan(&party.ID, &party.CreatedAt)
}

// adding member
func (m PartyModel) AddMember(partyID, adventurerID int) error {
	var count int

	query := `SELECT COUNT(*) FROM party_members 
		WHERE party_id == $1`

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	cancel()

	if err := m.DB.QueryRowContext(ctx, query, partyID).Scan(&count); err != nil {
		return err
	}

	if count >= 10 {
		return errors.New("party is full")
	}

	// query for adding new member to the party
	query = `INSERT INTO party_members (party_id
		adventurer_id) VALUES ($1, $2)`

	_, err := m.DB.ExecContext(ctx, query, partyID, adventurerID)
	return err

}

func (m PartyModel) RemoveMember(partyID, adventurerID int) error {
	query := `
		DELETE FROM party_members WHERE party_id = $1 AND adventurer_id = $2
		`
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	_, err := m.DB.ExecContext(ctx, query, partyID, adventurerID)
	return err
}

func (m PartyModel) DisbandParty(partyID, leaderID int) error {
	query := `DELETE FROM parties WHERE id = $1 AND leaderID = $2`

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	res, err := m.DB.ExecContext(ctx, query, partyID, leaderID)
	if err != nil {
		return err
	}

	count, _ := res.RowsAffected()
	if count == 0 {
		return errors.New("only leader can disband")
	}
	return nil
}

func (m PartyModel) GetAll() ([]*Party, error) {
	query := `
		SELECT p.id, p.name, p.description, leader.full_name AS leader_name, p.created_at, 
			COALESCE(
				json_agg(
					json_build_object(
						"id", a.id,
						"full_name", a.full_name,
						"class", a.class,
						"reputation", a.reputation,
						"contribution_points", a.contribution_points
				
					)
				) FILTER (WHERE a.id IS NOT NULL), 
				 '[]'
			) AS members
		FROM parties p
		LEFT JOIN party_members pm ON p.id = pm.party_id
		LEFT JOIN adventurers a ON pm.adventurer_id = a.id
		LEFT JOIN adventurers leader ON p.leader_id = leader.id
		GROUP BY p.id, leader.full_name;
		`
}
