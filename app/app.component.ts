import {Component} from 'angular2/core';
import {ChatRooms} from './chatrooms.component';
import 'rxjs/Rx';

@Component({
	selector: 'my-app',
	templateUrl: 'templates/my-app.html',
	directives: [ChatRooms]
})

export class AppComponent
{
}
