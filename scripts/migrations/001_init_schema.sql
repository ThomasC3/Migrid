-- Initial database schema for MiGrid core components.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- L5/L6: Core Driver Information
CREATE TABLE drivers (
    driver_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(50),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- The SQL commands to initialize the database schema will be placed here.
-- This file is intentionally left blank for now as the schema has not been provided.
