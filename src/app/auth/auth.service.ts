import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User, BackendUser } from '../shared/models/user';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User | undefined;

  constructor(private http: HttpClient) { }

  addUser(user: { username: string; password: string; }): Observable<BackendUser> {
    const payload = { Username: user.username, Password: user.password };
    return this.http.post<BackendUser>('http://localhost:3000/users', payload);
  }

  private backendToUser(b: BackendUser): User {
    return {
      id: b.id,
      username: b.Username,
      password: b.Password,
      Mail: b.Mail,
      Nom: b.Nom,
      Prenom: b.Prenom
    } as User;
  }

  login(user: { username: string; password: string; }): Observable<User[]> {
    return this.http
      .get<BackendUser[]>('http://localhost:3000/users?Username=' + encodeURIComponent(user.username) + '&Password=' + encodeURIComponent(user.password))
      .pipe(map(arr => arr.map(b => this.backendToUser(b))));
  }

  logout() {
    this.user = undefined;
    localStorage.removeItem('user');
  }

  saveUser() {
    localStorage.setItem('user', '' + this.user?.id);
  }

  getSavedUser() {
    return localStorage.getItem('user');
  }

  isUserConnected() {
    if (this.user) {
      this.saveUser();
      return true;
    } else if (this.getSavedUser()) {
      this.getSavedUserInfo().subscribe((users: User[]) => {
        this.user = users[0];
      });
      return true;
    }
    return false;
  }

  private getSavedUserInfo(): Observable<User[]> {
    return this.http.get<BackendUser[]>('http://localhost:3000/users?id=' + this.getSavedUser()).pipe(
      map(arr => arr.map(b => this.backendToUser(b)))
    );
  }
}
