import { io } from "socket.io-client";
import axios from "axios";
const CHAT_URL = "http://localhost:7000";

export class ChatService {
    constructor(token) {
        this.token = token;
        this.socket = io(CHAT_URL, {
            transportOptions: {
                polling: {
                    extraHeaders: {
                        Authorization: `Bearer ${this.token}`,
                    },
                }
            }
        });

        this.socket.on("connect", () => {
            console.log("Chat Socket connected");
        });

        this.socket.on("disconnect", () => {
            console.log("Chat Socket disconnected");
        });

        this.socket.on("newMessage", (message) => {
            console.log(message)
        });
    }

    sendMessage(message) {
        if (!this.socket) {
            console.error("Socket not connected. Call connect() first.");
            return;
        }

        this.socket.emit("sendMessage", message);
    }

    getMessages(friendId){
        try {
            return axios.post(CHAT_URL + '/chat/get-messages/' + friendId, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`,
                },
            }).then(response => {
                if (response.status === 201 && response.data) {
                    return response.data;
                } else {
                    console.error('Error getMessages:', response.status, response.data);
                    return [];
                }
            });
        } catch (error) {
            console.error('Error add friend frontend:', error);
            return [];
        }
    }

    getConservation(friendId){
        try {
            return axios.post(CHAT_URL + '/chat/get-conversation/' + friendId, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`,
                },
            }).then(response => {
                if (response.status === 201 && response.data) {
                    console.log(response.data);
                    return response.data;
                } else {
                    console.error('Error getMessages:', response.status, response.data);
                    return [];
                }
            });
        } catch (error) {
            console.error('Error add friend frontend:', error);
            return [];
        }
    }
}