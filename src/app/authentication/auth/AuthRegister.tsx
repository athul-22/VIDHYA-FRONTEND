import React, { useState ,ReactNode} from 'react';
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  Card,
  Grid,
  Chip,
  TextField,
  styled,
  Stack,
} from '@mui/material';
import axios from 'axios';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import { SelectChangeEvent } from '@mui/material/Select';


interface AuthRegisterProps {
  subtext?: ReactNode;
  subtitle?: ReactNode;
}

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  
  // padding: '20px',
}));

const FormCard = styled(Card)(() => ({
  width: '100%',
  maxWidth: '700px',
  // padding: '20px',
  margin: '2px',
}));

interface FormData {
  name: string;
  email: string;
  password: string;
  language: number;
  school: string;
  grade: string;
  performance: string;
  interests: string[];
  location: string;
  ambition: string;
  hobbies: string;
}


const steps = ['Account Info', 'User Info'];

const AuthRegister: React.FC<AuthRegisterProps> = ({ subtext, subtitle }) => {
  const [activeStep, setActiveStep] = useState(0);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    language: 1,
    school: '',
    grade: '',
    performance: '',
    interests: [] as string[],
    location: '',
    ambition: '',
    hobbies: '',
  });

  const [newInterest, setNewInterest] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  // const handleSelectChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
  //   const name = e.target.name as keyof typeof formData;
  //   setFormData(prevData => ({ ...prevData, [name]: e.target.value }));
  // };

  const handleSelectChange = (event: SelectChangeEvent<number | string>) => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleAddInterest = () => {
    if (newInterest && !formData.interests.includes(newInterest)) {
      setFormData(prevData => ({
        ...prevData,
        interests: [...prevData.interests, newInterest],
      }));
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setFormData(prevData => ({
      ...prevData,
      interests: prevData.interests.filter((item) => item !== interest),
    }));
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://vidhya-nodejs.onrender.com/register', formData);
      if (response.status === 201) {
        const userId = response.data.userId;
        localStorage.setItem('userId', userId);
        localStorage.setItem('userDetails', JSON.stringify(formData));
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <>
    {subtext}
    <MainWrapper>
      <FormCard elevation={9}>
        <Typography fontWeight="700" variant="h4" mb={3} textAlign="center">
          Register
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <Box mt={3}>
            <Stack spacing={2}>
              <CustomTextField
                label="Name"
                name="name"
                variant="outlined"
                fullWidth
                value={formData.name}
                onChange={handleChange}
              />
              <CustomTextField
                label="Email Address"
                name="email"
                variant="outlined"
                fullWidth
                value={formData.email}
                onChange={handleChange}
              />
              <CustomTextField
                label="Password"
                name="password"
                variant="outlined"
                fullWidth
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
              <Select
                label="Language"
                name="language"
                value={formData.language}
                onChange={handleSelectChange}
                fullWidth
              >
                <MenuItem value={1}>English</MenuItem>
                <MenuItem value={2}>Kannada</MenuItem>
              </Select>
            </Stack>
            <Box display="flex" justifyContent="space-between" mt={3}>
              <Button disabled>Back</Button>
              <Button color="primary" variant="contained" onClick={handleNext}>
                Next
              </Button>
            </Box>
          </Box>
        )}

        {activeStep === 1 && (
          <Box mt={3}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CustomTextField
                  label="School"
                  name="school"
                  variant="outlined"
                  fullWidth
                  value={formData.school}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  label="Location, State"
                  name="location"
                  variant="outlined"
                  fullWidth
                  value={formData.location}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  label="Grade"
                  name="grade"
                  variant="outlined"
                  fullWidth
                  value={formData.grade}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  label="Your Ambition"
                  name="ambition"
                  variant="outlined"
                  fullWidth
                  value={formData.ambition}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  label="Your Hobbies"
                  name="hobbies"
                  variant="outlined"
                  fullWidth
                  value={formData.hobbies}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  label="Learning Capacity"
                  name="performance"
                  value={formData.performance}
                  onChange={handleSelectChange}
                  fullWidth
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
                <Box display="flex" justifyContent="space-between">
                  <Button onClick={handleBack}>Back</Button>
                  <Button color="primary" variant="contained" onClick={handleSubmit}>
                    Sign Up
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </FormCard>
    </MainWrapper>
    {subtitle}
    </>
  );
};

export default AuthRegister;