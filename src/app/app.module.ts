import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { IntroComponent } from './intro/intro.component';
import { ProfileService } from './profile/profile.service';
import { RoutesService } from './routes.service';
import { CreateComponent } from './create/create.component';
import { ZoneComponent } from './zone/zone.component';
import { ProfileComponent } from './profile/profile.component';
import { MapComponent } from './map/map.component';
import { MapService } from './map/map.service';
import { MarketComponent } from './market/market.component';
import { MarketService } from './market/market.service';
import { StopPropDirective } from './directives/stop-prop.directive';
import { MiniMapComponent } from './map/mini-map/mini-map.component';


@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    CreateComponent,
    ZoneComponent,
    ProfileComponent,
    MapComponent,
    MarketComponent,
    StopPropDirective,
    MiniMapComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    ProfileService,
    RoutesService,
    MarketService,
    MapService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
