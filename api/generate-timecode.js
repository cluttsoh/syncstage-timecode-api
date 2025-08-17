import formidable from "formidable";
import { Readable } from "stream";

export const config = {
  api: {
    bodyParser: false, // Required for file uploads
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = new formidable.IncomingForm({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "Error parsing form data" });
    }

    const file = files.audio;
    if (!file) {
      return res.status(400).json({ error: "No audio file uploaded" });
    }

    try {
      // Simulated: you would normally use FFmpeg or another tool here.
      // For now, we just return a dummy success message with file info

      return res.status(200).json({
        message: "✅ Audio received. Timecode generation simulation complete.",
        originalFile: {
          name: file.originalFilename,
          size: file.size,
          type: file.mimetype,
        },
        timecodeSettings: {
          type: "SMPTE",
          frameRate: "30fps",
          placement: "Right channel",
        },
        output: "Merged file would go here (next step).",
      });
    } catch (error) {
      console.error("Processing error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
}
