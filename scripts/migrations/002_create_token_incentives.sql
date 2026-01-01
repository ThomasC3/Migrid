-- In 'scripts/migrations/002_create_token_incentives.sql'

-- A wallet for each driver, linking to the external Open-Wallet system
CREATE TABLE driver_wallets (
    wallet_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id UUID NOT NULL REFERENCES drivers(driver_id),
    open_wallet_address VARCHAR(255) NOT NULL UNIQUE, -- The address in the Open-Wallet ledger
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Rules for converting real-world actions into token rewards
CREATE TABLE token_reward_rules (
    rule_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    action_type VARCHAR(50) NOT NULL UNIQUE, -- e.g., 'smart_charge', 'v2g_discharge'
    reward_multiplier DECIMAL(18, 8) NOT NULL, -- e.g., 100 points per dollar
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- A log of every reward granted, linking to the core event
CREATE TABLE token_reward_log (
    log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id UUID NOT NULL REFERENCES drivers(driver_id),
    rule_id UUID NOT NULL REFERENCES token_reward_rules(rule_id),
    triggering_event_id UUID, -- Link to the event in another table, if applicable
    source_value DECIMAL(18, 8) NOT NULL, -- The source value, e.g., 2.50 USD
    points_awarded DECIMAL(18, 8) NOT NULL,
    open_wallet_transaction_id VARCHAR(255), -- The transaction ID from the Open-Wallet response
    status VARCHAR(20) NOT NULL DEFAULT 'pending', -- pending, complete, failed
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
