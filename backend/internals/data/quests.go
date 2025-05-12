package data

import (
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
