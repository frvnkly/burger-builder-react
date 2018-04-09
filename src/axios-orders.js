import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-react-c8b52.firebaseio.com/',
});

export default instance;