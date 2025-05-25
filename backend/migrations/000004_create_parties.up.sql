BEGIN;

CREATE TABLE IF NOT EXISTS parties (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    leader_id INT NOT NULL REFERENCES adventurers(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- members table
CREATE TABLE IF NOT EXISTS party_members (
    party_id INT REFERENCES parties(id) ON DELETE CASCADE,
    adventurer_id INT REFERENCES adventurers(id) ON DELETE CASCADE,
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (party_id, adventurer_id)
);

-- join request table
CREATE TABLE IF NOT EXISTS party_join_requests (
    id SERIAL PRIMARY KEY,
    party_id INT REFERENCES parties(id) ON DELETE CASCADE,
    adventurer_id INT REFERENCES adventurers(id) ON DELETE CASCADE,
    status TEXT NOT NULL CHECK (status IN ('pending', 'accepted', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(party_id, adventurer_id)
);

COMMIT;
