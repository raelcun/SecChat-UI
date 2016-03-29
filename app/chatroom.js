System.register([], function(exports_1) {
    var Chatroom;
    return {
        setters:[],
        execute: function() {
            Chatroom = (function () {
                function Chatroom(title, port, guid, active, messages) {
                    this.title = title;
                    this.port = port;
                    this.guid = guid;
                    this.active = active;
                    this.messages = messages;
                }
                return Chatroom;
            })();
            exports_1("Chatroom", Chatroom);
        }
    }
});
//# sourceMappingURL=chatroom.js.map