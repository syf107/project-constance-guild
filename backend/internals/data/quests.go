package data

import (
	"context"
	"database/sql"
	"log"
	"time"
)

type Quest struct {
	ID           int64     `json:"id"`
	Title        string    `json:"title"`
	Description  string    `json:"description"`
	Type         string    `json:"type"`
	Difficulty   int32     `json:"difficulty"`
	Location     string    `json:"location"`
	RewardPoints int64     `json:"reward_points"`
	RewardGold   int64     `json:"reward_golds"`
	RewardItems  []string  `json:"reward_items"`
	TimeToDoDays int32     `json:"time_to_do_days"`
	CreatedAt    time.Time `json:"created_at"`
}

type QuestModel struct {
	DB       *sql.DB
	InfoLog  *log.Logger
	ErrorLog *log.Logger
}

func (m QuestModel) Insert(quest *Quest) error {
	query := `
		INSERT INTO quests(title, description, type, difficulty, location, reward_points, reward_gold, reward_items, time_to_do_days)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
		RETURNIN id, created_at`

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	args := []interface{}{
		quest.Title,
		quest.Description,
		quest.Type,
		quest.Difficulty,
		quest.Location,
		quest.RewardPoints,
		quest.RewardGold,
		quest.RewardItems,
		quest.TimeToDoDays,
	}

	return m.DB.QueryRowContext(ctx, query, args...).Scan(&quest.ID, &quest.CreatedAt)

}

func (m QuestModel) GetAll() (quest []*Quest, err error) {
	query := `
		SELECT q.id, q.title, q.description, q.type, q.difficulty, q.location, q.reward_points, q.reward_golds, q.reward_items, q.time_to_do_days
		FROM quests q
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

	quests := []*Quest{}

	for rows.Next() {
		var quest Quest

		err := rows.Scan(
			&quest.ID,
			&quest.Title,
			&quest.Description,
			&quest.Type,
			&quest.Difficulty,
			&quest.Location,
			&quest.RewardGold,
			&quest.RewardGold,
			&quest.RewardItems,
			&quest.TimeToDoDays,
		)
		if err != nil {
			return nil, err
		}
		// add the quest to the slice
		quests = append(quests, &quest)
	}

	// When the rows.Next() loop has finished, call rows.Err() to retrieve any error
	// that was encountered during the iteration.
	if err := rows.Err(); err != nil {
		return nil, err
	}

	return quests, nil

}
