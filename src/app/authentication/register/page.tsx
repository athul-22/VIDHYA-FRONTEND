"use client";
import { Grid, Box, Card, Typography, Stack, useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import Link from "next/link";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import AuthRegister from "../auth/AuthRegister";

const Register2 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <PageContainer title="Register" description="this is Register page">
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
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
          alignItems="center"
          sx={{ minHeight: "100vh" }}
        >
          <Grid
            item
            xs={12}
            sm={10}
            md={8}
            lg={6}
            xl={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={9}
              sx={{
                p: { xs: 3, sm: 4 },
                zIndex: 1,
                width: "100%",
                maxWidth: "500px",
                margin: { xs: 2, sm: 0 },
              }}
            >
              <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
                <Logo />
              </Box>
              <AuthRegister
                subtext={
                  <Typography
                    variant="subtitle1"
                    textAlign="center"
                    color="textSecondary"
                    mb={2}
                  >
                    LEARNING POWER HOUSE
                  </Typography>
                }
                subtitle={
                  <Stack
                    direction="row"
                    justifyContent="center"
                    spacing={1}
                    mt={3}
                  >
                    <Typography
                      color="textSecondary"
                      variant={isMobile ? "body2" : "h6"}
                      fontWeight="400"
                    >
                      Already have an Account?
                    </Typography>
                    <Typography
                      component={Link}
                      href="/authentication/user-info"
                      fontWeight="500"
                      variant={isMobile ? "body2" : "h6"}
                      sx={{
                        textDecoration: "none",
                        color: "primary.main",
                      }}
                    >
                      Sign In
                    </Typography>
                  </Stack>
                }
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Register2;