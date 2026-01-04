import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import VideoPlayer from "../components/VideoPlayer";
import ProgressBar from "../components/ProgressBar";

export default function Dashboard() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  /* 🔁 Fetch videos (polling for live updates) */
  useEffect(() => {
    fetchVideos();

    const interval = setInterval(() => {
      fetchVideos();
    }, 3000); // refresh every 3 sec

    return () => clearInterval(interval);
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await api.get("/videos");
      setVideos(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch videos");
    }
  };

  /* 🎨 Status color */
  const statusColor = (status) => {
    if (status === "ready" || status === "safe") return "green";
    if (status === "flagged") return "red";
    return "orange";
  };

  /* 🚪 Logout */
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  /* 🗑 Delete video */
  const deleteVideo = async (id) => {
    if (!window.confirm("Delete this video?")) return;

    try {
      await api.delete(`/videos/${id}`);
      setVideos((prev) => prev.filter((v) => v._id !== id));

      // stop player if deleted video was playing
      if (selectedVideo === id) {
        setSelectedVideo(null);
      }
    } catch (err) {
      alert("Failed to delete video");
    }
  };

  return (
    <div className="card" style={{ maxWidth: "700px", margin: "auto" }}>

      {/* 🔝 HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: 0 }}>My Videos</h2>

        <div style={{ display: "flex", gap: "10px" }}>
          {role !== "viewer" && (
            <button onClick={() => navigate("/upload")}>
               Upload
            </button>
          )}
          <button onClick={handleLogout}> Logout</button>
        </div>
      </div>

      {/* ✅ ADD READ-ONLY MESSAGE RIGHT HERE */}
      {role === "viewer" && (
        <div
          style={{
            background: "#f8f9fa",
            border: "1px solid #ddd",
            padding: "10px",
            borderRadius: "6px",
            marginBottom: "15px",
            fontSize: "14px",
            color: "#555",
          }}
        >
          🔒 You have <strong>read-only access</strong>.  
          Uploading and deleting videos is restricted.
        </div>
      )}

      {/* 📂 VIDEO LIST */}
      {videos.length === 0 && <p>No videos uploaded yet.</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {videos.map((video) => (
          <li
            key={video._id}
            style={{
              border: "1px solid #ddd",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "15px",
            }}
          >
            <strong>{video.originalName}</strong>

            <div style={{ marginTop: "5px" }}>
              Status:{" "}
              <span
                style={{
                  color: statusColor(video.status),
                  fontWeight: "bold",
                }}
              >
                {video.status.toUpperCase()}
              </span>
            </div>

            <ProgressBar value={video.progress} />

            {/* ▶ PLAY + 🗑 DELETE */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "8px",
              }}
            >
              {video.progress === 100 && (
                <button
                  onClick={() => setSelectedVideo(video._id)}
                  style={{ flex: 1 }}
                >
                  ▶ Play
                </button>
              )}
              {role !== "viewer" && (
                <button
                  onClick={() => deleteVideo(video._id)}
                  style={{
                    background: "#c0392b",
                    color: "white",
                    flex: 1,
                  }}
                >
                   Delete
                </button>
              )}
              
            </div>
          </li>
        ))}
      </ul>

      {/* 🎬 PLAYER */}
      {selectedVideo && (
        <>
          <h3>Now Playing</h3>
          <VideoPlayer videoId={selectedVideo} />
        </>
      )}
    </div>
  );
}
