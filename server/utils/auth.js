import decode from "jwt-decode";
import jwt from "jsonwebtoken";
import Cookies from 'js-cookie';

const JWT_SECRET = process.env.JWT_SECRET;

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    return Cookies.get('jwtToken');
  }

  login(idToken) {
    Cookies.set("jwtToken", idToken);
    if (typeof window !== "undefined") {
      window.location.assign("/");
    }
  }

  logout() {
    Cookies.remove("jwtToken");
    if (typeof window !== "undefined") {
      window.location.assign("/");
    }
  }

  signToken(userData) {
    const token = jwt.sign(userData, JWT_SECRET, { expiresIn: "1h" });
    return token;
  }
  
verifyToken(token) {
  console.log("Verifying token:", token);
  if (!token) {
    return null;
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded token:", decoded);
    return decoded; // return the whole decoded token, not just decoded.data
  } catch (err) {
    console.error("Token verification error:", err);
    return null;
  }
}

}

const authService = new AuthService();

export default authService;

