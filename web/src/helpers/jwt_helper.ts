import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  id: string;
  uloga: string;
  pnaziv: string;
  pfond: number;
  pid: number;
  exp: number;
}

export const decodeToken = (): TokenPayload | null => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return jwtDecode<TokenPayload>(token);
  } catch {
    logout();
    return null;
  }
};

export const isTokenValid = (): boolean => {
  const decoded = decodeToken();
  return decoded ? decoded.exp * 1000 > Date.now() : false;
};

export const getClaimsFromToken = (): TokenPayload | null => {
  return decodeToken();
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

