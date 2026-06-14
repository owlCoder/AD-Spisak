import axios from 'axios';
import { Evidencija } from '../models/evidencija/evidencija';
import { IEvidencijaPodaciBrojIndeksa } from '../models/evidencija/evidencija_broj_indeksa';

const API_URL = import.meta.env.VITE_API_URL;

// Function to get the token from localStorage
const getToken = () => localStorage.getItem('token');

// Create a new evidencija record
export const createEvidencija = async (evidencija: Evidencija): Promise<Evidencija | null> => {
  try {
    const response = await axios.post<Evidencija>(`${API_URL}/evidencija/novi`, evidencija, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return response.data;
  } catch {
    return null;
  }
};

// Create multiple evidencija records for students
export const createMultipleEvidencija = async (evidencijaArray: Evidencija[]): Promise<string | null> => {
  try {
    const response = await axios.post<string>(`${API_URL}/evidencija/novi-vise`, evidencijaArray, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return response.data;
  } catch {
    return null;
  }
};

// Get a single evidencija by ID
export const getEvidencijaByStudentId = async (id: number): Promise<Evidencija[]> => {
  try {
    const response = await axios.get<Evidencija[]>(`${API_URL}/evidencija/student/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return response.data;
  } catch {
    return [];
  }
};

// Get all evidencija
export const getAllEvidencija = async (): Promise<IEvidencijaPodaciBrojIndeksa[]> => {
  try {
    const response = await axios.get<IEvidencijaPodaciBrojIndeksa[]>(`${API_URL}/evidencija/all`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return response.data;
  } catch {
    return [];
  }
};

// Get all evidencija per grupa
export const getAllEvidencijaPerGrupa = async (grupa: number): Promise<IEvidencijaPodaciBrojIndeksa[]> => {
  try {
    const response = await axios.get<IEvidencijaPodaciBrojIndeksa[]>(`${API_URL}/evidencija/grupa/${grupa}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return response.data;
  } catch {
    return [];
  }
};

// Update an evidencija by ID
export const updateEvidencija = async (id: number, evidencija: Partial<Evidencija>): Promise<boolean> => {
  try {
    await axios.put(`${API_URL}/evidencija/azuriraj/${id}`, evidencija, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return true;
  } catch {
    return false;
  }
};

// Delete an evidencija by ID
export const deleteEvidencija = async (id: number): Promise<boolean> => {
  try {
    await axios.delete(`${API_URL}/evidencija/obrisi/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return true;
  } catch {
    return false;
  }
};
