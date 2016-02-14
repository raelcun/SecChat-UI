System.register([], function(exports_1) {
    var Chatroom;
    return {
        setters:[],
        execute: function() {
            Chatroom = (function () {
                function Chatroom(title, guid, active, users, messages) {
                    this.title = title;
                    this.guid = guid;
                    this.active = active;
                    this.users = users;
                    this.messages = messages;
                }
                return Chatroom;
            })();
            exports_1("Chatroom", Chatroom);
        }
    }
});
//# sourceMappingURL=chatroom.js.map