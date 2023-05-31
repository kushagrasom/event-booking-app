import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventListingComponent } from './components/event-listing/event-listing.component';
import { EventBookingComponent } from './components/event-booking/event-booking.component';

const routes: Routes = [
  { path: '', redirectTo: '/event-listing', pathMatch: 'full' },
  { path: 'event-listing', component: EventListingComponent },
  { path: 'event-booking/:id', component: EventBookingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
