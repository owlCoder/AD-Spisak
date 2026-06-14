import axios from 'axios';
import { Predmet } from '../models/predmet/predmet';

const API_URL = import.meta.env.VITE_API_URL;

// Function to get the token from localStorage
const getToken = () => localStorage.getItem('token');

// Create a new predmet record
export const createPredmet = async (predmet: Predmet): Promise<Predmet | null> => {
  try {
    const response = await axios.post<Predmet>(`${API_URL}/predmet/novi`, predmet, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return response.data;
  } catch {
    return null;
  }
};

// Create multiple predmet records
// export const createMultiplePredmet = async (predmetArray: Predmet[]): Promise<string | null> => {
//   try {
//     const response = await axios.post<string>(`${API_URL}/predmet/novi-vise`, predmetArray, {
//       headers: { Authorization: `Bearer ${getToken()}` }
//     });
//     return response.data;
//   } catch {
//     return null;
//   }
// };

// Get a single predmet by ID
export const getPredmetById = async (id: number): Promise<Predmet | null> => {
  try {
    const response = await axios.get<Predmet>(`${API_URL}/predmet/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return response.data;
  } catch {
    return null;
  }
};

// Get all predmeti
export const getAllPredmeti = async (): Promise<Predmet[]> => {
  try {
    const response = await axios.get<Predmet[]>(`${API_URL}/predmeti`);
    return response.data;
  } catch {
    return [];
  }
};

// Update a predmet by ID
// export const updatePredmet = async (id: number, predmet: Partial<Predmet>): Promise<boolean> => {
//   try {
//     await axios.put(`${API_URL}/predmet/azuriraj/${id}`, predmet, {
//       headers: { Authorization: `Bearer ${getToken()}` }
//     });
//     return true;
//   } catch {
//     return false;
//   }
// };

// Delete a predmet by ID
// export const deletePredmet = async (id: number): Promise<boolean> => {
//   try {
//     await axios.delete(`${API_URL}/predmet/obrisi/${id}`, {
//       headers: { Authorization: `Bearer ${getToken()}` }
//     });
//     return true;
//   } catch {
//     return false;
//   }
// };
