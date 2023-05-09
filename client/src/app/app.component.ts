import { Component } from '@angular/core';
import { SocketIoService } from './socket-io.service';
import * as Connection from '../../../common/connection';
import { User } from '../../../common/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  user: User[] = [];
  label: string = '';

  constructor(private socketService: SocketIoService) {

    this.socketService.listenToServer(Connection.change).subscribe((change) => {
      this.onChange(change);
    });

    this.socketService.listenToServer(Connection.create).subscribe((user) => {
      this.onCreate(user);
    });
  }
  onChange(change: User) {
    const index = this.user.findIndex((user) => user.id === change.id);
    this.user[index].label = change.label;
  }

  onCreate(user: User) {
    this.user.push(user);
  }

  createUser(label: string): void {
    const user = {id: Date.now().toString(), label};
    console.log("New user created:", user);
    this.user.push(user); // add the new user to the user array
    this.socketService.emitToServer(Connection.create, user);
    this.label = '';
    console.log('User created:', this.user);
  }
  

  updateUser(label: string, id: string): void {
    this.socketService.emitToServer(Connection.change, {id, label});
  }
}
