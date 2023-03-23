import { Component } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
  apikey = 'dfdeba4f1573768d18b6d7445a41dda5';
  responseAsJson: any;
  articles: any[];
  constructor() {
    this.getNews();
  }

  /**
   * getting news from gnews.io API
   */
  async getNews() {
    let response = await fetch(`https://gnews.io/api/v4/top-headlines?country=us&category=business&apikey=${this.apikey}`);
    this.responseAsJson = await response.json();
    this.articles = this.responseAsJson.articles;
    console.log(this.articles);
  }
}
