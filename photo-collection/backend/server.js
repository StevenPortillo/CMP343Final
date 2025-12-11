import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { Client } from "pg";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5050;


app.use(cors());


app.use(express.json());
app.use('/uploads', express.static('uploads'));



const client = new Client({
  user: "stevenportillo",
  host: "localhost",
  database: "photo_collection_db",
  password: "YOUR_PG_PASSWORD",
  port: 5432,
});

client.connect()
  .then(() => console.log("Connected to Postgres"))
  .catch(err => console.error("Connection error:", err));



app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });


// Test route
app.get("/test", (req, res) => {
  res.json({ 
    message: "Server is running!", 
    timestamp: new Date().toISOString(),
    database: "photo_collection_db"
  });
});


// getter
app.get("/photos", async (req, res) => {
    try {
      console.log("Fetching photos from DB...");
      const result = await client.query("SELECT * FROM photos ORDER BY created_at DESC");
      console.log("Fetched rows:", result.rows);
      res.json(result.rows);
    } catch (err) {
      console.error("Error fetching photos:", err);
      res.status(500).json({ error: "Server error" });
    }
  });


//poster
app.post("/photos", upload.single("photo"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const {
      title,
      description,
      camera_model,
      iso,
      aperture,
      shutter_speed
    } = req.body;

    const query = `
      INSERT INTO photos 
        (title, description, filename, camera_model, iso, aperture, shutter_speed)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    const values = [
      title,
      description,
      file.filename,
      camera_model,
      iso || null,
      aperture || null,
      shutter_speed || null
    ];

    const result = await client.query(query, values);

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error uploading photo:", err);
    res.status(500).json({ error: "Server error" });
  }
});
// DELETE a photo
app.delete("/photos/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      // Delete from database
      const result = await client.query(
        "DELETE FROM photos WHERE id = $1 RETURNING *",
        [id]
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Photo not found" });
      }
  
      res.json({ message: "Photo deleted successfully" });
    } catch (err) {
      console.error("Error deleting photo:", err);
      res.status(500).json({ error: "Server error" });
    }
  });
  // UPDATE a photo's metadata
app.put("/photos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      camera_model,
      iso,
      aperture,
      shutter_speed
    } = req.body;

    const query = `
      UPDATE photos
      SET title = $1,
          description = $2,
          camera_model = $3,
          iso = $4,
          aperture = $5,
          shutter_speed = $6
      WHERE id = $7
      RETURNING *;
    `;

    const values = [
      title,
      description,
      camera_model,
      iso,
      aperture,
      shutter_speed,
      id
    ];

    const updated = await client.query(query, values);

    res.json(updated.rows[0]);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

  



app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

