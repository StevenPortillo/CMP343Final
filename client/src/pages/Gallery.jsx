import { useEffect, useState } from "react";
import axios from "axios";

function Gallery() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5050/photos")
      .then((res) => setPhotos(res.data))
      .catch((err) => console.error("Error fetching photos:", err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/photos/${id}`);
      setPhotos(photos.filter(photo => photo.id !== id)); // Update UI
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete photo");
    }
  };
  

  return (
    <div className="app-container">
      <h1>Photo Gallery</h1>

      <div className="photo-card" key={photo.id}>
  <img
    src={`http://localhost:5050/uploads/${photo.filename}`}
    alt={photo.title}
  />
  <h3>{photo.title}</h3>
  <p>{new Date(photo.created_at).toLocaleString()}</p>

  <button onClick={() => handleDelete(photo.id)}>
    Delete
  </button>
</div>

    </div>
  );
}

export default Gallery;
