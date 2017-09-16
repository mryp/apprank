import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { AppComponent } from './app.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { NowListComponent } from './now-list/now-list.component';

import { RankingService } from './ranking.service';

//ルーター
const appRoutes = [
  { path: '', component:TopMenuComponent,
    children: [
      { path: ':kind', component: NowListComponent },
    ]
  },
]

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    NowListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
  ],
  providers: [
    RankingService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
