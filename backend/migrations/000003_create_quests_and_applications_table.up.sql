BEGIN;

-- Create the quests table
CREATE TABLE IF NOT EXISTS quests (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    type TEXT CHECK (type IN ('Kill Monsters', 'Collect Items', 'Protect/Escort')) NOT NULL,
    difficulty INTEGER CHECK (difficulty BETWEEN 1 AND 5) NOT NULL,
    location TEXT NOT NULL,
    reward_points INTEGER NOT NULL CHECK (reward_points >= 0),
    reward_gold INTEGER NOT NULL,
    reward_items TEXT[] NOT NULL,
    time_to_do_days INTEGER NOT NULL CHECK (time_to_do_days > 0),
    created_at TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create the quest_applications table
CREATE TABLE IF NOT EXISTS quest_applications (
    id SERIAL PRIMARY KEY,
    adventurer_id INTEGER NOT NULL REFERENCES adventurers(id) ON DELETE CASCADE,
    quest_id INTEGER NOT NULL REFERENCES quests(id) ON DELETE CASCADE,
    status TEXT NOT NULL CHECK (status IN ('On process', 'Rejected', 'Completed', 'Failed')),
    applied_at TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT NOW(),
    deadline TIMESTAMP(0) WITH TIME ZONE NOT NULL
    quest_code TEXT UNIQUE NOT NULL DEFAULT 'QST-' || substring(md5(random()::text) FROM 1 FOR 8)

);

COMMIT;
