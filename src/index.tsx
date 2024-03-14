import axios from 'axios';
import ReactDOM from 'react-dom/client';

import { App } from './App';

import './styles/index.scss';

// if (process.env.NODE_ENV !== 'production') {
//   axios.defaults.baseURL = 'http://localhost:8080';
// }
axios.defaults.baseURL = 'https://luxury-sfo5.onrender.com';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<App />);
