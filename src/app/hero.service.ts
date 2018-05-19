import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';

import { catchError,map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { MessageService } from './message.service';
// import { HEROES } from './heros-list';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private messageService : MessageService,
    private http: HttpClient,
  ) {}

    // When concept of observables is not used!! 
    // getHeroes(): Hero[] {
    //   return HEROES;
    // }
    private heroesURL = 'api/heroes';  //URL to web API  
    //the RxJS "of() function" returns a RxJS Observable (Asynchrounous signature)!!
     ///** GET heroes from the server **///
    getHeroes(): Observable<Hero[]> {
      // return of(HEROES);
      //Getting heroes from server (swapped of() with http.get )
      return this.http.get<Hero[]>(this.heroesURL).pipe(
        tap(heroes => this.log(`fetched heroes`)),
        catchError(this.handleError('getHeroes', []))
      );
    }
    
    /** POST: add a new hero to the server */
    addHero(hero: Hero): Observable<Hero>{
      return this.http.post<Hero>(this.heroesURL, hero, httpOptions).pipe(
        tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      );
    }

    /** PUT: update the hero on the server */
    updateHero(hero:Hero): Observable<any> {
      return this.http.put(this.heroesURL, hero, httpOptions).pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
    }

    // (Asynchrounous signature).
    // getHero(id: number): Observable<Hero> {
    //   // TODO: send the message _after_ fetching the hero and Note: the use of `backtick`.
    //   this.messageService.add(`HeroService: fetched hero id=${id}`);
    //   return of(HEROES.find(hero => hero.id === id));
    // }

    /** GET hero by id. Will 404 if id not found */
    getHero(id: number): Observable<Hero> {
      const url = `${this.heroesURL}/${id}`;
      return this.http.get<Hero>(url).pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
    }

    /** GET hero by id. Return `undefined` when id not found */
    getHeroNo404<Data>(id: number): Observable<Hero> {
      const url = `${this.heroesURL}/?id=${id}`;
      return this.http.get<Hero[]>(url)
        .pipe(
          map(heroes => heroes[0]), // returns a {0|1} element array
          tap(h => {
            const outcome = h ? `fetched` : `did not find`;
            this.log(`${outcome} hero id=${id}`);
          }),
          catchError(this.handleError<Hero>(`getHero id=${id}`))
        );
    }
  /*** Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
    
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
    
        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);
    
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }

    private log(message: string){
      this.messageService.add('HeroService: '+ message)
    }
}
