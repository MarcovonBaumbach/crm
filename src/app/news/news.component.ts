import { Component } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
  API_KEY = 'f0eda1f0643b4230802a510ce74de5bf';
  responseAsJson: any;
  articles: any[];
  constructor() {
    this.getNews();
  }

  async getNews() {
    let response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${this.API_KEY}`);
    this.responseAsJson = await response.json();
    this.articles = this.responseAsJson.articles;
  }
}
