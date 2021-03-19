import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './components/body/body.component';
import { TrainingListComponent } from './components/training-list/training-list.component';

const routes:Routes = [

{
  path:'',
  redirectTo:'/main',
  pathMatch:'full'
},
{
  path:'main',
  component:BodyComponent
},
{
  path:'main/list',
  component:TrainingListComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
