import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import korisnik_routes from "../controllers/korisnik_controller";
import auth_routes from "../controllers/auth_controller";
import evidencija_routes from "../controllers/evidencija_kontroler";
import poeni_routes from "../controllers/poeni_controller";
import export_route from "../controllers/student_poeni_controller";
import predmeti_routes from "../controllers/predmet_controller";
import projekti_routes from "../controllers/projektni_zadatak_controller";
import termini_routes from "../controllers/odbrane_projekta_controller";
import excel_routes from "../controllers/excel_controller";

const app = express();
const port = Number(process.env.PORT || 3000);
const serviceName = (process.env.SERVICE_NAME || "all").toLowerCase();

app.use(cors());
app.options("*", cors());
app.use(bodyParser.json({ limit: "10mb" }));

app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok", service: serviceName });
});

const registerAllRoutes = (): void => {
  app.use("/api", korisnik_routes);
  app.use("/api", auth_routes);
  app.use("/api", evidencija_routes);
  app.use("/api", poeni_routes);
  app.use("/api", export_route);
  app.use("/api", predmeti_routes);
  app.use("/api", projekti_routes);
  app.use("/api", termini_routes);
  app.use("/api", excel_routes);
};

switch (serviceName) {
  case "auth":
    app.use("/api", auth_routes);
    break;
  case "users":
    app.use("/api", korisnik_routes);
    app.use("/api", excel_routes);
    break;
  case "subjects":
    app.use("/api", predmeti_routes);
    break;
  case "attendance":
    app.use("/api", evidencija_routes);
    break;
  case "points":
    app.use("/api", poeni_routes);
    app.use("/api", export_route);
    break;
  case "projects":
    app.use("/api", projekti_routes);
    break;
  case "defenses":
    app.use("/api", termini_routes);
    break;
  case "all":
    registerAllRoutes();
    break;
  default:
    throw new Error(`Unknown SERVICE_NAME: ${serviceName}`);
}

app.use((_req, res) => {
  res.status(404).json({ error: "Route not available in this service", service: serviceName });
});

module.exports = app;

app.listen(port, "0.0.0.0", () => {
  console.log(`[${serviceName}] listening on port ${port}`);
});
