"use client";

import {
  styled,
  Container,
  Box,
  Card,
  TextField,
  Select,
  MenuItem,
  Button,
  Chip,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Header from "@/app/(DashboardLayout)/layout/header/Header";
import Sidebar from "@/app/(DashboardLayout)/layout/sidebar/Sidebar";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import AuthRegister from "../auth/AuthRegister";

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
  padding: "20px",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));

const FormCard = styled(Card)(() => ({
  width: "100%",
  height: "auto",
  padding: "20px",
  margin: "20px",
}));

export default function UserInfo({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  interface FormData {
    school: string;
    grade: string;
    standard: string;
    performance: string;
    interests: string[];
    avgTimeLearning: string;
  }

  const [formData, setFormData] = useState<FormData>({
    school: "",
    grade: "",
    standard: "",
    performance: "",
    interests: [],
    avgTimeLearning: "",
  });
  const [newInterest, setNewInterest] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddInterest = () => {
    if (newInterest && !formData.interests.includes(newInterest)) {
      setFormData((prevData) => ({
        ...prevData,
        interests: [...prevData.interests, newInterest],
      }));
      setNewInterest("");
    }
  };

  const handleRemoveInterest = (interest) => {
    setFormData((prevData) => ({
      ...prevData,
      interests: prevData.interests.filter((item) => item !== interest),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <PageContainer title="Register" description="this is Register page">
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: "100vh" }}
        >
          <Grid
            item
            xs={12}
            sm={8}
            lg={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <FormCard elevation={9} sx={{ p: 4, zIndex: 1 }}>
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
                      Location , State
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
                        style={{ margin: "2px" }}
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
                      href="/"
                    >
                      Sign In
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </FormCard>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
