import {Chatroom} from './chatroom';
import {Message} from './message';
import {User} from './user';

export var ChatroomsDatabase: Chatroom[] = [{ "title": "Tab1", "guid": "tab1", "active": true, "users": ["Dave", "Sam"], 
											  "messages": [ { "from_username": "Dave", "date_recieved": {}, "message": "Hello User1" },
															{ "from_username": "Sam", "date_recieved": {}, "message": "Hello User2" },
															{ "from_username": "Dave", "date_recieved": {}, "message": "Hello User1" },
															{ "from_username": "Sam", "date_recieved": {}, "message": "Hello User2" }]}];

