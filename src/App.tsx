import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

import { Home } from './components/Home';

export const App = () => {
  dayjs.locale('ru');

  return (
    <div>
      <Home />
    </div>
  );
};
