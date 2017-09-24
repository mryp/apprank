import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

namespace Const{
  export const API_NOW = "v1/now";
  export const API_APP_INFO = "v1/appinfo";
  export const API_APP_RANK = "v1/apprank";

  export const KIND_GROSSING = 1;
  export const KIND_PAID = 3
  export const KIND_FREE = 5
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

export interface AppRankResponse {
  apps: AppRankAppsResponse[];
}

export interface AppRankAppsResponse {
  rank: number;
  updated: string;
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
        kind = Const.KIND_GROSSING;
        break;
      case "paid":
        kind = Const.KIND_PAID;
        break;
      case "free":
        kind = Const.KIND_FREE
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

  public getAppRank(id:number, country:string, kind:number, startDate:Date, endDate:Date): Observable<AppRankResponse> {
    let params = new HttpParams()
      .set('id', id.toString())
      .set('country', country)
      .set('kind', kind.toString())
      .set('start', this.toDateString(startDate, "YYYY-MM-DD"))
      .set('end', this.toDateString(endDate, "YYYY-MM-DD"));
    let url = this.getApiUrl(Const.API_APP_RANK);
    return this.http.get<AppRankResponse>(url,
      { params: params, }
    );
  }

  private toDateString(date:Date, format:string): string {
    if (!format) format = 'YYYY-MM-DD';
    format = format.replace(/YYYY/g, date.getFullYear().toString());
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
    return format;
  }
}

