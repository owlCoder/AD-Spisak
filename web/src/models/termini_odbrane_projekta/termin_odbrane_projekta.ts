export interface TerminOdbraneProjekta {
  id: number;
  naziv_termina_odbrane: string;
  datum: string;
  vreme_odbrane: string;
  ucionica: string;
  aktivan: boolean;
  prijava_otvorena: boolean;
  napomena?: string;
}
