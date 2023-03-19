import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { DataService } from '../data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  dataArray = this.dataservice.amount;
  labelArray = this.dataservice.months;
  nameDealsStarted = this.dataservice.nameDealsStarted;
  amountDealsStarted = this.dataservice.amountDealsStarted;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.labelArray,
    datasets: [
      {
        data: this.dataArray,
        label: 'Revenue 2023',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          callback: function (value, index, ticks) {
            return value + '€';
          }
        }
      }
    }
  };
  public lineChartLegend = true;


  public barChartLegendDealsStarted = false;
  public barChartDataDealsStarted: ChartConfiguration<'bar'>['data'] = {
    labels: this.nameDealsStarted,
    datasets: [
      { 
        data: this.amountDealsStarted,
        label: 'this year',
        backgroundColor: 'rgba(0,0,255,0.8)'
      }
    ]
  };
  public barChartOptionsDealsStarted: ChartConfiguration<'bar'>['options'] = {
    indexAxis: 'y',
    responsive: true
  };


  constructor(private dataservice: DataService) {}

}
