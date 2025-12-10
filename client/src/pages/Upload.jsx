import { useState } from "react";
import axios from "axios";

function Upload() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("photo", file);
    formData.append("title", title);

    try {
      await axios.post("http://localhost:5050/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Upload successful!");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div>
      <h1>Upload a Photo</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Photo title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />

        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default Upload;
