"use client";
import { useState } from "react";
import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import ProfitExpenses from "@/app/(DashboardLayout)/components/dashboard/ProfitExpenses";
import TrafficDistribution from "@/app/(DashboardLayout)/components/dashboard/TrafficDistribution";
import UpcomingSchedules from "@/app/(DashboardLayout)/components/dashboard/UpcomingSchedules";
import ProductSales from "@/app/(DashboardLayout)/components/dashboard/ProductSales";
import PubjabiMap from "@/assets/PUBJAB.gif";

interface Job {
  company: string;
  company_logo: string;
  title: string;
  date: string;
  description: string;
  apply_link: string;
}

const initialJobOpenings: Job[] = [
  {
    company: "Google",
    company_logo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png",
    title: "Software Engineer",
    date: "2024-07-15",
    description: "Develop and maintain software applications.",
    apply_link: "#",
  },
  {
    company: "Meta",
    company_logo:
      "https://cdn.pixabay.com/photo/2021/12/14/22/29/meta-6871457_1280.png",
    title: "Data Scientist",
    date: "2024-08-01",
    description: "Analyze and interpret complex data sets.",
    apply_link: "#",
  },
  {
    company: "Amazon",
    company_logo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/2500px-Amazon_icon.svg.png",
    title: "Product Manager",
    date: "2024-07-20",
    description: "Oversee product development and strategy.",
    apply_link: "#",
  },
  {
    company: "Intuit",
    company_logo:
      "https://scontent-lga3-1.xx.fbcdn.net/v/t39.30808-6/301429490_451337717008996_4409771414638724669_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=wWJJbAd934YQ7kNvgGFv2M4&_nc_ht=scontent-lga3-1.xx&oh=00_AYBt4Fk-hi8ti-W2ZkdF9ChD6kQ1Vta5CwM4NVEdQgy-lg&oe=66981F80",
    title: "UX Designer",
    date: "2024-07-25",
    description: "Design user-friendly interfaces and experiences.",
    apply_link: "#",
  },
];

const Dashboard = () => {
  const [jobOpenings, setJobOpenings] = useState(initialJobOpenings);
  const [searchtext, setSearchText] = useState("");
  const handleSearch = async () => {
    console.log("SEARCH CLICKED");

    try {
      const response = await fetch(
        `https://jobs-api-vercel.vercel.app/jobs?keywords=${searchtext}`
      );
      const data = await response.json();

      // Assuming the API response is an object with job openings
      // If the response format is different, adjust this accordingly
      // const formattedData = Object.entries(data).map(([key, job]) => ({
      //   company: job.company,
      //   company_logo: job.company_logo,
      //   title: key,
      //   date: job.date,
      //   description: job.description,
      //   apply_link: job.apply_link,
      // }));

      const formattedData: Job[] = Object.entries(data).map(
        ([key, value]: [string, any]) => ({
          company: value.company,
          company_logo: value.company_logo,
          title: key,
          date: value.date,
          description: value.description,
          apply_link: value.apply_link,
        })
      );

      setJobOpenings(formattedData);
      console.log(formattedData);
      console.log(jobOpenings);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <ProfitExpenses />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TrafficDistribution />
              </Grid>
              <Grid item xs={12}>
                <ProductSales />
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} style={{ margin: "20px" }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Card style={{ padding: "30px", width: "100%" }}>
                    <Typography
                      style={{ fontSize: "20px", fontWeight: "bold" }}
                    >
                      PSDM Live Events
                    </Typography>
                    <img
                      src={PubjabiMap.src}
                      alt=""
                      height="400px"
                      width="400px"
                    />
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card style={{ padding: "30px", width: "100%" }}>
                    <Typography
                      style={{ fontSize: "20px", fontWeight: "bold" }}
                    >
                      Live
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText
                          primary={
                            <span style={{ color: "red", fontWeight: "bold" }}>
                              ● GenAI Workshop (Virtual) - September 5, 2024
                            </span>
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={
                            <span style={{ color: "red", fontWeight: "bold" }}>
                              ● FoodTech Workshop - September 8, 2024
                            </span>
                          }
                        />
                      </ListItem>
                      <br />
                      <Typography
                        style={{ fontSize: "20px", fontWeight: "bold" }}
                      >
                        Upcoming Events
                      </Typography>
                      <br />
                      <ListItem>
                        <ListItemText primary="Punjabi Language Workshop - September 10, 2024" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Cultural Heritage Festival - September 15, 2024" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Punjabi Cooking Class - September 30, 2024" />
                      </ListItem>
                    </List>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Card style={{ width: "100%", marginBottom: "20px" }}>
              <TextField
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSearch();
                  }
                }}
                value={searchtext}
                onChange={(e) => setSearchText(e.target.value)}
                // onClick={handleSearch}
                placeholder="Search Job Openings"
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  padding: "10px",
                  border: "none",
                  outline: "none",
                }}
              />
            </Card>
            {jobOpenings.map((job, index) => (
              <Grid item xs={12} key={index}>
                <br></br>
                <Card>
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar
                        src={job.company_logo}
                        alt={`${job.company} logo`}
                      />
                      <Box ml={2}>
                      <Typography variant="h5">{job.company}</Typography>
                      <Typography variant="h6" style={{color:'grey'}}>{job.title}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {job.date}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" gutterBottom>
                      {job.description}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      href={job.apply_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Apply
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Grid item xs={12} lg={6}>
            <UpcomingSchedules />
          </Grid>
          <Grid item xs={12} lg={8}>
            {/* <TopPayingClients /> */}
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
