import axios from "axios";

export const ART_SERVICE_PATH = 'art-service';
export const USER_SERVICE_PATH = 'user-service';
export const FILE_SERVICE_PATH = 'file-service';

export let axiosApi = axios.create({baseURL: process.env.NEXT_PUBLIC_APP_API_URL})

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