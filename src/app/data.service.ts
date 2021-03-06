import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = `${environment.url}` + '/assets/data/';
  charactersEndPoint = 'characters.json';
  kuralsEndPoint = 'thirukural.json';

  constructor(private httpClient: HttpClient) { }

  getCharsData() {
    return this.httpClient.get(this.url + this.charactersEndPoint);
  }

  getKurals() {
    return this.httpClient.get(this.url + this.kuralsEndPoint);
  }
}
