import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Chatroom} from './chatroom';
import {ChatroomService} from './chatroom.service';
import {User} from './user';
import {Message} from './message'

@Component ({
	selector: 'chatrooms',
	templateUrl: 'templates/chatrooms.html',
	styleUrls: ['templates/chatrooms.css'],
	providers: [ChatroomService, HTTP_PROVIDERS]
})

export class ChatRooms implements OnInit {
	newChatroom: string;
	chatrooms: Chatroom[] = [];
	selectedChatroom: Chatroom;
	currentUser: User;
	message: string;
	errorMessage;

	constructor(private _chatroomService: ChatroomService) 
	{ 
	}

	ngOnInit(){

	}

	setUser(username, port){
		console.log(username, port)
		this.currentUser = new User;
		this.currentUser.username = username;
		this.currentUser.port = port;
		this.currentUser.chatrooms = [];
	}

	getChatrooms() 
	{
		this._chatroomService.getChatrooms().then(chatrooms => {
			this.chatrooms = chatrooms;
			if (chatrooms)
			{
				if (!this.selectedChatroom)	this.selectChatroom(chatrooms[0]);
			}
		}).then(() => {
			this._chatroomService.getMessages(this.currentUser).subscribe(messages => {console.log(messages); this.selectedChatroom.messages = messages;},
													  error => this.errorMessage = <any>error);
		});
	}

	addChatroom(title, port) 
	{
		console.log(title, port)

		if(title)
		{
			var chatroom: Chatroom = { "title": title, "port": port, "guid": title, "active": false, "messages": [] };
			if(this._chatroomService.addChatroom(chatroom))
				this.chatrooms.push(chatroom)
				this.selectChatroom(chatroom);
			this.currentUser.chatrooms.push(this.selectedChatroom);
		}
		delete this.newChatroom;
	}

	selectChatroom(chatroom: Chatroom) {
		console.log(this.chatrooms)
	    this.chatrooms.forEach((tab) => {
	      tab.active = false;
	    });
	    chatroom.active = true
		this.selectedChatroom = chatroom;
		console.log(this.selectedChatroom)
	}

	deleteChatroom()
	{

		this.getChatrooms();

		// this._chatroomService.deleteChatroom(this.selectedChatroom);
		// if (this.chatrooms.length > 0)
		// {
		// 	this.selectChatroom(this.chatrooms[0]);
		// }
		// else
		// {
		// 	delete this.selectedChatroom;
		// }
	}

	sendMessage(msg: string)
	{
		var message: Message = { "from_username": this.currentUser.username, "to_username": this.selectedChatroom.title, "message": msg };
		this._chatroomService.sendMessage(message, this.currentUser).subscribe(message  => this.selectedChatroom.messages.push(message),
	                    															error =>  this.errorMessage = <any>error);
		delete this.message;
	}
}