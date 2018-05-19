import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  // selectedHero: Hero;
  
  // onSelect(hero: Hero): void{
  //   this.selectedHero = hero;
  // }
 
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5)); 
      //This ^ is something different from heroes component
  }

  constructor(private heroService: HeroService) { }
 
  ngOnInit() {
    this.getHeroes();
  }

}