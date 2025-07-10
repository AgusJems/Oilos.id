import { jwtDecode } from "jwt-decode";

export interface DecodedUser {
  username: string,
  name: string,
  identity: string,
  phone: string,
  email: string,
  code: string,
  roles_code: string,
  roles_name: string,
  cities_name: string,
  provinces_name: string
  status: string
  iat: number;
}

export function decodeToken(token: string): DecodedUser | null {
  try {
    const decoded = jwtDecode<DecodedUser>(token);
    return decoded;
  } catch (error) {
    console.error("Gagal decode token:", error);
    return null;
  }
}
