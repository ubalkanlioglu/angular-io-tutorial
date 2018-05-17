import { Injectable } from '@angular/core';

import { Hero } from "./../../Hero";
import { HEROES } from "./../../mock-heros";

import { Observable, of } from 'rxjs';

import { MessageService } from "./../message/message.service";

import { HttpClient, HttpHeaders } from "@angular/common/http";

import { catchError, tap } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes';
  constructor(private httpClient: HttpClient, private messageService: MessageService) { }

  getHero = (id: number): Observable<Hero> => {
    // this.log(`hero fetched: id=${id}`);
    // return of(HEROES.find(hero => hero.id === id))
    const url = `${this.heroesUrl}/${id}`;
    return this.httpClient.get<Hero>(url).pipe(
      tap(hero => this.log(`hero of id:${id} fetched`)),
      catchError(this.handleError(`gethero id:${id}`))
    );
  };

  getHeroes = (): Observable<Hero[]> => {
    this.log('HeroService: fetched heroes');
    return this.httpClient.get<Hero[]>(this.heroesUrl).pipe(
      tap(heroes => this.log(`fetched heroes`)),
      catchError(this.handleError('getHeroes', []))
    );
  };



  updateHero = (hero: Hero): Observable<Hero> => {
    return this.httpClient.put<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap(() => {
        this.log(`update hero id=${hero.id}`)
      }),
      catchError(this.handleError<any>('updateHero'))
    )
  }

  addHero = (hero: Hero): Observable<Hero> => {
    return this.httpClient.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap(() => this.log(`${hero.name} added`)),
      catchError(this.handleError<Hero>(`addHero`))
    )
  }

  deleteHero = (hero: Hero | number): Observable<Hero> => {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
    return this.httpClient.delete<Hero>(url, httpOptions).pipe(
      tap(() => {
        this.log(`deleted hero id:${id}`)
      }),
      catchError(this.handleError('deleteHero'))
    );
  }

  searchHeroes = (term: string): Observable<Hero[]> => {
    if (!term.trim()) {
      return of([]);
    }

    return this.httpClient.get<Hero[]>(`${this.heroesUrl}/?name=${term}`, httpOptions).pipe(
      tap(() => this.log(`found heroes matching ${term}`)),
      catchError(this.handleError('searchHeroes', []))
    )
  };

  private log = (message: string) => this.messageService.add(message);

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
