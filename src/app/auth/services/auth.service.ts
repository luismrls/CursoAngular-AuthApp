import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, Usuario } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _user!: Usuario;

  get usuario(){
    return {...this._user}
  }

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {

    const url: string = `${this.baseUrl}/auth`;
    const body = {email, password};

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(response => {
          if(response.ok){
            this._user = {
              name: response.name!,
              uid: response.uid!
            }
          }
        }),
        map(response => response.ok),
        catchError(err => of(false) )
      )

  }
}
