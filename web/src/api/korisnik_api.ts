import axios from 'axios';
import { Korisnik } from '../models/korisnik/korisnik';

const API_URL = import.meta.env.VITE_API_URL;

// Function to get the token from localStorage
const getToken = () => localStorage.getItem('token');

// Create a new korisnik
export const createKorisnik = async (korisnik: Omit<Korisnik, 'id'>): Promise<Korisnik | null> => {
  try {
    const response = await axios.post<Korisnik>(`${API_URL}/korisnik/novi`, korisnik, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return response.data;
  } catch {
    return null;
  }
};

// Get a korisnik by ID
export const getKorisnikById = async (id: number): Promise<Korisnik | null> => {
  try {
    const response = await axios.get<Korisnik>(`${API_URL}/korisnik/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return response.data;
  } catch {
    return null;
  }
};

// Get all korisnici
export const getAllKorisnici = async (): Promise<Korisnik[]> => {
  try {
    const response = await axios.get<Korisnik[]>(`${API_URL}/studenti`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return response.data;
  } catch {
    return [];
  }
};

// Update a korisnik by ID
export const updateKorisnik = async (id: number, korisnik: Partial<Korisnik>): Promise<boolean> => {
  try {
    await axios.put(`${API_URL}/korisnik/azuriraj/${id}`, korisnik, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return true;
  } catch {
    return false;
  }
};

// Delete a korisnik by ID
export const deleteKorisnik = async (id: number): Promise<boolean> => {
  try {
    await axios.delete(`${API_URL}/korisnik/obrisi/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return true;
  } catch {
    return false;
  }
};
