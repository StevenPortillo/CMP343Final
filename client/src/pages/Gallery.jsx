import { useEffect, useState } from "react";
import axios from "axios";

function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [search, setSearch] = useState("");   // NEW: search bar state

  useEffect(() => {
    axios.get("http://localhost:5050/photos")
      .then((res) => setPhotos(res.data))
      .catch((err) => console.error("Error fetching photos:", err));
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this photo?");
    if (!confirmDelete) return;   // Cancel

    try {
      await axios.delete(`http://localhost:5050/photos/${id}`);
      setPhotos(photos.filter(photo => photo.id !== id)); 
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete photo");
    }
  };

  // ⭐ Filter photos by search keyword
  const filteredPhotos = photos.filter(photo =>
    photo.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1>Photo Gallery</h1>

      {/* ⭐ Search Bar */}
      <input
        type="text"
        placeholder="Search photos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
        style={{ padding: "8px", marginBottom: "20px", width: "250px" }}
      />

      <div className="gallery-grid">
        {filteredPhotos.map((photo) => (
          <div className="photo-card" key={photo.id}>
            <img
              src={`http://localhost:5050/uploads/${photo.filename}`}
              alt={photo.title}
            />

            <h3>{photo.title}</h3>
            <p>{new Date(photo.created_at).toLocaleString()}</p>

            {/* ⭐ Metadata */}
            <div className="metadata">
              {photo.camera_model && <p><strong>Camera:</strong> {photo.camera_model}</p>}
              {photo.iso && <p><strong>ISO:</strong> {photo.iso}</p>}
              {photo.aperture && <p><strong>Aperture:</strong> f/{photo.aperture}</p>}
              {photo.shutter_speed && <p><strong>Shutter:</strong> {photo.shutter_speed}</p>}
            </div>

            {/* ⭐ Delete button */}
            <button
              onClick={() => handleDelete(photo.id)}
              className="delete-btn"
              style={{ marginTop: "10px" }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
