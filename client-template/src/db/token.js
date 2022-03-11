const TOKEN = 'token';

export default class TokenStorage {
  saveToken(token) {
    //localStorage는 browser에서 이용 가능한 api
    localStorage.setItem(TOKEN, token);
  }

  getToken() {
    return localStorage.getItem(TOKEN);
  }

  clearToken() {
    localStorage.clear(TOKEN);
  }
}