import {Message} from './message';
import {User} from './user';

export class Chatroom
{
	constructor(
    public title:string,
    public guid: string,
    public active:boolean,
    public users:string[],
    public messages:Message[]) { }
}