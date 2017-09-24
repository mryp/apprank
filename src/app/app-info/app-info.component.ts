import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { DateAdapter, NativeDateAdapter, MdDatepicker } from '@angular/material';
import 'rxjs/add/observable/of';

import { RankingService, NowResponse, NowAppsResponse, AppInfoResponse, AppRankResponse, AppRankAppsResponse } from '../ranking.service'

namespace Const{
  export const KIND_GROSSING = 1;
  export const KIND_PAID = 3
  export const KIND_FREE = 5
}

class RankingValue {
  now: number;
  highest: number;
  average: number;
}

@Component({
  selector: 'app-app-info',
  templateUrl: './app-info.component.html',
  styleUrls: ['./app-info.component.css']
})
export class AppInfoComponent implements OnInit {
  //定数
  KindTable:{ [key: number]: string; } = { 1: "セールス", 3: "有料", 5: "無料" };

  appID = 0;
  appInfo:AppInfoResponse = null;
  appRankList: { [key: number]: AppRankResponse; } = {};
  startDate: Date;
  endDate: Date;
  rankingTable: { [key: number]: RankingValue; } = {};

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
    this.loadRangeSetting();
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
        this.updateRank(this.appID);
      }
    });
  }

  ngOnInit() {
    console.log("AppInfoComponent#ngOnInit");
  }

  loadRangeSetting() {
    let now:Date = new Date();
    this.startDate = new Date(now.setMonth(now.getMonth() -1));
    this.endDate = new Date();
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
    );
  }

  updateRank(appID: number) {
    console.log("AppInfoComponent#updateRank appid=" + appID);
    this.appRankList = {};
    this.rankingTable = {};
    for (let kind in this.KindTable) {
      this.ranking.getAppRank(appID, this.ranking.createDefaultCountry()
        , +kind
        , this.startDate, this.endDate).subscribe(
        res => {
          this.showRankSuccess(res, +kind);
        },
        error => {
          this.showRankError(error);
        }
      );
    }
  }

  showInfoSuccess(info:AppInfoResponse) {
    this.appInfo = info;
  }

  showInfoError(error:any) {
    let errorText = error.status + ":" + error.statusText;
    console.log("ERROR:" + errorText);
  }

  showRankSuccess(rank:AppRankResponse, kind:number) {
    console.log("showRankSuccess:" + rank.apps.length);
    this.appRankList[kind] = rank;
    let rankValue = new RankingValue();
    rankValue.now = this.getLatestRank(rank.apps);
    rankValue.highest = this.getHighestRank(rank.apps);
    rankValue.average = this.getAverageRank(rank.apps);

    this.rankingTable[kind] = rankValue;
  }

  getLatestRank(ranks: AppRankAppsResponse[]): number {
    if (ranks.length == 0) {
      return 999;
    }
    return ranks[ranks.length - 1].rank;
  }

  getHighestRank(ranks: AppRankAppsResponse[]): number {
    let value = 999;
    for (let i=0; i<ranks.length; i++) {
      if (value > ranks[i].rank) {
        value = ranks[i].rank;
      }
    }

    return value;
  }

  getAverageRank(ranks: AppRankAppsResponse[]): number {
    let average = 0;
    for (let i=0; i<ranks.length; i++) {
      average += ranks[i].rank;
    }

    return Math.floor(average / ranks.length);
  }

  showRankError(error:any) {
    let errorText = error.status + ":" + error.statusText;
    console.log("ERROR:" + errorText);
  }

  backToList() {
    this.location.back();
  }

  changeRange() {

  }
}
