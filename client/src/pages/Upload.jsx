import { useState } from "react";
import axios from "axios";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);

  const handleUpload = async () => {
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);

    try {
      const res = await axios.post("http://localhost:5050/upload", form);
      alert("Uploaded!");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div>
      <h1>Upload a Photo</h1>

      <input
        type="text"
        placeholder="Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}