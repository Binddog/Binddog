import axios from 'axios';

const docsAxios = axios.create({
    baseURL: `${window.location.protocol}//${window.location.hostname}:${window.location.port}`,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    // withCredentials: true,
});

export default docsAxios;
