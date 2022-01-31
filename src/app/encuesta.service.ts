import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Encuesta } from './model/encuesta';
import { TipoMusica } from './model/tipoMusica';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  private encuestaUrl = environment.apiBaseUrl;
  private routerInfo: BehaviorSubject<boolean>;

  constructor(private http: HttpClient ) { 
    this.routerInfo = new BehaviorSubject<boolean>(false);
  }

  /**variable subscribe get */
  getValue(): Observable<boolean> {
    return this.routerInfo.asObservable();
  }
    /**variable subscribe set*/
  setValue(newValue: any): void {
    this.routerInfo.next(newValue);
  }

  /**Obtiene lista de encuestas disponibles */
  public getEncuesta(): Observable<Encuesta[]>{
    return this.http.get<Encuesta[]>(`${this.encuestaUrl}/encuesta/all`);
  } 

  /**Obtiene lista de generos de tipo de musica */
  public getGeneroMusical(): Observable<TipoMusica[]>{
    return this.http.get<TipoMusica[]>(`${this.encuestaUrl}/tipomusica/all`);
  }

  /**Guarda la encuesta */
  public postSaveEncuesta(encuesta: Encuesta):Observable<Encuesta>{
    return this.http.post<Encuesta>(`${this.encuestaUrl}/encuesta/add`,encuesta);
  }

  /**Obtiene si existe un email */
  public getEmailExiste(email: string): Observable<string>{
    return this.http.get<string>(`${this.encuestaUrl}/encuesta/email`,{
      params:{
        email : email
      }
    });
  } 
}
