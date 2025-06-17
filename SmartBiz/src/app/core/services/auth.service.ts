import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
getCurrentUser(): { name: string, role: string } | null {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      return JSON.parse(userJson);
    }
    return null;
  }


  private readonly TOKEN_KEY = 'token';
  private readonly ROLE_KEY = 'role';
  private readonly NAME_KEY = 'name';

  login(token: string, role: string, name: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.ROLE_KEY, role);
    localStorage.setItem(this.NAME_KEY, name);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUserRole(): string | null {
    return localStorage.getItem(this.ROLE_KEY);
  }

  getUserName(): string | null {
    return localStorage.getItem(this.NAME_KEY);
  }

  logout(): void {
    localStorage.clear();
  }
}
