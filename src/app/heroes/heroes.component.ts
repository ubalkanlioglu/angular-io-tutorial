import { Component, OnInit, } from '@angular/core';
import { Hero } from "./../Hero";
import { HeroService } from "./../service/hero/hero.service";
import { HEROES } from '../mock-heros';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  hero: Hero = {
    id: 1,
    name: "Windstorm"
  };
  heroes: Hero[];
  selectedHero: Hero;
  constructor(private heroService: HeroService) {
    // console.log(this.heroes);
  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes = () => this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);

  add = (name: string) => {
    name = name.trim();
    if (!name) return;
    this.heroService.addHero({ name } as Hero).subscribe(hero => this.heroes.push(hero));
  };

  delete = (hero: Hero) => {
    this.heroService.deleteHero(hero)
      .subscribe(() =>
        this.heroes = this.heroes.filter(h => h !== hero
        )
      );
  };

}
