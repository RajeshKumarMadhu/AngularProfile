import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaincomponentComponent } from './maincomponent/maincomponent.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PaalsComponent } from './paals/paals.component';
import * as echarts from 'echarts';
import { SeerPipe } from './seer.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MaincomponentComponent,
    HomeComponent,
    HeaderComponent,
    PaalsComponent,
    SeerPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressBarModule, MatToolbarModule, MatIconModule, MatTabsModule, MatCardModule, MatExpansionModule,
    NgxEchartsModule.forRoot({
      echarts: { init: echarts.init }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
