import { Component, OnInit } from '@angular/core';
import { Hero } from "./../Hero";
import { HeroService } from "./../service/hero/hero.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private heroService: HeroService) { }
  heroes: Hero[];
  ngOnInit() {
    this.getHeroes();
  }

  getHeroes = () => this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes.slice(1, 5));
}
