import axios from 'axios';

const cliente = axios.create({
  baseURL: 'http://192.168.0.44:4000/api/user'
});

export default cliente;