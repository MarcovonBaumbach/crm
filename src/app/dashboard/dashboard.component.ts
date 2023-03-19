import { Component } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
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

  constructor(private dataservice: DataService) {}

}
