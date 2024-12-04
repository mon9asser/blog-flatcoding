import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    const logFilePath = path.join(process.cwd(), "public", "logs", "server-issues.json");

    // Ensure the directory exists
    const logDir = path.dirname(logFilePath);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    // Check the file size (e.g., limit to 5 MB)
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
    if (fs.existsSync(logFilePath)) {
      const stats = fs.statSync(logFilePath);
      if (stats.size > MAX_FILE_SIZE) {
        // Archive the current log file
        const archiveFilePath = path.join(
          process.cwd(),
          "public",
          "logs",
          `server-issues-${Date.now()}.json`
        );
        fs.renameSync(logFilePath, archiveFilePath);
      }
    }

    // Read existing logs or initialize an empty array
    let logs = [];
    if (fs.existsSync(logFilePath)) {
      logs = JSON.parse(fs.readFileSync(logFilePath, "utf-8"));
    }

    // Add the new log entry
    const newLog = req.body;
    logs.push(newLog);

    // Write the updated logs to the file
    fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2), "utf-8");

    res.status(200).json({ message: "Log saved successfully" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
