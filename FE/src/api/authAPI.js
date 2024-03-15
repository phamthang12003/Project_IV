import FetchBase from "./FetchBase";

class AuthAPI extends FetchBase {}

const authAPI = new AuthAPI("/Auth");

export default authAPI;
