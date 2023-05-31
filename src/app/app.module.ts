import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EventListingComponent } from './components/event-listing/event-listing.component';
import { EventBookingComponent } from './components/event-booking/event-booking.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

const routes: Routes = [
  { path: '', redirectTo: '/event-listing', pathMatch: 'full' },
  { path: 'event-listing', component: EventListingComponent },
  { path: 'event-booking/:id', component: EventBookingComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    EventListingComponent,
    EventBookingComponent,
    NavBarComponent,
    SearchBarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
