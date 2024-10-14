import axios from 'axios';
import {REACT_APP_SERVER_URL} from '@env';

export default class UserRepository {
  async getUserProfile() {
    const api = axios.create({
      baseURL: REACT_APP_SERVER_URL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMjpERUZBVUxUIiwiaXNzIjoiVGFza1dlYXZlciIsImlhdCI6MTcyODg5MzU1MSwiZXhwIjoxNzI4OTc5OTUxfQ.N_FmU4CYlXKxqh3osVNM6nexY0XgKeAGZWPsHol2IWgx6SbdpoNtKbLI8rQPMUBNbjpL-qI5NKs3gr1UbSB1TQ`, // 엑세스 토큰을 Authorization 헤더에 추가
      },
    });

    try {
      const response = await api.get('/v1/user');
      console.log(response.data.result);
      return response.data.result;
    } catch (error: any) {
      console.log(error);
      throw error; // 오류를 다시 throw하여 상위에서 처리할 수 있도록 함
    }
  }
}
