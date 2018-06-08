import { Component, OnInit } from '@angular/core';
import { RoutesService } from '../routes.service';
import { ProfileService } from '../profile/profile.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {

  constructor(
    private routes: RoutesService,
    private profile: ProfileService
  ) { }

  ngOnInit() {
  }

  joinSide(light: Light) {
    console.log('join', light);
    this.profile.setLight(light);
    this.routes.setRoute('create');
  }
}
