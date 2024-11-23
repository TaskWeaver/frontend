import axios from 'axios';
import {REACT_APP_SERVER_URI} from '@env';

export default class TeamRepository {
  async getTeam(token: string) {
    const api = axios.create({
      baseURL: REACT_APP_SERVER_URI,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    try {
      const response = await api.get('v1/teams');
      return response;
    } catch (e) {
      throw e;
    }
  }

  async createTeam(token: string, teamName: string, teamDescription: string) {
    const api = axios.create({
      baseURL: REACT_APP_SERVER_URI,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    try {
      const response = await api.post('/v1/team', {
        name: teamName,
        description: teamDescription,
      });

      return response.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async editTeam(
    token: string,
    teamName: string,
    teamDescription: string,
    teamId: string
  ) {
    const api = axios.create({
      baseURL: REACT_APP_SERVER_URI,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    try {
      const response = await api.put(`/v1/team/${teamId}`, {
        name: teamName,
        description: teamDescription,
      });

      return response.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async deleteTeam(token: string, teamId: string) {
    const api = axios.create({
      baseURL: REACT_APP_SERVER_URI,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    try {
      const response = await api.delete(`v1/team/${teamId}`);
      return response;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async inviteMember(token: string, teamId: string, email: string) {
    const api = axios.create({
      baseURL: REACT_APP_SERVER_URI,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    try {
      const response = await api.post('v1/team/invitation/email', {
        email: email,
        teamId: teamId,
      });
      return response;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}