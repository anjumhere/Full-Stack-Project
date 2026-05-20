import dotenv from "dotenv";
import app from "./app.js";
import { connectDb } from "./db/index.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDb();

    const server = app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });

    server.on("error", (error) => {
      console.error("Server error:", error);
      process.exit(1);
    });
  } catch (error) {
    console.error("ERROR", error);
    process.exit(1);
  }
}

startServer();
