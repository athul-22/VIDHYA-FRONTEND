import axios from 'axios';
import React, { useState } from "react";
import { Box, Typography, Button, Select, MenuItem } from "@mui/material";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import { Stack } from "@mui/system";

interface registerType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState<number>(1); // Default language set to English

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/register', {
        name,
        email,
        password,
        language
      });

      if (response.status === 201) {
        // Store user ID and details in localStorage
        const userId = response.data.userId;
        localStorage.setItem('userId', userId);
        localStorage.setItem('userDetails', JSON.stringify({ name, email, language }));
        
        // Redirect or update UI as needed
        window.location.href = '/authentication/user-info';
      }
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Box>
        <Stack mb={3}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="name"
            mb="5px"
          >
            Name
          </Typography>
          <CustomTextField id="name" variant="outlined" fullWidth value={name} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setName(e.target.value)} />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="email"
            mb="5px"
            mt="25px"
          >
            Email Address
          </Typography>
          <CustomTextField id="email" variant="outlined" fullWidth value={email} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)} />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
            mt="25px"
          >
            Password
          </Typography>
          <CustomTextField id="password" variant="outlined" fullWidth value={password} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)} />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="language"
            mb="5px"
            mt="25px"
          >
            Language
          </Typography>
          <Select
            labelId="language-select-label"
            id="language-select"
            value={language}
            onChange={(e) => setLanguage(Number(e.target.value))}
            fullWidth
          >
            <MenuItem value={1}>English</MenuItem>
            <MenuItem value={2}>Kannada</MenuItem>
          </Select>
        </Stack>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          onClick={handleRegister}
        >
          Sign Up
        </Button>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthRegister;
