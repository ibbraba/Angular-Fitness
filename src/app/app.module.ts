import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { MeasureComponent } from './measure/measure.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { FoodComponent } from './food/food.component';
import { RecapComponent } from './recap/recap.component';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { ImcPipe } from './imc.pipe';
import { HomeHistoryComponent } from './home-history/home-history.component';
import { GoalWeightComponent } from './goal-weight/goal-weight.component';

@NgModule({
  declarations: [
    AppComponent,
    MeasureComponent,
    ExerciseComponent,
    FoodComponent,
    RecapComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ImcPipe,
    HomeHistoryComponent,
    GoalWeightComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
