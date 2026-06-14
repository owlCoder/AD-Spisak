export class ExportDataPredispitne implements IExportDataPredispitne {
  constructor(
    public broj_indeksa: string,
    public ime_prezime: string,
    public naziv_poena: string | null,
    public broj_poena: number | null
  ) {}
}
