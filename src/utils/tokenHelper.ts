import { cookies } from "next/headers";

const cookieStore = await cookies();

export class TokenHelper {
  static getToken() {
    return cookieStore.get("userToken");
  }
  static setToken(token: string) {
    return cookieStore.set("userToken", token);
  }
  static deleteToken() {
    return cookieStore.delete("userToken");
  }
}
