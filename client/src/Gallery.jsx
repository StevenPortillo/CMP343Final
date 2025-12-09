import { useEffect, useState } from "react";
import axios from "axios";

export default function Gallery() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5050/photos")
      .then((res) => setPhotos(res.data))
      .catch((err) => console.error("Error fetching photos:", err));
  }, []);

  return (
    <div className="app-container">
      <h1>Photo Gallery</h1>

      <div className="gallery-grid">
        {photos.map((photo) => (
          <div className="photo-card" key={photo.id}>
            <img src={photo.image_url} alt={photo.title} />
            <h3>{photo.title}</h3>
            <p>{new Date(photo.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
