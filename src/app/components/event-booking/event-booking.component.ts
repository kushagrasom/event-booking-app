import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { BookingData } from 'src/app/models/booking-data.model';
import { EventService } from 'src/app/services/events.service';
import { EventsData } from 'src/app/models/events-data.model';
import { ConsoleService } from 'src/app/services/console.service';

@Component({
  selector: 'app-event-booking',
  templateUrl: './event-booking.component.html',
  styleUrls: ['./event-booking.component.scss'],
})
export class EventBookingComponent implements OnInit {
  bookingForm!: FormGroup;
  currentEvent!: EventsData;
  eventId!: number;
  eventSeats!: number;
  seatOptions!: number[];
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private consoleService: ConsoleService
  ) {}

  ngOnInit() {
    this.bookingForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      seats: ['', Validators.required],
      attendees: this.formBuilder.array([]),
    });

    this.eventId = +this.route.snapshot.params['id'];
    this.fetchEventDetails();
  }

  fetchEventDetails() {
    this.eventService.getEventById(this.eventId).subscribe({
      next: (event: any) => {
        this.currentEvent = event;
        this.eventSeats = event.seatsAvailable;
        this.seatOptions = Array.from(
          { length: this.eventSeats },
          (_, index) => index + 1
        );
        this.addAttendeeField();
      },
      error: (error: any) => {
        console.log('Error occurred while fetching event details:', error);
      },
    });
  }

  get fetchControls() {
    return this.bookingForm.controls;
  }

  getControls() {
    return (this.bookingForm.get('attendees') as FormArray).controls;
  }

  addAttendeeField() {
    const attendees = this.bookingForm.get('attendees') as FormArray;
    const namePattern = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
    attendees.push(
      this.formBuilder.group({
        attendeeName: [
          '',
          Validators.required,
          Validators.pattern(namePattern),
        ],
      })
    );
  }

  removeAttendeeField(index: number) {
    const attendees = this.bookingForm.get('attendees') as FormArray;
    attendees.removeAt(index);
  }

  onSubmit() {
    console.log(this.bookingForm.value.attendees.length);
    console.log(typeof this.bookingForm.value.seats);
    if (this.bookingForm.invalid) {
      alert('BOOKING FAILED!');
      return;
    }

    const selectedSeats = this.bookingForm.value.attendees.length;
    console.log(selectedSeats);
    if (selectedSeats !== +this.bookingForm.value.seats) {
      alert('Please add an attendee for each selected seat.');
      return;
    }

    this.submitted = true;

    const bookingData: BookingData = {
      name: this.bookingForm.value.name,
      email: this.bookingForm.value.email,
      mobile: this.bookingForm.value.mobile,
      attendees: this.bookingForm.value.attendees,
    };

    this.consoleService.logDataToConsole(bookingData);
  }

  onCancel() {
    this.router.navigate(['/event-listing']);
  }
}
