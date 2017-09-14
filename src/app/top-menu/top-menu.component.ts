import { Component, ViewChild, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MdSidenav } from '@angular/material';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
  title = 'ランキングリスト';
  widthTablet = 768;

  @ViewChild('sidenav') sidenav: MdSidenav;
  sidenaviMode = 'over';
  sidenaviOpened = false;
  sidenaviIconVisible = true;

  nowListLinkList = [
    {
      title: 'セールス',
      link: "grossing",
      icon: "format_list_numbered",
    },
    {
      title: '有料',
      link: "paid",
      icon: "format_list_numbered",
    },
    {
      title: '無料',
      link: "free",
      icon: "format_list_numbered",
    },
  ];
  otherLinkList = [
    {
      title: '設定',
      link: "/setting",
      icon: "settings",
    },
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    console.log("TopMenuComponent#ngOnInit");
    this.setSidenavi(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setSidenavi(event.target.innerWidth);
  }

  setSidenavi(windowSize:number) {
    if (windowSize < this.widthTablet) {
      this.sidenaviMode = 'over';
      this.sidenaviOpened = false;
      this.sidenaviIconVisible = true;
    } else {
      this.sidenaviMode = 'side';
      this.sidenaviOpened = true;
      this.sidenaviIconVisible = false;
    }
  }

  sideNaviToggle() {
    this.sidenav.toggle();
  }

  jumpPage(title:string, link:string) {
    if (this.sidenaviIconVisible) {
      this.sidenav.close();
    }
    this.title = title;
    this.router.navigate([link]);
  }
}
