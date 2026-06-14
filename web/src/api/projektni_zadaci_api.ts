import axios from 'axios';
import { ProjektniZadatak } from '../models/projekat/ProjektniZadatak';

const API_URL = import.meta.env.VITE_API_URL;

// Function to get the token from localStorage
const getToken = () => localStorage.getItem('token');

// Get all project tasks
export const getAllProjektniZadaci = async (): Promise<ProjektniZadatak[]> => {
    try {
        const response = await axios.get<ProjektniZadatak[]>(`${API_URL}/projektni-zadaci`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        });
        return response.data;
    } catch {
        return [];
    }
};

// Get all project tasks by termin odbrane
export const getProjektniZadaciByTerminOdbraneId = async (termin_odbrane_id: number): Promise<ProjektniZadatak[]> => {
    try {
        const response = await axios.get<ProjektniZadatak[]>(`${API_URL}/projektni-zadatak/termin-odbrane/${termin_odbrane_id}`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        });
        return response.data;
    } catch {
        return [];
    }
};

// Get student project task
export const getStudentProjektniZadatak = async (id: number): Promise<ProjektniZadatak | null> => {
    try {
        const response = await axios.get<ProjektniZadatak | null>(`${API_URL}/projektni-zadatak/student/${id}`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        });
        return response.data;
    } catch {
        return null;
    }
};

export const createProjektniZadatak = async (zadatak: Omit<ProjektniZadatak, 'id'>): Promise<ProjektniZadatak | null> => {
    try {
        const response = await axios.post<ProjektniZadatak>(
            `${API_URL}/projektni-zadatak/novi`, 
            zadatak,
            { headers: { Authorization: `Bearer ${getToken()}` }}
        );
        return response.data;
    } catch {
        return null;
    }
};

export const updateProjektniZadatak = async (zadatak: ProjektniZadatak): Promise<boolean> => {
    try {
        await axios.put(
            `${API_URL}/projektni-zadatak/azuriranje`, 
            zadatak,
            { headers: { Authorization: `Bearer ${getToken()}` }}
        );
        return true;
    } catch {
        return false;
    }
};

// Frontend Helper Functions for Multiple Operations
export const createMultipleProjektniZadaci = async (zadaci: Omit<ProjektniZadatak, 'id'>[]): Promise<(ProjektniZadatak | null)[]> => {
    const results = [];
    for (const zadatak of zadaci) {
        const result = await createProjektniZadatak(zadatak);
        results.push(result);
    }
    return results;
};

export const updateMultipleProjektniZadaci = async (zadaci: ProjektniZadatak[]): Promise<boolean[]> => {
    const results = [];
    for (const zadatak of zadaci) {
        const success = await updateProjektniZadatak(zadatak);
        results.push(success);
    }
    return results;
};

// Delete a project task
export const deleteProjektniZadatakByKorisnikFK = async (id: number): Promise<boolean> => {
    try {
        await axios.delete(`${API_URL}/projektni-zadatak/obrisi/${id}`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        });
        return true;
    } catch {
        return false;
    }
};