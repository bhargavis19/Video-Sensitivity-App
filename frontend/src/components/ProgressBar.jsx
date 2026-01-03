export default function ProgressBar({ value }) {
  return (
    <div style={{
      width: "100%",
      background: "#e5e7eb",
      borderRadius: "6px",
      marginTop: "8px"
    }}>
      <div style={{
        width: `${value}%`,
        background: "#16a34a",
        padding: "6px",
        color: "white",
        borderRadius: "6px",
        textAlign: "center"
      }}>
        {value}%
      </div>
    </div>
  );
}
