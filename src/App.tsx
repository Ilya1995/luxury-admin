import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ToastContainer } from 'react-toastify';

import { Home } from './components/Home';

import 'react-toastify/dist/ReactToastify.css';

const locale = 'ru';

export const App = () => {
  dayjs.locale(locale);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <div>
        <Home />
        <ToastContainer autoClose={2000} />
      </div>
    </LocalizationProvider>
  );
};
