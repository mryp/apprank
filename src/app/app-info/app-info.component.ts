import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { DateAdapter, NativeDateAdapter } from '@angular/material';
import 'rxjs/add/observable/of';

import { RankingService, NowResponse, NowAppsResponse, AppInfoResponse } from '../ranking.service'

@Component({
  selector: 'app-app-info',
  templateUrl: './app-info.component.html',
  styleUrls: ['./app-info.component.css']
})
export class AppInfoComponent implements OnInit {
  appID = 0;
  appInfo:AppInfoResponse = null;
  rankingList = [
    {
      "name": "セールス",
      "series": [
        {
          "name": "2017-09-01",
          "value": 3,
        },
        {
          "name": "2017-09-02",
          "value": 2,
        },
        {
          "name": "2017-09-03",
          "value": 1,
        },
        {
          "name": "2017-09-04",
          "value": 7,
        },
        {
          "name": "2017-09-05",
          "value": 10,
        },
      ],
    },
    {
      "name": "無料",
      "series": [
        {
          "name": "2017-09-01",
          "value": 1,
        },
        {
          "name": "2017-09-02",
          "value": 1,
        },
        {
          "name": "2017-09-03",
          "value": 4,
        },
        {
          "name": "2017-09-04",
          "value": 5,
        },
        {
          "name": "2017-09-05",
          "value": 4,
        },
      ],
    },
    {
      "name": "有料",
      "series": [
        {
          "name": "2017-09-01",
          "value": 10,
        },
        {
          "name": "2017-09-02",
          "value": 20,
        },
        {
          "name": "2017-09-03",
          "value": 30,
        },
        {
          "name": "2017-09-04",
          "value": 30,
        },
        {
          "name": "2017-09-05",
          "value": 30,
        },
      ],
    }
  ];

  // options
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C']
  };

  xAxisTickFormatting(str: string) {
    return str;
  }

  yAxisTickFormatting(str: string) {
    return str;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private dateAdapter: DateAdapter<NativeDateAdapter>,
    private ranking: RankingService,
  ) {
    dateAdapter.setLocale('ja-JP');
    route.params.subscribe(params => {
      let isChanged = false;
      let appID = +params['id'];
      if (this.appID != appID) {
        isChanged = true;
      }

      //更新があったデータだけ再取得を行う
      this.appID = appID;
      if (isChanged) {
        this.updateInfo(this.appID);
      }
    });
  }

  ngOnInit() {
    console.log("AppInfoComponent#ngOnInit");
  }

  updateInfo(appID:number) {
    console.log("AppInfoComponent#updateInfo appid=" + appID);
    this.appInfo = null;
    this.ranking.getAppInfo(appID).subscribe(
      res => {
        this.showInfoSuccess(res);
      },
      error => {
        this.showInfoError(error);
      }
    )
  }

  showInfoSuccess(info:AppInfoResponse) {
    this.appInfo = info;
  }

  showInfoError(error:any) {
    let errorText = error.status + ":" + error.statusText;
    console.log("ERROR:" + errorText);
  }

  backToList() {
    this.location.back();
  }
}
