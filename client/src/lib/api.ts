import store from '../store';
import constant from '../constant';

async function oauthLogin(query: string) {
  /* @ts-ignore */
  const url = API_ENDPOINT + `/user/auth${query}`;
  const res = await fetch(url);
  if (res.status !== 200) throw new Error(constant.LOGIN_FAILED);
  return await res.json();
}

export { oauthLogin };
