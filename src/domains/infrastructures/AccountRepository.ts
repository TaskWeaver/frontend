import axios from 'axios';
import {SERVER_URL} from '@env';

export default class AccountRepository {
  async createAccount(
    email: string,
    password: string,
    nickname: string,
    imageUrl: string
  ) {
    const api = axios.create({
      baseURL: SERVER_URL,
      headers: {'Content-Type': 'application/json'},
    });

    try {
      const response = await api.post('/v1/auth/sign-up', {
        email,
        password,
        nickname,
        imageUrl,
      });
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
      baseURL: SERVER_URL,
      headers: {'Content-Type': 'application/json'},
    });

    try {
      const response = await api.post('/v1/auth/sign-in', {
        email,
        password,
        deviceId,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
