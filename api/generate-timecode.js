export default function handler(req, res) {
  res.status(200).json({
    message: "✅ Timecode endpoint is working!",
    timestamp: new Date().toISOString(),
  });
}
