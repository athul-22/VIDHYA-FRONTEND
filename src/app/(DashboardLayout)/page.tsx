"use client";
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
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
// components
import ProfitExpenses from "@/app/(DashboardLayout)/components/dashboard/ProfitExpenses";
import TrafficDistribution from "@/app/(DashboardLayout)/components/dashboard/TrafficDistribution";
import UpcomingSchedules from "@/app/(DashboardLayout)/components/dashboard/UpcomingSchedules";
import TopPayingClients from "@/app/(DashboardLayout)/components/dashboard/TopPayingClients";
import Blog from "@/app/(DashboardLayout)/components/dashboard/Blog";
import ProductSales from "@/app/(DashboardLayout)/components/dashboard/ProductSales";
import PubjabiMap from "@/assets/PUBJAB.gif";

// Dummy job openings data
const jobOpenings = [
  {
    company: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png", // path to google logo
    title: "Software Engineer",
    date: "2024-07-15",
    description: "Develop and maintain software applications.",
    applyLink: "#",
  },
  {
    company: "Meta",
    logo: "https://cdn.pixabay.com/photo/2021/12/14/22/29/meta-6871457_1280.png", // path to meta logo
    title: "Data Scientist",
    date: "2024-08-01",
    description: "Analyze and interpret complex data sets.",
    applyLink: "#",
  },
  {
    company: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/2500px-Amazon_icon.svg.png", // path to amazon logo
    title: "Product Manager",
    date: "2024-07-20",
    description: "Oversee product development and strategy.",
    applyLink: "#",
  },
  {
    company: "Intuit",
    logo: "https://scontent-lga3-1.xx.fbcdn.net/v/t39.30808-6/301429490_451337717008996_4409771414638724669_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=wWJJbAd934YQ7kNvgGFv2M4&_nc_ht=scontent-lga3-1.xx&oh=00_AYBt4Fk-hi8ti-W2ZkdF9ChD6kQ1Vta5CwM4NVEdQgy-lg&oe=66981F80", // path to intuit logo
    title: "UX Designer",
    date: "2024-07-25",
    description: "Design user-friendly interfaces and experiences.",
    applyLink: "#",
  },
];

const JobOpenings = () => (
  <Grid container spacing={3}>
    {jobOpenings.map((job, index) => (
      <Grid item xs={12} key={index}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" mb={2}>
              <Avatar src={job.logo} alt={`${job.company} logo`} />
              <Box ml={2}>
                <Typography variant="h6">{job.title}</Typography>
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
              href={job.applyLink}
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
);

const Dashboard = () => {
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
          <Typography style={{ fontSize: "20px", fontWeight: "bold" }}>
            Punjabi Gov Live Events
          </Typography>
          <img src={PubjabiMap.src} alt="" height="400px" width="400px" />
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card style={{ padding: "30px", width: "100%" }}>
          <Typography style={{ fontSize: "20px", fontWeight: "bold" }}>
            Live 
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary={<span style={{ color: 'red', fontWeight: 'bold' }}>● Live Event 1 - September 5, 2024</span>} 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary={<span style={{ color: 'red', fontWeight: 'bold' }}>● Live Event 2 - September 8, 2024</span>} 
              />
            </ListItem>
            <br></br>
            <Typography style={{ fontSize: "20px", fontWeight: "bold" }}>
            Upcoming Events
          </Typography>
          <br></br>
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
            <JobOpenings />
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
