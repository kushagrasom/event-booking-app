import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsData } from 'src/app/models/events-data.model';
import { EventService } from 'src/app/services/events.service';

@Component({
  selector: 'app-event-listing',
  templateUrl: './event-listing.component.html',
  styleUrls: ['./event-listing.component.scss'],
})
export class EventListingComponent implements OnInit {
  eventsList: EventsData[] = [];
  filteredEventsList: EventsData[] = [];

  constructor(private router: Router, private eventService: EventService) {}

  ngOnInit() {
    this.fetchEventDetails();
  }

  fetchEventDetails() {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.eventsList = data;
        this.filteredEventsList = data;
      },
      error: (error) => {
        console.error('Error fetching event data:', error);
      },
    });
  }

  bookEvent(eventId: number) {
    this.router.navigate(['/event-booking', eventId]);
  }

  getFilterEventsList(value: string) {
    this.filteredEventsList = this.eventsList.filter((event) =>
      event.name.toLowerCase().includes(value.toLowerCase())
    );
  }
}
