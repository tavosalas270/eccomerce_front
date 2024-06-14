import axios from "axios";

function postLogin(args) {
    return axios.post("http://localhost:8000/login/", args);
}

function postLogout(args, config) {
    return axios.post("http://localhost:8000/logout/", args, config);
}

function refreshToken(data) {
    return axios.post("http://localhost:8000/api/token/refresh/", data)
}

export { postLogin, postLogout, refreshToken };