import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  dealId: string;
  deal: any;
  months: any[] = [];
  amount: any[] = [];
  nameDealsStarted: any[] = [];
  amountDealsStarted: any[] = [];
  constructor() { }
}
