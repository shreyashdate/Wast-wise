-- Smart Waste Management System - Sample Data

-- Admin user
INSERT INTO worker (name, phone, role) VALUES ('Admin User', '0000000000', 'admin');

-- Workers
INSERT INTO worker (name, phone, role) VALUES ('Rahul Sharma', '9876543210', 'worker');
INSERT INTO worker (name, phone, role) VALUES ('Priya Patel', '9876543211', 'worker');
INSERT INTO worker (name, phone, role) VALUES ('Amit Kumar', '9876543212', 'worker');

-- Bins
INSERT INTO bin (location, status, last_collected, assigned_worker_id) VALUES ('MG Road - Sector 5', 'Full', '2026-03-20', 2);
INSERT INTO bin (location, status, last_collected, assigned_worker_id) VALUES ('City Park Entrance', 'Empty', '2026-03-22', 2);
INSERT INTO bin (location, status, last_collected, assigned_worker_id) VALUES ('Railway Station - Platform 1', 'Full', '2026-03-18', 3);
INSERT INTO bin (location, status, last_collected, assigned_worker_id) VALUES ('Market Square', 'Empty', '2026-03-23', 3);
INSERT INTO bin (location, status, last_collected, assigned_worker_id) VALUES ('School Road Junction', 'Full', '2026-03-15', 4);
INSERT INTO bin (location, status, last_collected, assigned_worker_id) VALUES ('Hospital Lane', 'Empty', '2026-03-21', NULL);

-- Collections
INSERT INTO collection (bin_id, worker_id, collection_date, status) VALUES (1, 2, '2026-03-20', 'Collected');
INSERT INTO collection (bin_id, worker_id, collection_date, status) VALUES (2, 2, '2026-03-22', 'Collected');
INSERT INTO collection (bin_id, worker_id, collection_date, status) VALUES (3, 3, '2026-03-18', 'Collected');
INSERT INTO collection (bin_id, worker_id, collection_date, status) VALUES (4, 3, '2026-03-23', 'Collected');
INSERT INTO collection (bin_id, worker_id, collection_date, status) VALUES (5, 4, '2026-03-15', 'Not Collected');

-- Complaints
INSERT INTO complaint (location, description, status) VALUES ('MG Road - Sector 5', 'Bin overflowing for 3 days, bad smell in area.', 'Pending');
INSERT INTO complaint (location, description, status) VALUES ('Railway Station - Platform 1', 'Bin is damaged and waste is spilling out.', 'Pending');
INSERT INTO complaint (location, description, status) VALUES ('Market Square', 'No bin available near the vegetable market.', 'Resolved');
