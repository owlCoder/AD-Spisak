import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (email: string, password: string, predmetId: number): Promise<string | null> => {
  try {
    const response = await axios.post<string | null>(`${API_URL}/auth/prijava/${predmetId}`, { email, password });
    return response.data;
  } catch {
    return null;
  }
};