import { Injectable } from '@angular/core';
// import { environment } from '@environment';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private connection?: signalR.HubConnection;

  constructor() { }

}
