import AsyncStorage from '@react-native-async-storage/async-storage';
import {service} from '../index.ts';

const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';
const ACCESS_TOKEN_EXPIRE_TIME = 'accessTokenExpireTime';
const REFRESH_TOKEN_EXPIRE_TIME = 'refreshTokenExpireTime';
const ONBOARDING_KEY = 'hasSeenOnBoarding';

export default class Token {
    async isTokenExpired(expireTimeKey: string): Promise<boolean> {
        const expireTime = await AsyncStorage.getItem(expireTimeKey);
        if (!expireTime) {
            return true;
        }

        const now = new Date().getTime();
        return now > Number(expireTime);
    }

    async getAccessToken(): Promise<string | null> {
        return await AsyncStorage.getItem(ACCESS_TOKEN);
    }

    async getRefreshToken(): Promise<string | null> {
        return await AsyncStorage.getItem(REFRESH_TOKEN);
    }

    async refreshTokens(): Promise<string | null> {
        const refreshToken = await this.getRefreshToken();
        const oldAccessToken = await this.getAccessToken();

        console.log(oldAccessToken, refreshToken);

        if (!refreshToken || !oldAccessToken) {
            await this.clearToken();
            return null;
        }

        try {
            const response = await service.user.getNewToken(
                oldAccessToken,
                refreshToken
            );
            if (response.resultCode === 200) {
                const newAccessToken = response.result;
                await this.saveToken(newAccessToken, refreshToken);
                return newAccessToken;
            } else {
                await this.clearToken();
                return null;
            }
        } catch (error) {
            await this.clearToken();
            return null;
        }
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

    async saveOnBoarding(): Promise<void> {
        try {
            await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
        } catch (e) {
            throw e;
        }
    }

    async getOnBoarding(): Promise<string | null> {
        return await AsyncStorage.getItem(ONBOARDING_KEY);
    }
}
