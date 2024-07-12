'use client';
import { useState } from 'react';
import {
  styled,
  Box,
  Card,
  TextField,
  Select,
  MenuItem,
  Button,
  Chip,
  Grid,
  Typography,
} from '@mui/material';
import axios from 'axios';
import Logo from '@/app/(DashboardLayout)/layout/shared/logo/Logo';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
  padding: '20px',
}));

const FormCard = styled(Card)(() => ({
  width: '100%',
  height: 'auto',
  padding: '20px',
  margin: '20px',
}));

const UserInfo = () => {
  const [formData, setFormData] = useState({
    state: null,
    school: '',
    grade: '',
    standard: '',
    performance: '',
    interests: [] as string[],
    avgTimeLearning: '',
    location: '',
    ambition: '',
    hobbies: '',
  });
  const [newInterest, setNewInterest] = useState('');

  const handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddInterest = () => {
    if (newInterest && !formData.interests.includes(newInterest)) {
      setFormData((prevData) => ({
        ...prevData,
        interests: [...prevData.interests, newInterest],
      }));
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setFormData((prevData) => ({
      ...prevData,
      interests: prevData.interests.filter((item) => item !== interest),
    }));
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const userId = localStorage.getItem('email');
    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/update_user',
        {
          email: userId,
          education: formData.school,
          location: formData.location,
          grade: formData.grade,
          ambition: formData.ambition,
          hobbies: formData.hobbies,
          learning_capacities: formData.performance,
          interests: formData.interests,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        console.log('User information updated successfully', response.data);
        localStorage.setItem('userInfo', '1'); // Update userInfo in localStorage to '1'
      } else {
        console.error('Failed to update user information');
      }
    } catch (error) {
      console.error('Error updating user information', error);
    }
  };

  return (
    <PageContainer title="Register" description="this is Register page">
      <MainWrapper>
        <Grid container spacing={0} justifyContent="center">
          <Grid
            item
            xs={12}
            sm={8}
            lg={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <FormCard elevation={9} sx={{ p: 4 }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>

              <Box component="form" onSubmit={handleSubmit} mt={3}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      mb="5px"
                    >
                      Education
                    </Typography>
                    <CustomTextField
                      type="text"
                      name="school"
                      value={formData.school}
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      mb="5px"
                    >
                      Location, State
                    </Typography>
                    <CustomTextField
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      mb="5px"
                    >
                      Grade
                    </Typography>
                    <CustomTextField
                      type="text"
                      name="grade"
                      value={formData.grade}
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      mb="5px"
                    >
                      Your ambition
                    </Typography>
                    <CustomTextField
                      type="text"
                      name="ambition"
                      value={formData.ambition}
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      mb="5px"
                    >
                      Your hobbies
                    </Typography>
                    <CustomTextField
                      type="text"
                      name="hobbies"
                      value={formData.hobbies}
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      mb="5px"
                    >
                      Learning Capacity
                    </Typography>
                    <Select
                      fullWidth
                      label="Performance"
                      name="performance"
                      value={formData.performance}
                      onChange={handleChange}
                      variant="outlined"
                    >
                      <MenuItem value="below average">Below Average</MenuItem>
                      <MenuItem value="average">Average</MenuItem>
                      <MenuItem value="good">Good</MenuItem>
                      <MenuItem value="topper">Very Good</MenuItem>
                    </Select>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Add Interest"
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      fullWidth
                    />
                    <Button onClick={handleAddInterest}>Add</Button>
                  </Grid>

                  <Grid item xs={12}>
                    {formData.interests.map((interest) => (
                      <Chip
                        key={interest}
                        label={interest}
                        onDelete={() => handleRemoveInterest(interest)}
                        style={{ margin: '2px' }}
                      />
                    ))}
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      color="primary"
                      variant="contained"
                      size="large"
                      fullWidth
                      type="submit"
                    >
                      Update Information
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </FormCard>
          </Grid>
        </Grid>
      </MainWrapper>
    </PageContainer>
  );
};

export default UserInfo;
