import { Outlet, Link, useLocation } from 'react-router-dom';

import { Grid, Paper, Typography, Tabs, Tab } from '@mui/material';

import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const HomePage = () => {
  const location = useLocation();

  useDocumentTitle('Home');

  return (
    <Grid container rowSpacing={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper>
          <Typography variant="h1" component="h1" sx={{ p: 2, textAlign: 'center' }}>
            {import.meta.env.VITE_BASE_APP_TITLE}
          </Typography>
          <Paper elevation={2}>
            <Tabs centered value={location.pathname}>
              <Tab label="Create Room" value="/create-room" to="/create-room" component={Link} />
              <Tab label="Join Room" value="/join-room" to="/join-room" component={Link} />
            </Tabs>
          </Paper>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default HomePage;
