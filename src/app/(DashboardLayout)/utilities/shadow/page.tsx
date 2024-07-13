'use client';
import { useState, useEffect } from 'react';
import { Paper, Box, Grid, Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

interface SavedMessage {
  previous: string;
  current: string;
}

const Shadow = () => {
  const [savedMessages, setSavedMessages] = useState<SavedMessage[]>([]);

  useEffect(() => {
    const messages = JSON.parse(localStorage.getItem('savedMessages') || '[]');
    setSavedMessages(messages);
  }, []);

  return (
    <PageContainer title="Shadow" description="this is Shadow">
      <DashboardCard title="Saved messages">
        <div> 
          <Grid container spacing={2}>
            {savedMessages.map((message, index) => (
              <Grid item xs={12} key={index}>
                <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Previous message:
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {message.previous}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    Saved message:
                  </Typography>
                  <Typography variant="body1">
                    {message.current}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
          {savedMessages.length === 0 && (
            <Typography variant="body1" align="center">
              No saved messages found.
            </Typography>
          )}
        </div>
      </DashboardCard>
    </PageContainer>
  );
};

export default Shadow;