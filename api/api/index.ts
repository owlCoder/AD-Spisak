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
const port = process.env.PORT || 3000;

// Apply CORS middleware with options
app.use(cors());
app.options('*', cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use routes
app.use("/api", korisnik_routes);
app.use("/api", auth_routes);
app.use("/api", evidencija_routes);
app.use("/api", poeni_routes);
app.use("/api", export_route);
app.use("/api", predmeti_routes);
app.use("/api", projekti_routes);
app.use("/api", termini_routes);
app.use("/api", excel_routes);

// For Vercel, we need to export the Express app
module.exports = app;

// Start the server
app.listen(port, () => {});
