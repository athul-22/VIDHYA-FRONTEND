/* eslint-disable @next/next/no-img-element */
"use client";
import React,{ useEffect, useState } from "react";
import {
  Typography,
  Grid,
  CardContent,
  Card,
  CardMedia,
  Button,
  Backdrop,
  CircularProgress,
  TextField,
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import CAREER from "../../../../assets/CAREER.png";

const randomBackgrounds = [
  "linear-gradient(135deg, #f6d365 0%, #fda085 100%)", // Orange gradient
  "linear-gradient(135deg, #a8e063 0%, #56ab2f 100%)", // Green gradient
  "linear-gradient(90deg, #69caff 0%, #00bbff 100%)", // Blue sky-blue gradient
  "linear-gradient(135deg, #c3cfe2 0%, #c3cfe2 100%)", // Keeping the grey gradient
];

interface Props {
  title: string;
  children: React.ReactNode;
}

const TypographyPage = () => {
  interface CareerRole {
    title: string;
    description: string;
    image_link: string;
    URL: string
  }
  
  const [careerRoles, setCareerRoles] = useState<CareerRole[]>([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCareerRoles = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://vidhya-nodejs.onrender.com/roadmap-generator", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "a@a.a",
          input_text: inputText,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setCareerRoles(data.career_roles);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error fetching career roles:", error);
    }
    setLoading(false);
  };

  return (
    <PageContainer title="Typography" description="this is Typography">
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <DashboardCard title="Career Roadmap">
            <React.Fragment>
              <img
                src={CAREER.src}
                alt="Career"
                style={{
                  height: "400px",
                  width: "400px",
                  float: "right",
                  marginRight: "100px",
                  marginBottom: "100px",
                }}
              />
              <p>Find your best career path with GenAI Intelligence</p>
              <TextField
                label="What do you want to become?"
                variant="outlined"
                fullWidth
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                style={{
                  marginBottom: "16px",
                  width: "300px",
                  marginTop: "300px",
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={fetchCareerRoles}
                style={{ marginTop: "300px" }}
              >
                Generate
              </Button>
              </React.Fragment>
          </DashboardCard>
        </Grid>
        {careerRoles.map((role, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              style={{
                background: randomBackgrounds[index % randomBackgrounds.length],
                color: "#fff",
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={role.image_link}
                alt={role.title}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  style={{ fontWeight: "bold" }}
                >
                  {role.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {role.description}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  href={role.URL}
                  target="_blank"
                  style={{ marginTop: "10px" }}
                >
                  Explore
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <Backdrop open={loading} style={{ zIndex: 1300, color: "#fff" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </PageContainer>
  );
};

export default TypographyPage;
