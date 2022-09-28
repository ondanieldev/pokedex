import axios from 'axios';

export const customAPIURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/'
    : 'https://pokedex-api.ondaniel.com.br/';

export const customAPI = axios.create({
  baseURL: customAPIURL,
});

export default customAPI;
