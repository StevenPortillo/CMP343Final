import { useEffect, useState } from "react";
import axios from "axios";

function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [search, setSearch] = useState("");

  // --- Editing State ---
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    id: null,
    title: "",
    description: "",
    camera_model: "",
    iso: "",
    aperture: "",
    shutter_speed: ""
  });

  useEffect(() => {
    axios.get("http://localhost:5050/photos")
      .then((res) => setPhotos(res.data))
      .catch((err) => console.error("Error fetching photos:", err));
  }, []);

  // ========== DELETE PHOTO ==========
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this photo?");
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:5050/photos/${id}`);
      setPhotos(photos.filter(photo => photo.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete photo");
    }
  };

  // ========== OPEN EDIT MODAL ==========
  const openEditModal = (photo) => {
    setEditData({
      id: photo.id,
      title: photo.title,
      description: photo.description,
      camera_model: photo.camera_model,
      iso: photo.iso,
      aperture: photo.aperture,
      shutter_speed: photo.shutter_speed,
    });
    setIsEditing(true);
  };

  // ========== UPDATE PHOTO ==========
  const handleEditSave = async () => {
    try {
      const res = await axios.put(`http://localhost:5050/photos/${editData.id}`, editData);

      // Update UI
      setPhotos(photos.map(p => (p.id === editData.id ? res.data : p)));

      setIsEditing(false);
      alert("Metadata updated!");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update photo");
    }
  };

  // Filtered results for search
  const filteredPhotos = photos.filter(photo =>
    photo.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1>Photo Gallery</h1>

      {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="Search photos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "20px", padding: "8px", width: "250px" }}
      />

      {/* PHOTO GRID */}
      <div className="gallery-grid">
        {filteredPhotos.map((photo) => (
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

            <button onClick={() => openEditModal(photo)} style={{ marginLeft: "10px" }}>
              Edit
            </button>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Metadata</h2>

            <input
              type="text"
              placeholder="Title"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            />

            <input
              type="text"
              placeholder="Description"
              value={editData.description}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            />

            <input
              type="text"
              placeholder="Camera Model"
              value={editData.camera_model}
              onChange={(e) => setEditData({ ...editData, camera_model: e.target.value })}
            />

            <input
              type="number"
              placeholder="ISO"
              value={editData.iso}
              onChange={(e) => setEditData({ ...editData, iso: e.target.value })}
            />

            <input
              type="text"
              placeholder="Aperture"
              value={editData.aperture}
              onChange={(e) => setEditData({ ...editData, aperture: e.target.value })}
            />

            <input
              type="text"
              placeholder="Shutter Speed"
              value={editData.shutter_speed}
              onChange={(e) => setEditData({ ...editData, shutter_speed: e.target.value })}
            />

            <button onClick={handleEditSave}>Save</button>
            <button onClick={() => setIsEditing(false)} style={{ marginLeft: "10px" }}>
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Gallery;
