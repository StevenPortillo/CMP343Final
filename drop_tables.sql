-- Drop the photo_collection and photo_collection_db databases
-- WARNING: This will permanently delete the entire databases and all their data
-- This includes all tables (photos) and sequences (photos_id_sequence) within them
-- 
-- IMPORTANT: You cannot drop a database while connected to it.
-- Connect to a different database first (like 'postgres' or 'template1')

DROP DATABASE IF EXISTS photo_collection;
DROP DATABASE IF EXISTS photo_collection_db;

