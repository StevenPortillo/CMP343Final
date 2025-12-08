-- Create the photos table in photo_collection_db
-- Connect to photo_collection_db first

CREATE TABLE IF NOT EXISTS photos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  filename VARCHAR(255) NOT NULL,
  camera_model VARCHAR(255),
  iso INTEGER,
  aperture VARCHAR(50),
  shutter_speed VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

