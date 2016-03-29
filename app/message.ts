import {User} from './user'

export class Message
{
	from_username: string;
	to_username: string;
	message: string;
}

//(message.from_username === selectedChatroom.title && message.to_username === currentUser.username) || (message.from_username === currentUser.username && message.to_username === selectedChatroom.title)