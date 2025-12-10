import { Routes, Route } from "react-router-dom";
import Gallery from "./Gallery";
import Upload from "./Pages/Upload";

function App() {
  return (
    <Routes>
      <Route path="/" element={
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
      } />
  
      <Route path="/Upload" element={<Upload />} />
    </Routes>
  );
}
export default App;