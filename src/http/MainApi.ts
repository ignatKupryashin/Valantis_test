import axios, {AxiosInstance, InternalAxiosRequestConfig} from "axios";
import md5 from "md5";

const API_URL = 'https://api.valantis.store:41000/';
const PASSWORD: string = 'Valantis';

function getCurrentDateString(): string {
    const currentDate = new Date(Date.now());
    const day = currentDate.getUTCDate();
    const month = currentDate.getUTCMonth() + 1;
    const year = currentDate.getUTCFullYear();
    return `${year}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}`
}

const getHashedPassword = (): string => {
    return md5(`${PASSWORD}_${getCurrentDateString()}`)
}


export const MainApi: AxiosInstance = axios.create({
    baseURL: API_URL,
})

MainApi.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
    config.headers['X-Auth'] = getHashedPassword();
    return config;
}, (error) => {
    return Promise.reject(error);
});
