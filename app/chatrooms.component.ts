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
	chatrooms: Chatroom[];
	selectedChatroom: Chatroom;
	currentUser: User;
	message: string;
	errorMessage;

	constructor(private _chatroomService: ChatroomService) 
	{ 
		this.currentUser = new User;
		this.currentUser.name = "Dave";
		this.currentUser.chatrooms = [];
	}

	ngOnInit() 
	{
		this.getChatrooms();
	}

	getChatrooms() 
	{
		this._chatroomService.getChatrooms().then(chatrooms => {
			this.chatrooms = chatrooms;
			if (chatrooms)
			{
				this.selectChatroom(chatrooms[0]);
			}
		});

		this._chatroomService.getMessages().subscribe(messages => this.selectedChatroom.messages = messages,
													  error => this.errorMessage = <any>error);
	}

	addChatroom(title) 
	{
		if(title)
		{
			var chatroom: Chatroom = { "title": title, "guid": title, "active": false, "users": [this.currentUser.name], "messages": [] };
			if(this._chatroomService.addChatroom(chatroom))
				this.selectChatroom(chatroom);
			this.currentUser.chatrooms.push(this.selectedChatroom);
		}
		delete this.newChatroom;
	}

	selectChatroom(chatroom: Chatroom) {
	    this.chatrooms.forEach((tab) => {
	      tab.active = false;
	    });
	    chatroom.active = true
		this.selectedChatroom = chatroom;
	}

	deleteChatroom()
	{
		this._chatroomService.deleteChatroom(this.selectedChatroom);
		if (this.chatrooms.length > 0)
		{
			this.selectChatroom(this.chatrooms[0]);
		}
		else
		{
			delete this.selectedChatroom;
		}
	}

	sendMessage(msg: string)
	{
		var message: Message = { "from_username": this.currentUser.name, "date_recieved": Date(), "message": msg };
		this._chatroomService.sendMessage(message, this.selectedChatroom).subscribe(message  => this.selectedChatroom.messages.push(message),
	                    															error =>  this.errorMessage = <any>error);
		delete this.message;
	}
}