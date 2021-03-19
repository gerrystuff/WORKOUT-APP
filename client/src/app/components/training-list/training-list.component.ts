import { Component, OnInit } from '@angular/core';
import {TrainingService} from '../../services/training.service'
@Component({
  selector: 'app-training-list',
  templateUrl:'./training-list.component.html',
  styleUrls:['./training-list.component.css']
})
export class TrainingListComponent implements OnInit {
  trainings:any =[];

  constructor(private trainingService:TrainingService) { }

  ngOnInit(): void {
    this.refreshTrainings();
  }

  refreshTrainings():void{
    this.trainingService.getTrainings().subscribe(
      res => {
        this.trainings = res;
        console.log(this.trainings)
      },
      err => console.log(err)
    )
  }




}
