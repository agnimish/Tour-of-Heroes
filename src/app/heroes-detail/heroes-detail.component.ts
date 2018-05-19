import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';

 
@Component({
  selector: 'app-heroes-detail',
  templateUrl: './heroes-detail.component.html',
  styleUrls: ['./heroes-detail.component.css']
})
export class HeroesDetailComponent implements OnInit {
  
  @Input() hero: Hero;
  
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location : Location,
  ) { }

  ngOnInit(): void{
    this.getHero();
  }
  
  //Extracting hero id and getting hero from heroService using it.
  getHero(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  goBack(): void{
    this.location.back();
  }

  save(): void{
    this.heroService.updateHero(this.hero).subscribe(()=> this.goBack());
  }
}
