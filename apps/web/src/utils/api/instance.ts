import { Fetches } from '@siberiacancode/fetches';

export const api = new Fetches({
  baseURL: 'http://localhost:3000/api'
});

api.interceptors.request.use(async (config) => {
  await new Promise((res) => setTimeout(res, 1000));
  return config;
});
