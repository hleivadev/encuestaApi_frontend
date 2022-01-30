import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Encuesta } from './model/encuesta';
import { TipoMusica } from './model/tipoMusica';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  private heroesUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient ) { }

  /**Obtiene lista de encuestas disponibles */
  public getEncuesta(): Observable<Encuesta[]>{
    return this.http.get<Encuesta[]>(`${this.heroesUrl}/encuesta/all`);
  } 

  /**Obtiene lista de generos de tipo de musica */
  public getGeneroMusical(): Observable<TipoMusica[]>{
    return this.http.get<TipoMusica[]>(`${this.heroesUrl}/tipomusica/all`);
  }

  /**Guarda la encuesta */
  public postSaveEncuesta(encuesta: Encuesta):Observable<Encuesta>{
    return this.http.post<Encuesta>(`${this.heroesUrl}/encuesta/add`,encuesta);
  }

}
