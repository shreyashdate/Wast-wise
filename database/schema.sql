-- Smart Waste Management System - Database Schema

CREATE TABLE IF NOT EXISTS worker (
    worker_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    role VARCHAR(10) DEFAULT 'worker' CHECK (role IN ('admin', 'worker'))
);

CREATE TABLE IF NOT EXISTS bin (
    bin_id SERIAL PRIMARY KEY,
    location VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'Empty' CHECK (status IN ('Full', 'Empty')),
    last_collected DATE,
    assigned_worker_id INTEGER REFERENCES worker(worker_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS collection (
    collection_id SERIAL PRIMARY KEY,
    bin_id INTEGER NOT NULL REFERENCES bin(bin_id) ON DELETE CASCADE,
    worker_id INTEGER NOT NULL REFERENCES worker(worker_id) ON DELETE CASCADE,
    collection_date DATE NOT NULL DEFAULT CURRENT_DATE,
    status VARCHAR(30) DEFAULT 'Collected' CHECK (status IN ('Collected', 'Not Collected', 'Full', 'Empty'))
);

CREATE TABLE IF NOT EXISTS complaint (
    complaint_id SERIAL PRIMARY KEY,
    location VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Resolved'))
);
