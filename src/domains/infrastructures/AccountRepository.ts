import axios from 'axios';
import {REACT_APP_SERVER_URL} from '@env';

export default class AccountRepository {
  async createAccount(
    email: string,
    password: string,
    nickname: string,
    profileImage: any
  ) {
    const api = axios.create({
      baseURL: REACT_APP_SERVER_URL,
      headers: {'Content-Type': 'multipart/form-data'},
    });

    const formData = new FormData();

    formData.append(
      'request',
      JSON.stringify({
        email: email,
        password: password,
        nickname: nickname,
        loginType: 'DEFAULT',
      })
    );

    if (profileImage) {
      formData.append('profileImage', {
        uri: profileImage.uri,
        name: profileImage.name || 'profileImage.jpg',
        type: profileImage.type || 'image/jpeg',
      });
    }

    try {
      const response = await api.post('v1/auth/sign-up', formData);
      console.log('Response:', response.data);
      return response.data;
    } catch (error: any) {
      console.log('Full error:', error);
      if (error.response) {
        console.log('Error data:', error.response.data);
        console.log('Error status:', error.response.status);
        console.log('Error headers:', error.response.headers);
      } else if (error.request) {
        console.log('Error request:', error.request);
      } else {
        console.log('Error message:', error.message);
      }
      throw error;
    }
  }

  async loginAccount(email: string, password: string, deviceId: string) {
    const api = axios.create({
      baseURL: REACT_APP_SERVER_URL,
      headers: {'Content-Type': 'application/json'},
    });

    try {
      const response = await api.post('v1/auth/sign-in', {
        email,
        password,
        deviceId,
      });
      return response.data;
    } catch (error: any) {
      console.log('Full error:', error);
      if (error.response) {
        console.log('Error data:', error.response.data);
        console.log('Error status:', error.response.status);
        console.log('Error headers:', error.response.headers);
      } else if (error.request) {
        console.log('Error request:', error.request);
      } else {
        console.log('Error message:', error.message);
      }
      throw error;
    }
  }

  async logoutAccount(accessToken: string) {
    const api = axios.create({
      baseURL: REACT_APP_SERVER_URL,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    try {
      return await api.delete('v1/auth/logout');
    } catch (error: any) {
      console.log('Logout error:', error);
      throw error; // 에러 처리
    }
  }

  async checkNickname(nickname: string) {
    const api = axios.create({
      baseURL: REACT_APP_SERVER_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    try {
      const response = await api.get(`v1/auth/${nickname}`);
      return response.data;
    } catch (e) {
      throw e;
    }
  }
}
