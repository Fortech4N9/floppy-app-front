import axios from 'axios';

const API_GATEWAY_URL = 'http://localhost:4000/friends/';

class FriendsService {
  getFutureFriends(token) {
    try {
      return axios.get(API_GATEWAY_URL + 'future-friends', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }).then(response => {
        if (response.status === 200 && response.data) {
          return response.data;
        } else {
          console.error('Error fetching future friends:', response.status, response.data);
          return [];
        }
      });
    } catch (error) {
      console.error('Error fetching future friends:', error);
      return [];
    }
  }

  addFriend(token, id) {
    try {
      return axios.post(API_GATEWAY_URL + 'add-friend/' + id, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }).then(response => {
        if (response.status === 201 && response.data) {
          return response.data;
        } else {
          console.error('Error add friend backend:', response.status, response.data);
          return [];
        }
      });
    } catch (error) {
      console.error('Error add friend frontend:', error);
      return [];
    }
  }

  deleteFriend(token, id) {
    try {
      return axios.post(API_GATEWAY_URL + 'delete-friend/' + id, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }).then(response => {
        if (response.status === 201 && response.data) {
          return response.data;
        } else {
          console.error('Error delete friend backend:', response.status, response.data);
          return [];
        }
      });
    } catch (error) {
      console.error('Error delete friend frontend:', error);
      return [];
    }
  }

  getFriendList(token, user) {
    try {
      return axios.get(API_GATEWAY_URL + 'my-friends', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }).then(response => {
        if (response.status === 200 && response.data) {
          const friendsRelation = response.data;
          if (friendsRelation.length > 0) {

            return friendsRelation.map((friendRelation) => {
              if (friendRelation.creator.id === user.id) {
                return friendRelation.receiver;
              }
              return friendRelation.creator;
            });
          }
          return [];
        } else {
          console.error('Error fetching user friends:', response.status, response.data);
          return [];
        }
      });
    } catch (error) {
      console.error('Error fetching user friends:', error);
      return [];
    }
  }
}

export default new FriendsService();