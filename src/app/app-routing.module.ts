import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MeasureComponent } from './measure/measure.component';
import { FoodComponent } from './food/food.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { RecapComponent } from './recap/recap.component';

 const routes: Routes = [
      { path: '',
        component: HomeComponent
      },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'measure', component: MeasureComponent},
  { path: 'food/:userId/:recapId', component: FoodComponent},
  { path: 'exercise/:userId/:recapId', component: ExerciseComponent},
  { path: 'recap/:userId/:recapId', component: RecapComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {



}
