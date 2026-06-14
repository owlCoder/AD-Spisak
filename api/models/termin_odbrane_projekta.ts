import { ITerminOdbraneProjekta } from "../interfaces/ITerminOdbraneProjekta";

class TerminOdbraneProjekta implements ITerminOdbraneProjekta {
  constructor(
    public id: number,
    public naziv_termina_odbrane: string,
    public datum: string,
    public vreme_odbrane: string,
    public ucionica: string,
    public aktivan: boolean,
    public prijava_otvorena: boolean,
    public napomena?: string
  ) {}
}

export default TerminOdbraneProjekta;
