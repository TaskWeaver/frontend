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
      console.log(response.data.result);
      return response.data.result;
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  }
}
