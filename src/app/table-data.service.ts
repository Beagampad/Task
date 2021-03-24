import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TableDataService {

  constructor(private http: HttpClient) { }

  rutasUrl = 'http://localhost:3000'; // URL to web API de mi backend

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

    // Get all Datasets
    getAll(): Observable<any> {
      // return of(RUTAS);
      const url = `${this.rutasUrl}`;
      return this.http.get<any>(url)
      .pipe(
        map(data => data),
         catchError(this.handleError('getRutas', []))
      );
    }
  
    /** GET Dataset by id */
    getDataset(id: number): Observable<any> {
      const url = `${this.rutasUrl}/notalone/rutadetalle?id=${id}`;
      return this.http.get<any>(url).pipe(
        catchError(this.handleError<IRuta>(`getRuta id=${id}`))
        );
    }
}

interface IRuta {
  id: number;
  usuaria: string;
  hora ?: string;
  origen: string;
  destino: string;
  medio: string;
  coordenadas: string;
  comentarios: string;
}
