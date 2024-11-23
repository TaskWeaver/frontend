import axios from 'axios';
import {REACT_APP_SERVER_URI} from '@env';

export default class UserRepository {
  async getUserProfile(accessToken: string) {
    const api = axios.create({
      baseURL: REACT_APP_SERVER_URI,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    try {
      const response = await api.get('v1/user');
      return response.data.result;
    } catch (error: any) {
      throw error;
    }
  }

  async getNotification(token: string) {
    const api = axios.create({
      baseURL: REACT_APP_SERVER_URI,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    try {
      const response = await api.get('v1/notification');
      return response.data;
    } catch (e) {
      throw e;
    }
  }

  async getNewToken(accessToken: string, refreshToken: string) {
    const api = axios.create({
      baseURL: REACT_APP_SERVER_URI,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    try {
      const response = await api.post('v1/user/token', {
        refreshToken: refreshToken,
        oldAccessToken: accessToken,
      });
      console.log(response);
      return response.data;
    } catch (e) {
      throw e;
    }
  }
}
