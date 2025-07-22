import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000', 
});

export const fetchTasks = () => API.get('/tasks');
export const createTask = (taskData) => API.post('/task', taskData);


const data = fetchTasks();
data.then(response => {
  console.log(response.data);
}).catch(error => {
  console.error("Error fetching tasks:", error);
});
