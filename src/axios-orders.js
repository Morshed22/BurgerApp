import axios from 'axios';

const  instance = axios.create({
    baseURL : 'https://burger-app-e6dd1.firebaseio.com/'
});

export default instance;