import AsyncStorage from '@react-native-async-storage/async-storage';

export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';

export default class AsyncStorageService {
  async getAccessToken() {
    return await AsyncStorage.getItem(ACCESS_TOKEN);
  }

  async getRefreshToken() {
    return await AsyncStorage.getItem(REFRESH_TOKEN);
  }

  async setAccessToken(token: string) {
    await AsyncStorage.setItem(ACCESS_TOKEN, token);
  }

  async setRefreshToken(token: string) {
    await AsyncStorage.setItem(REFRESH_TOKEN, token);
  }

  async removeToken() {
    await AsyncStorage.clear();
  }
}
