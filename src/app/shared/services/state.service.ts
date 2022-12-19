import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, map, tap, noop } from 'rxjs';
import { GitHubUser, GitHubUserSearchResponse, State } from '../models/shared.model';

const statesWithFlags = [
  {
    name: 'Alabama',
    flag_img: '5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png',
  },
  {
    name: 'Alaska',
    flag_img: 'e/e6/Flag_of_Alaska.svg/43px-Flag_of_Alaska.svg.png',
  },
  {
    name: 'Arizona',
    flag_img: '9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png',
  },
  {
    name: 'Arkansas',
    flag_img: '9/9d/Flag_of_Arkansas.svg/45px-Flag_of_Arkansas.svg.png',
  },
  {
    name: 'California',
    flag_img: '0/01/Flag_of_California.svg/45px-Flag_of_California.svg.png',
  },
  {
    name: 'Colorado',
    flag_img: '4/46/Flag_of_Colorado.svg/45px-Flag_of_Colorado.svg.png',
  },
  {
    name: 'Connecticut',
    flag_img: '9/96/Flag_of_Connecticut.svg/39px-Flag_of_Connecticut.svg.png',
  },
  {
    name: 'Delaware',
    flag_img: 'c/c6/Flag_of_Delaware.svg/45px-Flag_of_Delaware.svg.png',
  },
  {
    name: 'Florida',
    flag_img: 'f/f7/Flag_of_Florida.svg/45px-Flag_of_Florida.svg.png',
  },
  {
    name: 'Georgia',
    flag_img:
      '5/54/Flag_of_Georgia_%28U.S._state%29.svg/46px-Flag_of_Georgia_%28U.S._state%29.svg.png',
  },
  {
    name: 'Hawaii',
    flag_img: 'e/ef/Flag_of_Hawaii.svg/46px-Flag_of_Hawaii.svg.png',
  },
  { name: 'Idaho', flag_img: 'a/a4/Flag_of_Idaho.svg/38px-Flag_of_Idaho.svg.png' },
  {
    name: 'Illinois',
    flag_img: '0/01/Flag_of_Illinois.svg/46px-Flag_of_Illinois.svg.png',
  },
  {
    name: 'Indiana',
    flag_img: 'a/ac/Flag_of_Indiana.svg/45px-Flag_of_Indiana.svg.png',
  },
  { name: 'Iowa', flag_img: 'a/aa/Flag_of_Iowa.svg/44px-Flag_of_Iowa.svg.png' },
  {
    name: 'Kansas',
    flag_img: 'd/da/Flag_of_Kansas.svg/46px-Flag_of_Kansas.svg.png',
  },
  {
    name: 'Kentucky',
    flag_img: '8/8d/Flag_of_Kentucky.svg/46px-Flag_of_Kentucky.svg.png',
  },
  {
    name: 'Louisiana',
    flag_img: 'e/e0/Flag_of_Louisiana.svg/46px-Flag_of_Louisiana.svg.png',
  },
  { name: 'Maine', flag_img: '3/35/Flag_of_Maine.svg/45px-Flag_of_Maine.svg.png' },
  {
    name: 'Maryland',
    flag_img: 'a/a0/Flag_of_Maryland.svg/45px-Flag_of_Maryland.svg.png',
  },
  {
    name: 'Massachusetts',
    flag_img: 'f/f2/Flag_of_Massachusetts.svg/46px-Flag_of_Massachusetts.svg.png',
  },
  {
    name: 'Michigan',
    flag_img: 'b/b5/Flag_of_Michigan.svg/45px-Flag_of_Michigan.svg.png',
  },
  {
    name: 'Minnesota',
    flag_img: 'b/b9/Flag_of_Minnesota.svg/46px-Flag_of_Minnesota.svg.png',
  },
  {
    name: 'Mississippi',
    flag_img: '4/42/Flag_of_Mississippi.svg/45px-Flag_of_Mississippi.svg.png',
  },
  {
    name: 'Missouri',
    flag_img: '5/5a/Flag_of_Missouri.svg/46px-Flag_of_Missouri.svg.png',
  },
  {
    name: 'Montana',
    flag_img: 'c/cb/Flag_of_Montana.svg/45px-Flag_of_Montana.svg.png',
  },
  {
    name: 'Nebraska',
    flag_img: '4/4d/Flag_of_Nebraska.svg/46px-Flag_of_Nebraska.svg.png',
  },
  {
    name: 'Nevada',
    flag_img: 'f/f1/Flag_of_Nevada.svg/45px-Flag_of_Nevada.svg.png',
  },
  {
    name: 'New Hampshire',
    flag_img: '2/28/Flag_of_New_Hampshire.svg/45px-Flag_of_New_Hampshire.svg.png',
  },
  {
    name: 'New Jersey',
    flag_img: '9/92/Flag_of_New_Jersey.svg/45px-Flag_of_New_Jersey.svg.png',
  },
  {
    name: 'New Mexico',
    flag_img: 'c/c3/Flag_of_New_Mexico.svg/45px-Flag_of_New_Mexico.svg.png',
  },
  {
    name: 'New York',
    flag_img: '1/1a/Flag_of_New_York.svg/46px-Flag_of_New_York.svg.png',
  },
  {
    name: 'North Carolina',
    flag_img: 'b/bb/Flag_of_North_Carolina.svg/45px-Flag_of_North_Carolina.svg.png',
  },
  {
    name: 'North Dakota',
    flag_img: 'e/ee/Flag_of_North_Dakota.svg/38px-Flag_of_North_Dakota.svg.png',
  },
  { name: 'Ohio', flag_img: '4/4c/Flag_of_Ohio.svg/46px-Flag_of_Ohio.svg.png' },
  {
    name: 'Oklahoma',
    flag_img: '6/6e/Flag_of_Oklahoma.svg/45px-Flag_of_Oklahoma.svg.png',
  },
  {
    name: 'Oregon',
    flag_img: 'b/b9/Flag_of_Oregon.svg/46px-Flag_of_Oregon.svg.png',
  },
  {
    name: 'Pennsylvania',
    flag_img: 'f/f7/Flag_of_Pennsylvania.svg/45px-Flag_of_Pennsylvania.svg.png',
  },
  {
    name: 'Rhode Island',
    flag_img: 'f/f3/Flag_of_Rhode_Island.svg/32px-Flag_of_Rhode_Island.svg.png',
  },
  {
    name: 'South Carolina',
    flag_img: '6/69/Flag_of_South_Carolina.svg/45px-Flag_of_South_Carolina.svg.png',
  },
  {
    name: 'South Dakota',
    flag_img: '1/1a/Flag_of_South_Dakota.svg/46px-Flag_of_South_Dakota.svg.png',
  },
  {
    name: 'Tennessee',
    flag_img: '9/9e/Flag_of_Tennessee.svg/46px-Flag_of_Tennessee.svg.png',
  },
  { name: 'Texas', flag_img: 'f/f7/Flag_of_Texas.svg/45px-Flag_of_Texas.svg.png' },
  { name: 'Utah', flag_img: 'f/f6/Flag_of_Utah.svg/45px-Flag_of_Utah.svg.png' },
  {
    name: 'Vermont',
    flag_img: '4/49/Flag_of_Vermont.svg/46px-Flag_of_Vermont.svg.png',
  },
  {
    name: 'Virginia',
    flag_img: '4/47/Flag_of_Virginia.svg/44px-Flag_of_Virginia.svg.png',
  },
  {
    name: 'Washington',
    flag_img: '5/54/Flag_of_Washington.svg/46px-Flag_of_Washington.svg.png',
  },
  {
    name: 'West Virginia',
    flag_img: '2/22/Flag_of_West_Virginia.svg/46px-Flag_of_West_Virginia.svg.png',
  },
  {
    name: 'Wisconsin',
    flag_img: '2/22/Flag_of_Wisconsin.svg/45px-Flag_of_Wisconsin.svg.png',
  },
  {
    name: 'Wyoming',
    flag_img: 'b/bc/Flag_of_Wyoming.svg/43px-Flag_of_Wyoming.svg.png',
  },
];

@Injectable()
export class StateService {
  errorMessage?: string;
  constructor(private http: HttpClient) {}

  getStates(): Observable<State[]> {
    console.log('getStates ....');
    return of(statesWithFlags);
  }

  searchStates(term: string): Observable<State[]> {
    console.log('searchStates ....', term);
    if (term === '') {
      return of([]);
    }
    return this.getStates().pipe(
      map((items: State[]) => {
        return (
          items.filter((item: State) => {
            // console.log('searchState ...', term, item.name.toLowerCase().indexOf(term.toLowerCase()));
            return item.name.toLowerCase().indexOf(term.toLowerCase()) >= 0;
          }) || []
        );
      }),
      tap((items) => console.log('search result.size: ', (items && items.length) || '0'))
      // tap((items) => console.log('search result.size: ', items))
    );
  }
}
