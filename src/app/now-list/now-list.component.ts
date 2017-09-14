import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-now-list',
  templateUrl: './now-list.component.html',
  styleUrls: ['./now-list.component.css']
})
export class NowListComponent implements OnInit {
  rankingKind = "";
  folders = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute
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
        this.getListItem(this.rankingKind);
      }
    });
  }

  ngOnInit() {
    console.log("NowListComponent#ngOnInit");
  }

  getListItem(kind:string) {
    console.log("NowListComponent#getListItem kind=" + kind);
  }
}
