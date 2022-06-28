import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
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

  singUp(name: string,email: string, password: string) {

    const url: string = `${this.baseUrl}/auth/new`;
    const body = { name ,email, password};

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

  validarToker(): Observable<boolean> {
    
    const url: string = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders().set('x-token', sessionStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(url, { headers })
      .pipe(
        map( resp => {
          sessionStorage.setItem('token', resp.token!);
            this._user = {
              name: resp.name!,
              uid: resp.uid!
            }
          return resp.ok
        }),
        catchError(() => of(false))
      )
  }

  logout() {
    sessionStorage.clear();
  }


}
