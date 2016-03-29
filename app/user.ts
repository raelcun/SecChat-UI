import {Chatroom} from './chatroom';
import {Message} from './message';

export class User
{
	username: string;
	port: string;
	chatrooms: Chatroom[];
}