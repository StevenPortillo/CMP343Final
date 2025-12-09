import { Routes, Route } from "react-router-dom";
import Gallery from "./Gallery";
import Upload from "./Pages/Upload";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Gallery />} />
      <Route path="/upload" element={<Upload />} />
    </Routes>
  );
}

export default App;
