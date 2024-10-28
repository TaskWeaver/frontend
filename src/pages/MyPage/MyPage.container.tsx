import MyPageView from './MyPage.view.tsx';
import {useState, useEffect} from 'react';
import {service} from '../../domains';
import AsyncStorageService from '../../storage/AsyncStorage.ts';

export default function MyPageContainer() {
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [nickname, setNickname] = useState('');

  const asyncStorageService = new AsyncStorageService();

  useEffect(() => {
    const fetchProfile = async () => {
      const accessToken = await asyncStorageService.getAccessToken();
      if (!accessToken) return;
      const profile = await service.user.getProfile(accessToken);
      if (profile) {
        setEmail(profile.email);
        setId(profile.id);
        setImageUrl(profile.imageUrl);
        setNickname(profile.nickname);
      }
    };

    fetchProfile();
  }, []);

  return (
    <MyPageView email={email} id={id} imageUrl={imageUrl} nickname={nickname} />
  );
}
