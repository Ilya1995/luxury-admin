import { useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import { Header } from '../Header';
import { Sidebar } from '../Sidebar';
import { News } from '../News';
import { Brands } from '../Brands';
import { FAQ } from '../FAQ';
import { SIDEBAR_ITEMS } from '../../constants';

export const Home = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [itemOpen, setItemOpen] = useState(SIDEBAR_ITEMS[0].name);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const componentNames = {
    [SIDEBAR_ITEMS[0].name]: News,
    [SIDEBAR_ITEMS[1].name]: Brands,
    [SIDEBAR_ITEMS[2].name]: FAQ,
  };

  const SomeComponent = componentNames[itemOpen];

  const titles = {
    [SIDEBAR_ITEMS[0].name]: SIDEBAR_ITEMS[0].text,
    [SIDEBAR_ITEMS[1].name]: SIDEBAR_ITEMS[1].text,
    [SIDEBAR_ITEMS[2].name]: SIDEBAR_ITEMS[2].text,
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header
        handleDrawerToggle={handleDrawerToggle}
        title={titles[itemOpen]}
      />
      <Sidebar
        selectedItem={itemOpen}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        onChangeItemSidebar={setItemOpen}
      />
      <SomeComponent />
    </Box>
  );
};
