import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RankingService, NowResponse, NowAppsResponse } from '../ranking.service'

@Component({
  selector: 'app-now-list',
  templateUrl: './now-list.component.html',
  styleUrls: ['./now-list.component.css']
})
export class NowListComponent implements OnInit {
  rankingKind = "";
  appList = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ranking: RankingService,
  ) {
    route.params.subscribe(params => {
      let kind = params['kind'];
      if (kind == "")
      {
        kind = "grossing";
      }
      let isChangeKind = false;
      if (kind != this.rankingKind) {
        isChangeKind = true;
      }

      //更新があったデータだけ再取得を行う
      this.rankingKind = kind;
      if (isChangeKind) {
        this.updateList(this.rankingKind);
      }
    });
  }

  ngOnInit() {
    console.log("NowListComponent#ngOnInit");
  }

  updateList(kind:string) {
    console.log("NowListComponent#updateList kind=" + kind);
    this.appList = [];
    this.ranking.getNow(
      this.ranking.createDefaultCountry(),
      this.ranking.createNowKindFromUrl(kind)
    ).subscribe(
      res => {
        this.showListSuccess(res);
      },
      error => {
        this.showListError(error);
      }
    )
  }

  showListSuccess(res:NowResponse) {
    console.log("updated:" + res.updated);
    for (let item of res.apps) {
      this.appList.push(item);
    }
  }

  showListError(error:any) {
    let errorText = error.status + ":" + error.statusText;
    console.log("ERROR:" + errorText);
  }

  onClickItem(id:number) {
    console.log("NowListComponent#onClickItem id=" + id);
    this.router.navigateByUrl('/app/' + id);
  }
}
