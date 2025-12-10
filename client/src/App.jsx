import { Routes, Route, Link } from "react-router-dom";
import Upload from "./Pages/Upload.jsx";
import Gallery from "./Pages/Gallery.jsx"; 

function App() {
  return (
    <div>
      {/* Navigation Buttons */}
      <nav>
        <Link to="/">Home</Link> | <Link to="/upload">Upload</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </div>
  );
}

export default App;
