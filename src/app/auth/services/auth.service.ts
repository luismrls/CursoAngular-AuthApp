import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';
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
            sessionStorage.setItem('token', response.token!);
            this._user = {
              name: response.name!,
              uid: response.uid!
            }
          }
        }),
        map(response => response.ok),
        catchError( (err: HttpErrorResponse) => of(err.error.message) )
      )

  }

  validarToker() {
    
    const url: string = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders().set('x-token', sessionStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(url, { headers });


  }


}
