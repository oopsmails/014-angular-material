import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Card } from '../shared/models';
import { HomeDataService } from './home.data.service';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<boolean> = new Subject();
  cards$!: Observable<Card[]>;

  constructor(private router: Router, private homeDataService: HomeDataService) {}

  ngOnInit() {}

  navToPage(page: string) {
    console.log('HomeComponent, navToPage, page = ' + page);
    this.router.navigateByUrl(page);
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
