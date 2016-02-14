import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import {Chatroom} from './chatroom';
import {ChatroomsDatabase} from './chatrooms-database';
import {Message} from './message';

@Injectable()
export class ChatroomService
{

	constructor (private http: Http) {}

	getChatrooms()
	{
		return Promise.resolve(ChatroomsDatabase);
	}

	addChatroom(chatroom: Chatroom)
	{
		for (var i = 0; i < ChatroomsDatabase.length; i++)
		{
			if (ChatroomsDatabase[i].title === chatroom.title)
			{
				return false;
			}
		}

		ChatroomsDatabase.push(chatroom);
		return true;
	}

	deleteChatroom(chatroom: Chatroom)
	{
		for (var i = 0; i < ChatroomsDatabase.length; i++)
		{
			if (ChatroomsDatabase[i].title === chatroom.title)
			{
				ChatroomsDatabase.splice(i, 1);
			}
		}
	}

	sendMessage(message: Message, chatroom: Chatroom)
	{
		let body = JSON.stringify({ message });
		let headers = new Headers({ 'Content-Type': 'application/json'});
		let options = new RequestOptions({ headers: headers });
		return this.http.post("http://localhost:9000/sendMessage", body, options)
		                .map(res =>  <Message> res.json().result)
						.do(data => console.log(data)) // eyeball results in the console
						.catch(this.handleError)
	}

	getMessages(chatroom: Chatroom)
	{
		return this.http.get("http://localhost:9000/messages")
	                .map(res => <Message[]> res.json().result)
					.do(data => console.log(data)) // eyeball results in the console
					.catch(this.handleError);
	}

	private handleError (error: Response) {
	    // in a real world app, we may send the server to some remote logging infrastructure
	    // instead of just logging it to the console
	    console.error(error);
	    return Observable.throw(error.json().error || 'Server error');
  	}
}