import axios from 'axios';
import {REACT_APP_SERVER_URL} from '@env';
import Token from '../storage/Token.ts';

export default class UserRepository {
  async getUserProfile() {
    const token = new Token();
    const accessToken = await token.getAccessToken();

    const api = axios.create({
      baseURL: REACT_APP_SERVER_URL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    try {
      const response = await api.get('/v1/user');
      console.log(response.data.result);
      return response.data.result;
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  }
}
