import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient, private router: Router) { }

  public currentUserType: any = [];
  public subject = new Subject<any>();

  private messageSource = new  BehaviorSubject(this.currentUserType);
  currentMessage = this.messageSource.asObservable();
  changeMessage(message: string) {this.messageSource.next(message);localStorage.setItem('type', message);}

  uri = 'http://localhost:4000'

  /**
   * Login korisnika
   * 
   * @param email 
   * @param password 
   * @returns 
   */
  login(email, password){
    
    const data = {
      email: email,
      password: password
    }

    return this.http.post(`${this.uri}/login`, data);

  }

  /**
   * Proverava da li za prosledjenu zemlju vodja delegacije vec postoji u bazi
   * 
   * @param country 
   * @returns 
   */
  vodjaDelegacijePostoji(country){
    
    const data = {
      country: country
    }

    return this.http.post(`${this.uri}/vodjaDelegacijePostoji`, data);

  }

  /**
   * Registruje novog korisnika
   * 
   * @param newUser 
   * @returns is user added or not
   */
  register(newUser){
    return this.http.post(`${this.uri}/register`, newUser);
  }
  
  /**
   * Dohvata imena svih sportova
   * 
   * @returns collection of all sports names
   */
  getAllSports(){
    return this.http.get(`${this.uri}/getAllSports`);
  }

  /**
   * Proverava da li postoji prosledjeni sport
   * 
   * @param sportName 
   * @returns true-sport postoji, false ne postoji 
   */
  sportPostoji(sportName){

    const data = {
      sportName: sportName
    }

    return this.http.post(`${this.uri}/sportPostoji`, data);

  }

  /**
   * Dodavanje sporta u bazu
   * 
   * @param sport 
   * @returns 200 ok / 400 not ok
   */
  addSport(sport){
    return this.http.post(`${this.uri}/addSport`, sport);
  }

  /**
   * Provara da li je disciplina vec u bazi
   * 
   * @param disciplineName 
   * @returns true-postoji, false - ne postoji
   */
   sportDisciplinaPostoji(disciplineName){

    const data = {
      name: disciplineName,
    }

    return this.http.post(`${this.uri}/sportDisciplinaPostoji`, data);

  }

  /**
   * Dodavanje sportske discipline u bazu
   * 
   * @param discipline 
   * @returns 200 ok / 400 not ok
   */
   addSportDiscipline(discipline){
    return this.http.post(`${this.uri}/addSportDiscipline`, discipline);
  }

  /**
   * Dohvata imena svih disciplina
   * 
   * @returns collection of all disciplines names
   */
    getAllDisciplinesNames(){
      return this.http.get(`${this.uri}/getAllDisciplinesNames`);
    }

  /**
   * Dohvata imena svih disciplina za prosledjeni sport
   *
   * @param sport
   * @returns collection of all disciplines names
   */
   getAllDisciplinesForSport(sportName){
     const data = {
       'sport' : sportName
     }
    return this.http.post(`${this.uri}/getAllDisciplinesForSport`, data);
  }

  /**
   * Dodavanje takmicenja u bazu
   * 
   * @param competition (json) 
   * @returns 200 ok / 400 not ok
   */
   addCompetition(competition){
    return this.http.post(`${this.uri}/addCompetition`, competition);
  }

  /**
   * Dohvatanje imena takmicenja za prosledjene parametre
   * 
   * @param discipline
   * @param sex 
   * @res competition name
   */
   getCompetitionName(discipline, sex){

      const data = {
        "discipline" : discipline,
        "sex" : sex
      }

      return this.http.post(`${this.uri}/getCompetitionName`, data);
    }

  /**
   * Dohvata ime, sport, disciplinu, pol svih neformiranih takmicenja
   *
   * @returns collection of all unformed competitions
 */
   getAllUnformedCompetitions(){
      return this.http.get(`${this.uri}/getAllUnformedCompetitions`);
    }

  /**
   * Dodavanje sportiste u bazu
   * 
   * @param competition (json) 
   * @returns 200 ok / 400 not ok
   */
   addAthlete(athlete){
    return this.http.post(`${this.uri}/addAthlete`, athlete);
  }

/**
 * Dohvata ime sport za koji je sportista prijavljen (ako nije vraca null)
 * 
 * @param athleteFirstname 
 * @param athleteLastname
 * @returns sport of athlete
 */
  getSportOfAthlete(athleteFirstname,athleteLastname){

    const data = {
      "athleteFirstname" : athleteFirstname,
      "athleteLastname" : athleteLastname
    }

      return this.http.post(`${this.uri}/getSportOfAthlete`, data);
    }

}
