import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'



@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  API_URI = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  getTrainings(){
    return this.http.get(`${this.API_URI}/trainings`)
            
  }

}
