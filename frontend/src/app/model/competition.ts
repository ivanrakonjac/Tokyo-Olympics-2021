import { Time } from "@angular/common";

export class Competition{
    _id: Object;
    competitionName: string;
    sport: string;
    discipline: string;
    format: number;
    sex: string;
    type: string;
    startDate: Date;
    endDate: Date;
    location: string;
    delegat: string;
    formirano: number;
    rasporedNapravljen : number;
    formatRezultata: string;
    minTakmicara: number;
    maxTakmicara: number;
    maxTakmicaraUFinalu: number;
    datumFinala: Date;
    vremeFinala: Time;
}
