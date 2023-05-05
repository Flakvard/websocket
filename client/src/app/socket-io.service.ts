import { Injectable } from '@angular/core';
import * as Connection from '../../../common/connection.js'
import { User } from '../../../common/user';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

readonly backendUrl = 'http://localhost:3000';

  private clientSocket: Socket;
  constructor() { 
    console.log('Creating socket and connecting to server...');
    this.clientSocket = io(this.backendUrl);
  }
  listenToServer(connection: Connection): Observable<any> {
    console.log(`Listening to server for ${connection}...`);
    return new Observable((subscribe) => {
      this.clientSocket.on(connection, (data: any) => {
        console.log(`Received data from server for ${connection}: `, data);
        subscribe.next(data);
      });
    });
  }

  emitToServer(connection: Connection, data: User): void {
    console.log(`Emitting data to server for ${connection}: `, data);
    this.clientSocket.emit(connection, data);
  }
}
