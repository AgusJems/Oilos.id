import { jwtDecode } from "jwt-decode";

export interface DecodedUser {
  Username: string;
  RoleId: number;
  RoleCode: string;
  RoleName: string;
  Name: string;
  Identity: string;
  Phone?: string | null;
  Email?: string | null;
  Area?: string | null;
  CodeRefferal?: string;
  iat?: number;
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
