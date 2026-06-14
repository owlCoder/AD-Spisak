import axios from 'axios';
import { TerminOdbraneProjekta } from '../models/termini_odbrane_projekta/termin_odbrane_projekta';

const API_URL = import.meta.env.VITE_API_URL;

// Function to get the token from localStorage
const getToken = () => localStorage.getItem('token');

// Create a new Termin Odbrane
export const createTerminOdbrane = async (termin: TerminOdbraneProjekta): Promise<TerminOdbraneProjekta | null> => {
  try {
    const response = await axios.post<TerminOdbraneProjekta>(`${API_URL}/termin/novi`, termin, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch {
    return null;
  }
};

// Get all Termini Odbrane for a given predmet_id
export const getAllTerminiOdbrane = async (): Promise<TerminOdbraneProjekta[]> => {
  try {
    const response = await axios.get<TerminOdbraneProjekta[]>(`${API_URL}/termini`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch {
    return [];
  }
};

// Update a Termin Odbrane by ID
export const updateTerminOdbrane = async (id: number, termin: TerminOdbraneProjekta): Promise<boolean> => {
  try {
    await axios.put(`${API_URL}/termin/azuriraj/${id}`, termin, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return true;
  } catch {
    return false;
  }
};
