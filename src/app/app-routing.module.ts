import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MeasureComponent } from './measure/measure.component';
import { FoodComponent } from './food/food.component';
import { ExerciceComponent } from './exercice/exercice.component';

 const routes: Routes = [
      { path: '',
        component: HomeComponent
      },
      { path: 'measure',
        component: MeasureComponent
      },
      { path: 'food',
        component: FoodComponent
      },
      { path: 'exercise',
        component: ExerciceComponent
      }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 

}
