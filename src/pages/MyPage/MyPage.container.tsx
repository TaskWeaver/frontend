import MyPageView from './MyPage.view.tsx';
import {useState, useEffect} from 'react';
import {service} from '../../domains';
import Token from '../../domains/storage/Token.ts';

export default function MyPageContainer() {
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [nickname, setNickname] = useState('');

  const token = new Token();

  useEffect(() => {
    const fetchProfile = async () => {
      const accessToken = await token.getAccessToken();
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
