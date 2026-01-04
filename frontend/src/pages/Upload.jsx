import { useState } from "react";
import api from "../api/api";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProgress(0);

    const formData = new FormData();
    formData.append("video", file);

    const res = await api.post("/videos/upload", formData);
    const videoId = res.data.data._id;

    const socket = io("http://localhost:5000");

    socket.on(`video-progress-${videoId}`, (data) => {
      setProgress(data.progress);

      if (data.progress === 100) {
        socket.disconnect();
      }
    });
  };

  return (
    <div className="card" style={{ 
      textAlign: "center",
      maxWidth: "360px",
      margin: "100px auto",
      padding: "24px",
    }}>
      <h2>Upload Video</h2>

      <input type="file" accept="video/mp4" onChange={handleUpload} />

      <p style={{ marginTop: "15px" }}>
        Progress: <strong>{progress}%</strong>
      </p>

      {/* Navigation buttons */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
