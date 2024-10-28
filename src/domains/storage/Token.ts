import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';
const ACCESS_TOKEN_EXPIRE_TIME = 'accessTokenExpireTime';
const REFRESH_TOKEN_EXPIRE_TIME = 'refreshTokenExpireTime';

export default class Token {
  async isTokenExpired(expireTimeKey: string): Promise<boolean> {
    const expireTime = await AsyncStorage.getItem(expireTimeKey);
    if (!expireTime) return true;

    const now = new Date().getTime();
    return now > Number(expireTime);
  }

  async getAccessToken(): Promise<string | null> {
    const isExpired = await this.isTokenExpired(ACCESS_TOKEN_EXPIRE_TIME);
    if (isExpired) {
      await this.clearToken();
      return null;
    }
    return await AsyncStorage.getItem(ACCESS_TOKEN);
  }

  async getRefreshToken(): Promise<string | null> {
    const isExpired = await this.isTokenExpired(REFRESH_TOKEN_EXPIRE_TIME);
    if (isExpired) {
      await this.clearToken();
      return null;
    }
    return await AsyncStorage.getItem(REFRESH_TOKEN);
  }

  async saveToken(accessToken: string, refreshToken: string): Promise<void> {
    try {
      const now = new Date().getTime();
      const accessTokenExpireTime = now + 24 * 60 * 60 * 1000; // 1 day in milliseconds
      const refreshTokenExpireTime = now + 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds

      await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
      await AsyncStorage.setItem(REFRESH_TOKEN, refreshToken);
      await AsyncStorage.setItem(
        ACCESS_TOKEN_EXPIRE_TIME,
        accessTokenExpireTime.toString()
      );
      await AsyncStorage.setItem(
        REFRESH_TOKEN_EXPIRE_TIME,
        refreshTokenExpireTime.toString()
      );
    } catch (e) {
      throw e;
    }
  }

  async clearToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN);
      await AsyncStorage.removeItem(REFRESH_TOKEN);
      await AsyncStorage.removeItem(ACCESS_TOKEN_EXPIRE_TIME);
      await AsyncStorage.removeItem(REFRESH_TOKEN_EXPIRE_TIME);
    } catch (e) {
      throw e;
    }
  }
}
