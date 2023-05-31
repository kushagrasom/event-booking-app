import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConsoleService {
  logDataToPage(data: any) {
    const message = 'Tickets booked';
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    document.getElementById('console-logger')?.appendChild(messageElement);
  }

  logDataToConsole(data: any) {
    console.log('Booking Data:', data);
  }
}
