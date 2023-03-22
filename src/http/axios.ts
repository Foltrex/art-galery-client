import axios from "axios";


export const BASE_URL = 'http://localhost:8080/';

export const ART_SERVICE_PATH = 'art-service';
export const USER_SERVICE_PATH = 'user-service';
export const FILE_SERVICE_PATH = 'file-service';


export let axiosApi = axios.create({baseURL: `http://localhost:8080/`})

axiosApi.interceptors.request.use(request => {
    return request;
}, (error) => {
    console.log('REQUEST ERROR: ' + error)
    return Promise.reject(error);
})

axiosApi.interceptors.response.use(response => {
        return response;
    },
    (error) => {
        console.log('RESPONSE ERROR: ' + error)
        return Promise.reject(error);
    }
)