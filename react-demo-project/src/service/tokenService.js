class TokenService {
  getLocalRefreshToken() {
    const user = localStorage.getItem("token2");
    return user;
  }
  // eslint-disable-next-line lines-between-class-members
  getLocalAccessToken() {
    const user = localStorage.getItem("token");
    return user;
  }
}
export default new TokenService();
