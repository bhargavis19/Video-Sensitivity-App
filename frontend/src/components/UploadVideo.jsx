import api from "../api/api";
import { useState } from "react";

export default function UploadVideo() {
  const [video, setVideo] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault(); // 🔴 REQUIRED

    if (!video) {
      alert("Select a video first");
      return;
    }

    const formData = new FormData();
    formData.append("video", video);

    try {
      await api.post("/videos/upload", formData);
      alert("Upload successful");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setVideo(e.target.files[0])}
      />
      <button type="submit">Upload</button>
    </form>
  );
}
