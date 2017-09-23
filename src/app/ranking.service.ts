import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

namespace Const{
  export const API_NOW = "v1/now";
  export const API_APP_INFO = "v1/appinfo";
  export const API_APP_RANK = "v1/apprank";
}

export interface NowResponse {
  updated: string;
  apps: NowAppsResponse[];
}

export interface NowAppsResponse {
  id: number;
  name: string;
  artwork_url: string;
  artist_name: string;
}

export interface AppInfoResponse {
  name: string;
  info_url: string;
  artwork_url: string;
  artist_name: string;
  artist_url: string;
  copyright: string;
}

@Injectable()
export class RankingService {

  constructor(
    private http: HttpClient
  ) { }

  public getApiUrl(apiName:string):string {
    return "http://localhost:8080/" + apiName;
  }

  public createDefaultCountry(): string {
    return "jp";
  }

  public createNowKindFromUrl(kindText:string): number {
    let kind = 1;
    switch (kindText) {
      case "grossing":
        kind = 1;
        break;
      case "paid":
        kind = 3;
        break;
      case "free":
        kind = 5;
        break;
    }
    return kind;
  }

  public getNow(country:string, kind:number): Observable<NowResponse> {
    let params = new HttpParams()
      .set('country', country)
      .set('kind', kind.toString());
    let url = this.getApiUrl(Const.API_NOW);
    return this.http.get<NowResponse>(url,
      { params: params, }
    );
  }

  public getAppInfo(id:number): Observable<AppInfoResponse> {
    let params = new HttpParams()
      .set('id', id.toString());
    let url = this.getApiUrl(Const.API_APP_INFO);
    return this.http.get<AppInfoResponse>(url,
      { params: params, }
    );
  }
}
