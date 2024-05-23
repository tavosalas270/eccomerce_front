import axios from "axios";

function postLogin(args) {
    return axios.post("http://localhost:8000/login/", args);
}

function refreshToken(data) {
    return axios.post("http://localhost:8000/api/token/refresh/", data)
}

export { postLogin, refreshToken };