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
 * Vraca id usera
 * 
 * @param {string} username
 */
   getUserId(username){
    
    const data = {
      username: username
    }

    return this.http.post(`${this.uri}/getUserId`, data);
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
 * Vraca sve usere ckojima status nije confirmed
 * 
 * @returns collection of users
 */
  getUnconfirmedUsers(){
    return this.http.get(`${this.uri}/getUnconfirmedUsers`);
  }

  /**
   * Setuje status usera na confirmed
   *
   * @param {String} id usera
   * @returns status
   */
   setUserStatusAsConfirmed(id){

    const data = {
      id: id
    }

    return this.http.post(`${this.uri}/setUserStatusAsConfirmed`, data);
  }

  /**
   * Delete user request
   *
   * @param {String} id usera
   * @returns status
   */
  deleteUser(id){

    const data = {
      id: id
    }

    return this.http.post(`${this.uri}/deleteUser`, data);
  }

  /**
   * Get sve delegate
   * 
   * @returns collection of delegates
   */
    getAllDelegates(){
      return this.http.get(`${this.uri}/getAllDelegates`);
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
   * Get sport obj by name
   * 
   * @req sportName 
   * @res sport obj 
   */
   sportByName(sportName){

    const data = {
      'sportName' : sportName
    }

    return this.http.post(`${this.uri}/sportByName`, data);
  
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
 * Get sport of discipline
 *
 * @param discipline
 * @returns sport name
 */
   getSportNameOfDiscipline(disciplineName){

  const data = {
    'disciplineName' : disciplineName
  }

    return this.http.post(`${this.uri}/getSportNameOfDiscipline`, data);
  
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

/**
 * Formira takmicenje za prosledjeni id
 *
 * @param {String} id
 * @returns status
 */
  setCompetitionAsFormed(id){

      const data = {
        "id" : id
      }

      return this.http.post(`${this.uri}/setCompetitionAsFormed`, data);
  }

  /**
   * Dodaj zemlju
   * @param country
   * @returns res.json()
   */
  addCountry(country){
    return this.http.post(`${this.uri}/addCountry`, country);
  }

  /**
   *  Get all competitions for specific delegate
   *
   * @param delegateID
   * @returns collection of competitions
   */
   getAllCompetitionsForSpecificDelegate(delegateID){

    const data = {
      "delegateID" : delegateID
    }

    return this.http.post(`${this.uri}/getAllCompetitionsForSpecificDelegate`, data);
  }

  /**
 *  Get all competitions for specific delegate where schedule is created
 *
 * @param delegateID
 * @param competitionType
 * @returns collection of competitions
 */
  getAllCompForDelegateWithSchedule(delegateID){
    const data = {
      "delegateID" : delegateID
    }
    return this.http.post(`${this.uri}/getAllCompForDelegateWithSchedule`, data);
  }

 /**
 * Get all athletes for competition
 * 
 * @param compName
 * @returns collection of athletes
 */
  getAllAthletesForCompetition(compName){

    const data = {
      "compName" : compName
    }

    return this.http.post(`${this.uri}/getAllAthletesForCompetition`, data);
  }

  /**
 * Dodaj individualni rezultat
 * 
 * @param resultIndivid
 * @returns res.json()
 */
  addResultIdiv(result){
    return this.http.post(`${this.uri}/addResultIdiv`, result);
  }

/**
 * Setuje rasporedNapravlje na 1
 *
 * @param {String} id
 * @returns status
 */
  setRasporedNapravljen(id){

    console.log(id);

    const data = {
      "id" : id
    }

    return this.http.post(`${this.uri}/setRasporedNapravljen`, data);
  }

  /**
 * Setuje datum i vreme finala
 *
 * @param {String} id
 * @returns status
 */
  setDatumVremeFinala(id,datum,vreme){

    const data = {
      "id" : id,
      "datumFinala": datum,
      "vremeFinala": vreme
    }

    return this.http.post(`${this.uri}/setDatumVremeFinala`, data);
  }

  /**
 * Get all results for competition
 * @param competitionID
 * @returns collection of results
 */
  getAllIndivResultsForCompetition(competitionID){

    const data = {
      "competitionID" : competitionID
    }

    return this.http.post(`${this.uri}/getAllIndivResultsForCompetition`, data);
  }

  /**
 * Unesi rezultat
 *
 * @param {String} idRes
 * @param {String} resultColumnName
 * @param {String} value
 * @returns status
 */
  unesiRezultat(idRes, resultColumnName, value, format){

    console.log("unesiREz " + idRes + " " + resultColumnName + " " + value + " " + format);

    const data = {
      "idRes" : idRes,
      "resultColumnName" : resultColumnName,
      "value" : value,
      "format" : format
    }

    return this.http.post(`${this.uri}/unesiRezultat`, data);
  }

  /**
 * Otkljucaj kolonu
 *
 * @param {String} idRes
 * @param {String} resultColumnName
 * @returns status
 */
  otkljucajKolonu(idRes, resultColumnName){

    const data = {
      "idRes" : idRes,
      "resultColumnName" : resultColumnName
    }

    return this.http.post(`${this.uri}/otkljucajKolonu`, data);
  }

/**
 * Get result by ID
 * @param resultID
 * @returns result
 */
 getResult(resultID){

  const data = {
    "resultID" : resultID
  }

  return this.http.post(`${this.uri}/getResult`, data);
}

  /**
   * Dodaj tead
   * @param team
   * @returns status
   */
  addTeam(team){
    return this.http.post(`${this.uri}/addTeam`, team);
  }

  /**
   * Get allTeams for competition
   * @param competitionID
   * @returns collection of teams
   */
  getTeamsForCompetition(competitionID){

    const data = {
      competitionID: competitionID
    }

    return this.http.post(`${this.uri}/getTeamsForCompetition`, data);
  }

  /**
   * Inc num of team players
   * @param teamName
   * @returns collection of teams
   */
   incNumOfTeamPlayers(teamName){
    

    const data = {
      "teamName": teamName
    }

    return this.http.post(`${this.uri}/incNumOfTeamPlayers`, data).subscribe(res=>{
      console.log(res);
    });
  }

  /**
 * Set group name of team
 * @param teamName
 * @param groupName (grupaA/grupaB)
 * @returns status
 */
  setTeamGroupName(teamName, groupName){
    

    const data = {
      "teamName": teamName,
      "groupName": groupName
    }

    return this.http.post(`${this.uri}/setTeamGroupName`, data).subscribe(res=>{
      console.log(res);
    });
  }

  /**
   * Dodaj match
   * @param match
   * @returns status
   */
  addMatch(match){
  
    return this.http.post(`${this.uri}/addMatch`, match);
  }

  /**
 * Get team by group name
 * @param teamName
 * @param competitionID
 * @returns team
 */
   getTeamByGroupAndCompetitionID(groupName, competitionID){

    const data = {
      "groupName": groupName,
      "competitionID" : competitionID
    }

    return this.http.post(`${this.uri}/getTeamByGroupAndCompetitionID`, data);
  }

  /**
   * Get all matches for competition
   * @param competitionName
   * @returns collection of matches
   */
  getMatchesForCompetition(competitionName){

    const data = {
      "competitionName": competitionName
    }

    return this.http.post(`${this.uri}/getMatchesForCompetition`, data);
  }

  /**
   * Set num of teams for competition
   * @param competitionName
   * @param numOfTeams
   * @returns status
   */
   setNumOfTeams(competitionName, numOfTeams){

    const data = {
      "competitionName": competitionName,
      "numOfTeams" : numOfTeams
    }

    return this.http.post(`${this.uri}/setNumOfTeams`, data).subscribe(res=>{
      console.log(res);
    });
  }

}


