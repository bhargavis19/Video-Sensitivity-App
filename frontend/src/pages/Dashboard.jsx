import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import VideoPlayer from "../components/VideoPlayer";
import ProgressBar from "../components/ProgressBar";

export default function Dashboard() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await api.get("/videos");
      setVideos(res.data.data);
    } catch (err) {
      console.error("Failed to fetch videos");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const deleteVideo = async (id) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;

    try {
      await api.delete(`/videos/${id}`);
      setVideos(videos.filter((v) => v._id !== id));
    } catch (err) {
      alert("Failed to delete video");
    }
  };

  const statusColor = (status) => {
    if (status === "ready" || status === "safe") return "green";
    if (status === "flagged") return "red";
    return "orange";
  };

  return (
    <div
      className="card"
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "24px",
      }}
    >
      {/* Header Row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}
      >
        <h2 style={{ margin: 0, whiteSpace: "nowrap" }}>My Videos</h2>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            style={{ background: "#2563eb" }}
            onClick={() => navigate("/upload")}
          >
            Upload New Video
          </button>

          <button
            style={{ background: "#e74c3c" }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {videos.length === 0 && <p>No videos uploaded yet.</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {videos.map((video) => (
          <li
            key={video._id}
            style={{
              marginBottom: "20px",
              paddingBottom: "12px",
              borderBottom: "1px solid #ddd",
            }}
          >
            <strong>{video.originalName}</strong>
            <br />

            Status:{" "}
            <span
              style={{
                color: statusColor(video.status),
                fontWeight: "bold",
              }}
            >
              {video.status.toUpperCase()}
            </span>

            <ProgressBar value={video.progress} />

            <div
              style={{
                marginTop: "10px",
                display: "flex",
                gap: "12px",
                alignItems: "center",
              }}
            >
              {video.progress === 100 && (
                <button
                  style={{ flex: 1 }}
                  onClick={() => setSelectedVideo(video._id)}
                >
                  ▶ Play
                </button>
              )}

              <button
                style={{ flex: 1, background: "#c0392b" }}
                onClick={() => deleteVideo(video._id)}
              >
                🗑 Delete
              </button>
            </div>

          </li>
        ))}
      </ul>

      {selectedVideo && (
        <>
          <h3>Now Playing</h3>
          <VideoPlayer videoId={selectedVideo} />
        </>
      )}
    </div>
  );
}
