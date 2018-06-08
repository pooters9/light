import { Component, HostListener } from '@angular/core';
import { ProfileService } from './profile/profile.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { RoutesService } from './routes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Poot';
  private light: Light;
  private altLight: Light;
  private route;

  public showMap: boolean;
  public showMarket: boolean;
  
  constructor(
    private profile: ProfileService,
    private routeService: RoutesService
  ) {}
  
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(event.code === 'Escape') {
      this.showMap = false;
      this.showMarket = false;
    }
  }

  ngOnInit() {
    this.profile.getLight().subscribe((light) => {
      console.log('sub light', light);
      this.light = light;
    });

    this.routeService.getRoute().subscribe((route) => {
      console.log('sub route', route);
      this.route = route;
    });

    this.profile.getAltLight().subscribe((altLight) => {
      console.log('sub alt light', altLight);
      this.altLight = altLight;
    });

    this.profile.getStats().subscribe(currentStats => {
      if (currentStats[0] && currentStats[0].value === 0) {
        console.log('SUB STATS', currentStats[0].value);
        alert('You have been converted to the ' + this.altLight);
        this.profile.setLight(this.altLight);
        this.routeService.setRoute('create');
      }
    });
  }

  home() {
    this.routeService.clearRoute();
  }

  toggleMap() {
    this.showMarket = false;
    this.showMap = !this.showMap;
  }

  toggleMarket() {
    this.showMap = false;
    this.showMarket = !this.showMarket;
  }
}
