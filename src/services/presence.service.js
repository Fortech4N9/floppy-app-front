import { io } from 'socket.io-client';

export class PresenceService {
    socket;
    friendsStatus = [];

    constructor(jwtToken) {
        this.socket = io("http://localhost:8000", {
            transportOptions: {
                polling: {
                    extraHeaders: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            }
        });

        this.socket.on('connect', () => {
            console.log('Соединение с сервером установлено');
        });

        this.socket.on('disconnect', () => {
            console.log('Соединение с сервером прервано');
        });

        this.socket.on('friendActive', (data) => {
            this.updateFriendStatus(data);
        });
    }

    updateFriendStatus(status) {
        const existingIndex = this.friendsStatus.findIndex(
            (s) => s.id === status.id
        );
        if (existingIndex !== -1) {
            this.friendsStatus[existingIndex] = status;
        } else {
            this.friendsStatus.push(status);
        }
    }

    updateOwnStatus(isActive) {
        this.socket.emit('updateActiveStatus', isActive);
    }

    getFriendStatus(id) {
        return this.friendsStatus.find((s) => s.id === id);
    }
}