CREATE TABLE IF NOT EXISTS adventurers (
    id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    class TEXT NOT NULL CHECK (class IN ('warrior', 'assassin', 'mage', 'ranger', 'cleric')),
    reputation TEXT NOT NULL DEFAULT 'Novice Wanderer',
    party TEXT NOT NULL DEFAULT '-',
    contribution_points INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);