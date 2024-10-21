import axios from 'axios';
import {REACT_APP_SERVER_URL} from '@env';

export default class TeamRepository {
  async createTeam(token: string, teamName: string, teamDescription: string) {
    const api = axios.create({
      baseURL: REACT_APP_SERVER_URL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    try {
      const response = await api.post('/v1/team', {teamName, teamDescription});
      console.log(response);

      return response;
    } catch (e) {
      throw e;
    }
  }
}