import store from '../store';
import constant from '../constant';

/* @ts-ignore */
const api_endpoint = API_ENDPOINT;

async function oauthLogin(query: string) {
  const url = api_endpoint + `/user/auth${query}`;
  const res = await fetch(url);
  if (res.status !== 200) throw new Error(constant.LOGIN_FAILED);
  return await res.json();
}
async function getCategories() {
  const url = api_endpoint + `/api/v1/category`;
  const res = await fetch(url);
  return await res.json();
}

export { oauthLogin, getCategories };
