export default function VideoPlayer({ videoId }) {
  const token = localStorage.getItem("token");

  return (
    <video
      width="100%"
      controls
      src={`http://localhost:5000/api/videos/stream/${videoId}?token=${token}`}
    />
  );
}
