import { Component } from '@angular/core';


@Component({
  selector: 'app-page',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
  token: string;
  currentUser: string;
  constructor () {}
ngOnInit () :void{
  this.token = localStorage.getItem('tokenscloud');
}
}
