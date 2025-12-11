import { useEffect, useState } from "react";
import axios from "axios";

function Gallery() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5050/photos")
      .then((res) => setPhotos(res.data))
      .catch((err) => console.error("Error fetching photos:", err));
  }, []);

  const handleDelete = async (id) => {
    const isSure = window.confirm("Are you sure you want to delete this photo?");
    if (!isSure) return;

    try {
      await axios.delete(`http://localhost:5050/photos/${id}`);
      setPhotos((prev) => prev.filter((photo) => photo.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete photo.");
    }
  };

  return (
    <div className="app-container">
      <h1>Photo Gallery</h1>

      <div className="gallery-grid">
        {photos.map((photo) => (
          <div className="photo-card" key={photo.id}>
            <img
              src={`http://localhost:5050/uploads/${photo.filename}`}
              alt={photo.title}
            />
            
            <h3>{photo.title}</h3>

            {/* Metadata Display */}
            <div className="metadata">
              {photo.description && <p><strong>Description:</strong> {photo.description}</p>}
              {photo.camera_model && <p><strong>Camera:</strong> {photo.camera_model}</p>}
              {photo.iso && <p><strong>ISO:</strong> {photo.iso}</p>}
              {photo.aperture && <p><strong>Aperture:</strong> {photo.aperture}</p>}
              {photo.shutter_speed && <p><strong>Shutter:</strong> {photo.shutter_speed}</p>}
              <p><strong>Uploaded:</strong> {new Date(photo.created_at).toLocaleString()}</p>
            </div>

            {/* Delete Button */}
            <button className="delete-btn" onClick={() => handleDelete(photo.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
