import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes', //the component's CSS element selector that 
  // matches the name of the HTML element that identifies this component within a parent component's 
  // template.
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  
  // selectedHero: Hero;
  heroes : Hero[];

  constructor(private heroService: HeroService) { }
  
  ngOnInit() {
    // ngOnInit should be used for calling the functions and not the constructor( we should
    // Reserve the constructor for simple initialization
    // rather than making the http call or any other function.)
    this.getHeroes();
    
  }

  // onSelect(hero: Hero): void{
  //   this.selectedHero = hero;
  // }
  
  // When concept of observables is not used (Synchronous)!!
  // getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes();
  // }
  
  // using observables (Asynchronous, hence works while retrieving data from server using http calls) !!
  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if(!name){
      return ;
    }
    this.heroService.addHero({name} as Hero).subscribe(hero=>{this.heroes.push(hero)});
  }
}
