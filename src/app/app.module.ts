import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdDatepickerModule, MdNativeDateModule } from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import 'hammerjs';

import { AppComponent } from './app.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { NowListComponent } from './now-list/now-list.component';

import { RankingService } from './ranking.service';
import { AppInfoComponent } from './app-info/app-info.component';

//ルーター
const appRoutes = [
  { path: '', component:TopMenuComponent,
    children: [
      { path: ':kind', component: NowListComponent },
    ]
  },
  { path: "app/:id", component:AppInfoComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    NowListComponent,
    AppInfoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    NgxChartsModule,
    MdDatepickerModule,
    MdNativeDateModule,
  ],
  providers: [
    RankingService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
