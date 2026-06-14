import axios from 'axios';
import { Poeni } from '../models/poeni/poeni';

const API_URL = import.meta.env.VITE_API_URL;

// Function to get the token from localStorage
const getToken = () => localStorage.getItem('token');

// Create a new poeni record
export const createPoeni = async (poeni: Omit<Poeni, 'id'>): Promise<Poeni | null> => {
  try {
    const response = await axios.post<Poeni>(`${API_URL}/poeni/novi`, poeni, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return response.data;
  } catch {
    return null;
  }
};

// Get a single poeni by ID
export const getPoeniById = async (id: number): Promise<Poeni | null> => {
  try {
    const response = await axios.get<Poeni>(`${API_URL}/poeni/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return response.data;
  } catch {
    return null;
  }
};

// Get all poeni by user ID
export const getAllPoeniByUserId = async (userId: number): Promise<Poeni[]> => {
  try {
    const response = await axios.get<Poeni[]>(`${API_URL}/poeni/korisnik/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return response.data;
  } catch {
    return [];
  }
};

// Get all poeni by students FKs
export const getAllPoeniByStudentsFKs = async (ids: number[]): Promise<Poeni[]> => {
  try {
    const response = await axios.post<Poeni[]>(`${API_URL}/poeni/studenti/ids`, { ids }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return response.data;
  } catch {
    return [];
  }
};

// Update a poeni by ID
export const updatePoeni = async (id: number, poeni: Partial<Poeni>): Promise<boolean> => {
  try {
    await axios.put(`${API_URL}/poeni/azuriraj/${id}`, poeni, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return true;
  } catch {
    return false;
  }
};

// Delete a poeni by ID
export const deletePoeni = async (id: number): Promise<boolean> => {
  try {
    await axios.delete(`${API_URL}/poeni/obrisi/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return true;
  } catch {
    return false;
  }
};
