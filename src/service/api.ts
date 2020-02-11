import axios from 'axios';

export default axios.create({
  baseURL: 'https://tasker.getsandbox.com:443',
  headers: { 'Content-Type': 'application/json' },
});
