import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import export_routes from "../controllers/xlsx_export_controller";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3005);

app.use(cors());
app.options("*", cors());
app.use(bodyParser.json({ limit: "10mb" }));

app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok", service: "xlsx" });
});

app.use("/api", export_routes);

module.exports = app;

app.listen(port, "0.0.0.0", () => {
  console.log(`[xlsx] listening on port ${port}`);
});
