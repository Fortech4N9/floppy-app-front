import axios from 'axios';

const API_GATEWAY_URL = 'http://localhost:4000/auth/';

class AuthService {
  login(user) {
    return axios.post(API_GATEWAY_URL + 'login', {
      'email': user.email,
      'password': user.password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
        setTimeout(() => {
          this.logout();
        }, 3600000);
      }

      return response.data;
    });
  }

  register(user) {
    return axios.post(API_GATEWAY_URL + 'register', {
      'firstName': user.firstName,
      'lastName': user.lastName,
      'email': user.email,
      'password': user.password,
    }, {
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  logout() {
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    const item = localStorage.getItem('user');
    if (item) {
      const userObject = JSON.parse(item);
      return userObject.user;
    }
    return null;
  }

  getUserToken() {
    const item = localStorage.getItem('user');
    if (item) {
      const userObject = JSON.parse(item);
      return userObject.token;
    }
    return null;
  }
}

export default new AuthService();