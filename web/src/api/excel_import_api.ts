import axios from 'axios';
import { Korisnik } from '../models/korisnik/korisnik';

const API_URL = import.meta.env.VITE_API_URL;

// Function to get the token from localStorage
const getToken = () => localStorage.getItem('token');

// Convert Excel workbook to JSON
export const readFromSSluzbaExcel = async (file: File): Promise<Korisnik[] | null> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post<Korisnik[]>(`${API_URL}/xlsx/convert`, formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'multipart/form-data', 
      },
    });

    return response.data;
  } catch {
    return null;
  }
};
