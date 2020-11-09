import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
    // rxjs test

    const subject = new Subject<number>();
    subject.subscribe({
      next: (v) => console.log(`observerA: ${v}`),
    });

    subject.subscribe({
      next: (v) => console.log(`observerB: ${v}`),
    });
    subject.next(1);
    subject.next(2);

    const observable = new Observable((subscriber) => {
      subscriber.next('a');
      subscriber.next('b');
      subscriber.next('c');
      setTimeout(() => {
        subscriber.next('d');
        subscriber.complete();
      }, 3000);
    });
    console.log('just before subscribe');
    observable.subscribe({
      next(x) {
        console.log('got value ' + x);
      },
      error(err) {
        console.error('something wrong occurred: ' + err);
      },
      complete() {
        console.log('done');
      },
    });
    console.log('just after subscribe');
  }

  getHeroes() {
    this.heroService
      .getHeroes()
      .subscribe((heroes) => (this.heroes = heroes.slice(1, 5)));
  }
}
