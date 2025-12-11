import { useEffect, useState } from "react";
import axios from "axios";

function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [fullscreenPhoto, setFullscreenPhoto] = useState(null);

  // Editing metadata states
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    camera_model: "",
    iso: "",
    aperture: "",
    shutter_speed: ""
  });

  useEffect(() => {
    axios
      .get("http://localhost:5050/photos")
      .then((res) => setPhotos(res.data))
      .catch((err) => console.error("Error fetching photos:", err));
  }, []);

  // ------- DELETE PHOTO -------
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this photo?");

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5050/photos/${id}`);
      setPhotos(photos.filter((photo) => photo.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete photo");
    }
  };

  // ------- OPEN EDIT FORM -------
  const handleEditClick = (photo) => {
    setEditingPhoto(photo);
    setEditData({
      title: photo.title,
      description: photo.description || "",
      camera_model: photo.camera_model || "",
      iso: photo.iso || "",
      aperture: photo.aperture || "",
      shutter_speed: photo.shutter_speed || ""
    });
  };

  // ------- SAVE EDITS -------
  const handleSaveEdit = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5050/photos/${editingPhoto.id}`,
        editData
      );

      // Update UI
      setPhotos(
        photos.map((p) =>
          p.id === editingPhoto.id ? res.data : p
        )
      );

      alert("Metadata updated!");
      setEditingPhoto(null);
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update metadata");
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
              onClick={() => setFullscreenPhoto(photo)}
              style={{ cursor: "pointer" }}
            />

            <h3>{photo.title}</h3>

            <button onClick={() => handleDelete(photo.id)}>Delete</button>
            <button onClick={() => handleEditClick(photo)}>Edit Metadata</button>
          </div>
        ))}
      </div>

      {/* ---------- FULLSCREEN VIEW ---------- */}
      {fullscreenPhoto && (
        <div className="fullscreen-overlay" onClick={() => setFullscreenPhoto(null)}>
          <img
            src={`http://localhost:5050/uploads/${fullscreenPhoto.filename}`}
            alt="fullscreen"
            className="fullscreen-image"
          />
        </div>
      )}

      {/* ---------- EDIT METADATA MODAL ---------- */}
      {editingPhoto && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Metadata</h2>

            <input
              type="text"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              placeholder="Title"
            />

            <textarea
              value={editData.description}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
              placeholder="Description"
            />

            <input
              type="text"
              value={editData.camera_model}
              onChange={(e) =>
                setEditData({ ...editData, camera_model: e.target.value })
              }
              placeholder="Camera Model"
            />

            <input
              type="text"
              value={editData.iso}
              onChange={(e) => setEditData({ ...editData, iso: e.target.value })}
              placeholder="ISO"
            />

            <input
              type="text"
              value={editData.aperture}
              onChange={(e) =>
                setEditData({ ...editData, aperture: e.target.value })
              }
              placeholder="Aperture"
            />

            <input
              type="text"
              value={editData.shutter_speed}
              onChange={(e) =>
                setEditData({ ...editData, shutter_speed: e.target.value })
              }
              placeholder="Shutter Speed"
            />

            <button onClick={handleSaveEdit}>Save</button>
            <button onClick={() => setEditingPhoto(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
