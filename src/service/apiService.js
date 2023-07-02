import { baseUrl } from '../constants/Constants';

export default class apiService {
  static #utilityFetch = async (urlPart, payload) => {
    const response = await fetch(`${baseUrl}${urlPart}`, payload);
    return response;
  };

  static getArticlesList = async (page = 1, token) =>
    await this.#utilityFetch(
      `articles?limit=5&offset=${0 + (page - 1) * 5}`,
      token && {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

  static getArticle = async ({ slug, token }) =>
    await this.#utilityFetch(
      `articles/${slug}`,
      token && {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

  static #articleFetch =
    (method) =>
    async ({ data, token, slug = '' }) =>
      await this.#utilityFetch(`articles/${slug}`, {
        method,
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ article: data }),
      });
  static postArticle = this.#articleFetch('POST');
  static editeArticle = this.#articleFetch('PUT');
  static deleteArticle = this.#articleFetch('DELETE');

  static favoriteArticle = async (slug, token, favorite) =>
    await this.#utilityFetch(`articles/${slug}/favorite`, {
      method: favorite ? 'DELETE' : 'POST',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

  static signUp = async (user) =>
    await this.#utilityFetch('users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: user }),
    });

  static signIn = async (user) =>
    await this.#utilityFetch('users/login ', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: user }),
    });

  static getUserData = async (token) =>
    await this.#utilityFetch('user', {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

  static updateUserData = async ({ token, user }) =>
    await this.#utilityFetch('user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ user: user }),
    });
}
