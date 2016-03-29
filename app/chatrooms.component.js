System.register(['angular2/core', 'angular2/http', './chatroom.service', './user'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, chatroom_service_1, user_1;
    var ChatRooms;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (chatroom_service_1_1) {
                chatroom_service_1 = chatroom_service_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            }],
        execute: function() {
            ChatRooms = (function () {
                function ChatRooms(_chatroomService) {
                    this._chatroomService = _chatroomService;
                    this.chatrooms = [];
                }
                ChatRooms.prototype.ngOnInit = function () {
                };
                ChatRooms.prototype.setUser = function (username, port) {
                    console.log(username, port);
                    this.currentUser = new user_1.User;
                    this.currentUser.username = username;
                    this.currentUser.port = port;
                    this.currentUser.chatrooms = [];
                };
                ChatRooms.prototype.getChatrooms = function () {
                    var _this = this;
                    this._chatroomService.getChatrooms().then(function (chatrooms) {
                        _this.chatrooms = chatrooms;
                        if (chatrooms) {
                            if (!_this.selectedChatroom)
                                _this.selectChatroom(chatrooms[0]);
                        }
                    }).then(function () {
                        _this._chatroomService.getMessages(_this.currentUser).subscribe(function (messages) { console.log(messages); _this.selectedChatroom.messages = messages; }, function (error) { return _this.errorMessage = error; });
                    });
                };
                ChatRooms.prototype.addChatroom = function (title, port) {
                    console.log(title, port);
                    if (title) {
                        var chatroom = { "title": title, "port": port, "guid": title, "active": false, "messages": [] };
                        if (this._chatroomService.addChatroom(chatroom))
                            this.chatrooms.push(chatroom);
                        this.selectChatroom(chatroom);
                        this.currentUser.chatrooms.push(this.selectedChatroom);
                    }
                    delete this.newChatroom;
                };
                ChatRooms.prototype.selectChatroom = function (chatroom) {
                    console.log(this.chatrooms);
                    this.chatrooms.forEach(function (tab) {
                        tab.active = false;
                    });
                    chatroom.active = true;
                    this.selectedChatroom = chatroom;
                    console.log(this.selectedChatroom);
                };
                ChatRooms.prototype.deleteChatroom = function () {
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
                };
                ChatRooms.prototype.sendMessage = function (msg) {
                    var _this = this;
                    var message = { "from_username": this.currentUser.username, "to_username": this.selectedChatroom.title, "message": msg };
                    this._chatroomService.sendMessage(message, this.currentUser).subscribe(function (message) { return _this.selectedChatroom.messages.push(message); }, function (error) { return _this.errorMessage = error; });
                    delete this.message;
                };
                ChatRooms = __decorate([
                    core_1.Component({
                        selector: 'chatrooms',
                        templateUrl: 'templates/chatrooms.html',
                        styleUrls: ['templates/chatrooms.css'],
                        providers: [chatroom_service_1.ChatroomService, http_1.HTTP_PROVIDERS]
                    }), 
                    __metadata('design:paramtypes', [chatroom_service_1.ChatroomService])
                ], ChatRooms);
                return ChatRooms;
            })();
            exports_1("ChatRooms", ChatRooms);
        }
    }
});
//# sourceMappingURL=chatrooms.component.js.map