import AsyncStorage from '@react-native-async-storage/async-storage';

export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';

export default class AsyncStorageService {
  async getAccessToken() {
    const token = await AsyncStorage.getItem(ACCESS_TOKEN);
    return token ?? '';
  }

  async getRefreshToken() {
    const token = await AsyncStorage.getItem(REFRESH_TOKEN);
    return token ?? '';
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
