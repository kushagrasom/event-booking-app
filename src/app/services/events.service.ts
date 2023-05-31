import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { EventsData } from '../models/events-data.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private eventsUrl = 'assets/events.json';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<EventsData[]> {
    return this.http.get<EventsData[]>(this.eventsUrl);
  }

  getEventById(id: number): Observable<EventsData> {
    return this.http.get<EventsData[]>(this.eventsUrl).pipe(
      map((events: EventsData[]) => events.find((event) => event.id === id)),
      map((event) => {
        if (!event) {
          throw new Error(`Event with ID ${id} not found.`);
        }
        return event;
      })
    );
  }
}
