import { HttpClient } from './http-client';

export const pokeApi = new HttpClient({
  baseURL: 'https://pokeapi.co/api/v2/'
});
