import { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ToastContainer } from 'react-toastify';

import { Home } from './components/Home';
import { Login } from './components/Login';

import 'react-toastify/dist/ReactToastify.css';

const locale = 'ru';

export const App = () => {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('pepe'));

  dayjs.locale(locale);

  const handleAuth = () => {
    setIsAuth(true);
    localStorage.setItem('pepe', '1');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <div>
        {isAuth && <Home />}
        {!isAuth && <Login onAuth={handleAuth} />}
        <ToastContainer autoClose={2000} />
      </div>
    </LocalizationProvider>
  );
};
