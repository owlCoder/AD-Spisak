import { ExportDataPredispitne } from "../models/export_data_predispitne";
import StudentPoeniRepository from "../repositories/student_poeni_repository";

class StudentPoeniService {
    private exportDataRepo = new StudentPoeniRepository();

    async getAllStudentPoeniData(predmet_id: number): Promise<ExportDataPredispitne[]> {
        return this.exportDataRepo.getAllData(predmet_id);
    }
}

export default StudentPoeniService;
