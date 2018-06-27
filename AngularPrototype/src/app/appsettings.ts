export class AppSettings {
  /*
  BASE PATHS, PARAMETERS ARE DEFINED IN THE RESPECTIVE SERVICES
   */

   public static server: string = 'http://softwerkerei.de:';
  //public static server: string = 'http://localhost:';
  //public static server: string = '';


  // TournamentDog
  public static getTournamentDogsUrl = AppSettings.server + '8080/get/tournamentdogs/';
  public static saveCoursingUrl = AppSettings.server + '8080/save/tournamentdog';
  public static saveTournamentDogRaceUrl = AppSettings.server + '8080/save/tournamentdograce';
  public static deleteTournamentDogUrl = AppSettings.server + '8080/delete/tournamentdog/';
  public static deleteTournamentDogRaceUrl = AppSettings.server + '8080/delete/tournamentdograce/';
  // Breeder
  public static breedersUrl = AppSettings.server + '8080/get/breeders';
  public static saveBreederUrl = AppSettings.server + '8080/save/breeder';
  public static updateBreederUrl = AppSettings.server + '8080/update/breeder/';
  public static deleteBreederUrl = AppSettings.server + '8080/delete/breeder/';
  // Club
  public static saveClubUrl = AppSettings.server + '8080/save/club';
  public static clubsUrl = AppSettings.server + '8080/get/clubs';
  public static updateClubUrl = AppSettings.server + '8080/update/club/';
  public static deleteClubUrl = AppSettings.server + '8080/delete/club/';
  public static getClubsUrl = AppSettings.server + '8080/get/clubs';

  // Owner
  public static saveOwnerUrl = AppSettings.server + '8080/save/owner';
  public static ownersUrl = AppSettings.server + '8080/get/owners';
  public static updateOwnerUrl = AppSettings.server + '8080/update/owner/';
  public static deleteOwnerUrl = AppSettings.server + '8080/delete/owner/';
  // Judge
  public static judgesUrl = AppSettings.server + '8080/get/judges';
  public static saveJudgeUrl = AppSettings.server + '8080/save/judge';
  public static updateJudgeUrl = AppSettings.server + '8080/update/judge/'
  public static deleteJudgeUrl = AppSettings.server + '8080/delete/judge/';
  // Tournament
  public static getTournamentUrl = AppSettings.server + '8080/get/tournament/';
  public static tournamentsUrl = AppSettings.server + '8080/get/tournaments';
  public static saveTournamentUrl = AppSettings.server + '8080/save/tournament';
  public static updateTournamentUrl = AppSettings.server + '8080/update/tournament/'
  public static deleteTournamentUrl = AppSettings.server + '8080/delete/tournament/'

  // Dogpass
  public static dogsUrl = AppSettings.server + '8080/get/dogs';
  public static saveDogpassUrl = AppSettings.server + '8080/save/dog';
  public static getDogUrl = AppSettings.server + '8080/get/dog/';
  public static updateDogUrl = AppSettings.server + '8080/update/dog/'
  public static deleteDogUrl = AppSettings.server + '8080/delete/dog/';

  // Race
  public static getRacesUrl = AppSettings.server + '8080/get/races/'
  public static updateRaceDistanceUrl = AppSettings.server + '8080/update/racedistance/';
  public static raceRankingResultsUrl = AppSettings.server + '8080/get/races/'
  public static raceDetailsUrl = AppSettings.server + '8080/get/racedetails/'


  // Coursing
  public static coursingResultsUrl = AppSettings.server + '8080/get/coursings/'
  public static coursingDetailsUrl = AppSettings.server + '8080/get/coursingdetails/'




  public static getOwnersUrl = AppSettings.server + '8080/get/owners';
  public static getBreedersUrl = AppSettings.server + '8080/get/breeders';


}
