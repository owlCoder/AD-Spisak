import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import KorisnikService from "./korisnik_service";
import PredmetService from "./predmet_service";

class AuthService {
    private korisnik_service = new KorisnikService();
    private jwtSecret: string;
  
    constructor() {
      this.jwtSecret = process.env.JWT_SECRET ?? ""; 
      if (!process.env.JWT_SECRET) {
        console.warn("Warning: JWT_SECRET is not set, using default value.");
      }
    }
  
    async login(email: string, password: string, predmetId: number): Promise<{ token: string } | null> {
      const korisnik = await this.korisnik_service.getKorisnikByEmail(email, predmetId);
      if (korisnik && await bcrypt.compare(password, korisnik.password)) {
        const predmet = (await new PredmetService().getPredmetById(predmetId));
        const token = jwt.sign(
          {
            id: korisnik.id,
            uloga: korisnik.uloga,
            pid: predmetId,
            pnaziv: predmet?.naziv,
            pfond: predmet?.fond_casova,
          },
          this.jwtSecret,
          { expiresIn: "6h" }
        );
        return { token }; 
      }
      return null; 
    }
  }
  
  export default AuthService;
