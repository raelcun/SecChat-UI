System.register(['angular2/core', 'angular2/http', 'rxjs/Observable', './chatrooms-database'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, http_2, Observable_1, chatrooms_database_1;
    var ChatroomService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
                http_2 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (chatrooms_database_1_1) {
                chatrooms_database_1 = chatrooms_database_1_1;
            }],
        execute: function() {
            ChatroomService = (function () {
                function ChatroomService(http) {
                    this.http = http;
                }
                ChatroomService.prototype.getChatrooms = function () {
                    return Promise.resolve(chatrooms_database_1.ChatroomsDatabase);
                };
                ChatroomService.prototype.addChatroom = function (chatroom) {
                    for (var i = 0; i < chatrooms_database_1.ChatroomsDatabase.length; i++) {
                        if (chatrooms_database_1.ChatroomsDatabase[i].title === chatroom.title) {
                            return false;
                        }
                    }
                    chatrooms_database_1.ChatroomsDatabase.push(chatroom);
                    return true;
                };
                ChatroomService.prototype.deleteChatroom = function (chatroom) {
                    for (var i = 0; i < chatrooms_database_1.ChatroomsDatabase.length; i++) {
                        if (chatrooms_database_1.ChatroomsDatabase[i].title === chatroom.title) {
                            chatrooms_database_1.ChatroomsDatabase.splice(i, 1);
                        }
                    }
                };
                ChatroomService.prototype.sendMessage = function (message, chatroom) {
                    var body = JSON.stringify({ message: message });
                    var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_2.RequestOptions({ headers: headers });
                    return this.http.post("http://localhost:9000/sendMessage", body, options)
                        .map(function (res) { return res.json().result; })
                        .do(function (data) { return console.log(data); }) // eyeball results in the console
                        .catch(this.handleError);
                };
                ChatroomService.prototype.getMessages = function (chatroom) {
                    return this.http.get("http://localhost:9000/messages")
                        .map(function (res) { return res.json().result; })
                        .do(function (data) { return console.log(data); }) // eyeball results in the console
                        .catch(this.handleError);
                };
                ChatroomService.prototype.handleError = function (error) {
                    // in a real world app, we may send the server to some remote logging infrastructure
                    // instead of just logging it to the console
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                ChatroomService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], ChatroomService);
                return ChatroomService;
            })();
            exports_1("ChatroomService", ChatroomService);
        }
    }
});
//# sourceMappingURL=chatroom.service.js.map