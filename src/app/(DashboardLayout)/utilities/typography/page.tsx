"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  Drawer,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  TextField,
  Typography,
  Card,
  Grid,
  Avatar,
  ListItemAvatar,
} from "@mui/material";
import { styled } from "@mui/system";

interface Course {
  name: string;
  link: string;
  completed?: boolean;
}

interface Module {
  title: string;
  duration: string;
  difficulty: string;
  courses: Course[];
}

const initialModules = [
  {
    title: "Foundations in Mathematics and Programming",
    duration: "4 weeks",
    difficulty: "Easy",
    courses: [
      {
        name: "Mathematics for Machine Learning",
        link: "https://www.coursera.org/learn/mathematics-for-machine-learning",
      },
      {
        name: "Python for Everybody",
        link: "https://www.coursera.org/specializations/python",
      },
    ],
  },
  {
    title: "Probability & Statistics",
    duration: "4 weeks",
    difficulty: "Medium",
    courses: [
      {
        name: "Introduction to Probability",
        link: "https://www.coursera.org/learn/probability-statistics",
      },
      {
        name: "Statistics with Python",
        link: "https://www.coursera.org/specializations/statistics-with-python",
      },
    ],
  },
  {
    title: "Python for Data Science",
    duration: "2 weeks",
    difficulty: "Easy",
    courses: [
      {
        name: "Python Data Science Handbook",
        link: "https://jakevdp.github.io/PythonDataScienceHandbook/",
      },
      {
        name: "Data Science with Python",
        link: "https://www.udemy.com/course/data-science-and-machine-learning-bootcamp-with-r/",
      },
    ],
  },
  {
    title: "Introduction to Machine Learning",
    duration: "3 weeks",
    difficulty: "Medium",
    courses: [
      {
        name: "Machine Learning by Andrew Ng",
        link: "https://www.coursera.org/learn/machine-learning",
      },
      {
        name: "Introduction to Machine Learning with Python",
        link: "https://www.udemy.com/course/introduction-to-machine-learning-with-python/",
      },
    ],
  },
  {
    title: "Linear Models & Classification",
    duration: "3 weeks",
    difficulty: "Medium",
    courses: [
      {
        name: "Linear Regression and Classification",
        link: "https://www.coursera.org/learn/linear-regression-classification",
      },
      {
        name: "Supervised Learning with scikit-learn",
        link: "https://www.udemy.com/course/supervised-learning-with-scikit-learn/",
      },
    ],
  },
  {
    title: "Decision Trees & Ensemble Methods",
    duration: "3 weeks",
    difficulty: "Hard",
    courses: [
      {
        name: "Ensemble Methods in Machine Learning",
        link: "https://www.coursera.org/learn/ensemble-methods-in-machine-learning",
      },
      {
        name: "Decision Trees for Machine Learning",
        link: "https://www.udemy.com/course/decision-trees-for-machine-learning/",
      },
    ],
  },
  {
    title: "Model Evaluation & Hyperparameter Tuning",
    duration: "2 weeks",
    difficulty: "Medium",
    courses: [
      {
        name: "Model Evaluation and Hyperparameter Tuning",
        link: "https://www.coursera.org/learn/model-evaluation-hyperparameter-tuning",
      },
      {
        name: "Hyperparameter Optimization",
        link: "https://www.udemy.com/course/hyperparameter-optimization/",
      },
    ],
  },
  {
    title: "Neural Networks",
    duration: "3 weeks",
    difficulty: "Hard",
    courses: [
      {
        name: "Neural Networks and Deep Learning",
        link: "https://www.coursera.org/learn/neural-networks-deep-learning",
      },
      {
        name: "Deep Learning Specialization",
        link: "https://www.coursera.org/specializations/deep-learning",
      },
    ],
  },
  {
    title: "Convolutional Neural Networks",
    duration: "2 weeks",
    difficulty: "Hard",
    courses: [
      {
        name: "Convolutional Neural Networks for Visual Recognition",
        link: "https://www.coursera.org/learn/convolutional-neural-networks",
      },
      {
        name: "Deep Learning for Computer Vision",
        link: "https://www.udemy.com/course/deep-learning-for-computer-vision/",
      },
    ],
  },
  {
    title: "Recurrent Neural Networks",
    duration: "1 week",
    difficulty: "Medium",
    courses: [
      {
        name: "Sequence Models",
        link: "https://www.coursera.org/learn/sequence-models",
      },
      {
        name: "Recurrent Neural Networks for Language Modeling",
        link: "https://www.udemy.com/course/recurrent-neural-networks-for-language-modeling/",
      },
    ],
  },
];

const topAICompanies = [
  {
    name: "Tata Elxsi",
    roles: ["AI Developer", "Data Scientist"],
    package: "₹10,00,000 - ₹30,00,000",
    logo: "https://cdn.worldvectorlogo.com/logos/tata-1.svg",
  },
  {
    name: "IPAI Innovations",
    roles: ["Machine Learning Engineer", "AI Researcher"],
    package: "₹12,00,000 - ₹25,00,000",
    logo: "https://logowik.com/content/uploads/images/ipai-innovation-park-artificial-intelligence9517.logowik.com.webp",
  },
  {
    name: "RVM Tech Hub",
    roles: ["Data Analyst", "AI Solutions Architect"],
    package: "₹8,00,000 - ₹18,00,000",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReVH2R3F94P31p4FtaUfotesyIqFT233mkSw&s",
  },
  {
    name: "IBM Labs",
    roles: ["AI Research Scientist", "Deep Learning Engineer"],
    package: "₹15,00,000 - ₹28,00,000",
    logo: "https://www.ibm.com/brand/experience-guides/developer/8f4e3cc2b5d52354a6d43c8edba1e3c9/02_8-bar-reverse.svg",
  },
  {
    name: "JIO",
    roles: ["Robotics Engineer", "Autonomous Systems Developer"],
    package: "₹11,00,000 - ₹22,00,000",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9rp-AjLkG9iFHL49_8HZLmGOGpyYRQ_A-gC6evqcpCl5yc5pKH0h6VEP5lD_IdYW8uHU&usqp=CAU",
  },
];

const topAITopics = [
  {
    topic: "Machine Learning Engineering",
    roles: ["NLP Engineer", "Chatbot Developer"],
    icon: "🤖",
  },
  {
    topic: "Deep Learning Enginnering",
    roles: ["Computer Vision Engineer", "Image Recognition Specialist"],
    icon: "📷",
  },
  {
    topic: "Reinforcement Learning",
    roles: ["RL Research Scientist", "Game AI Developer"],
    icon: "🎮",
  },
  {
    topic: "LLM Developer",
    roles: ["LLM Engineer", "GenAI Systems Developer"],
    icon: "🤖",
  },
  {
    topic: "AI Ethics",
    roles: ["AI Ethics Researcher", "Responsible AI Specialist"],
    icon: "⚖️",
  },
];

const TimelineCard = styled(Box)(({ theme }) => ({
  backgroundColor: "#f0f0f0",
  padding: theme.spacing(2),
  borderRadius: 4,
  position: "relative",
  width: "300px",
  margin: "15px auto",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  cursor: "pointer",
}));

const ConnectingLine = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: "50%",
  top: "-15px",
  width: "2px",
  height: "30px",
  backgroundColor: "#ccc",
  transform: "translateX(-50%)",
}));

const CompanyCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  height: "100%",
}));

const TopicCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const CareerRoadmapGenerator = () => {
  const [open, setOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [roadmap, setRoadmap] = useState<Module[]>([]);
  const [inputText, setInputText] = useState("");
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [interest, setInterest] = useState("");
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    const storedRoadmap = localStorage.getItem("roadmap");
    if (storedRoadmap) {
      setRoadmap(JSON.parse(storedRoadmap));
      setShowRoadmap(true);
    }
    handleReset();
  }, []);

  const handleReset = () => {
    localStorage.removeItem("roadmap");
    setRoadmap([]);
    setShowRoadmap(false);
    setInputText("");
  };

  // const handleGenerateClick = () => {
  //   const newRoadmap = initialModules.map((module) => ({
  //     ...module,
  //     courses: module.courses.map((course) => ({
  //       ...course,
  //       completed: false,
  //     })),
  //   }));
  //   setRoadmap(newRoadmap);
  //   setShowRoadmap(true);
  //   localStorage.setItem("roadmap", JSON.stringify(newRoadmap));
  // };

  // const handleGenerateClick = () => {
  //   const newRoadmap = initialModules.map((module) => ({
  //     ...module,
  //     courses: module.courses.map((course) => ({
  //       ...course,
  //       completed: false,
  //     })),
  //   }));
  //   setRoadmap(newRoadmap);
  //   setShowRoadmap(true);
  //   localStorage.setItem("roadmap", JSON.stringify(newRoadmap));

  //   setShowSkeleton(true);
  //   setTimeout(() => {
  //     setShowSkeleton(false);
  //   }, 5000);
  // };

  const handleGenerateClick = () => {
    const newRoadmap: Module[] = initialModules.map((module) => ({
      ...module,
      courses: module.courses.map((course) => ({
        ...course,
        completed: false,
      })),
    }));
    setRoadmap(newRoadmap);
    setShowRoadmap(true);
    localStorage.setItem("roadmap", JSON.stringify(newRoadmap));

    setShowSkeleton(true);
    setTimeout(() => {
      setShowSkeleton(false);
    }, 5000);
  };

  const handleModuleClick = (module: Module) => {
    setSelectedModule(module);
    setOpen(true);
  };

  const handleCourseChange = (moduleIndex: number, courseIndex: number) => {
    const updatedRoadmap = [...roadmap];
    updatedRoadmap[moduleIndex].courses[courseIndex].completed =
      !updatedRoadmap[moduleIndex].courses[courseIndex].completed;
    setRoadmap(updatedRoadmap);
    localStorage.setItem("roadmap", JSON.stringify(updatedRoadmap));
  };

  const calculateProgress = () => {
    const totalCourses = roadmap.reduce(
      (sum, module) => sum + module.courses.length,
      0
    );
    const completedCourses = roadmap.reduce(
      (sum, module) =>
        sum +
        module.courses.filter((course: Course) => course.completed).length,
      0
    );
    return totalCourses > 0 ? (completedCourses / totalCourses) * 100 : 0;
  };

  return (
    <Box sx={{ padding: 2 }}>
  {/* Input Fields and Progress Bar */}
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Card sx={{ display: "flex", justifyContent: "center", padding: "20px" }}>
        <Box>
          {/* Your existing input fields */}
          <TextField
            label="Your Career Goal"
            variant="outlined"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            sx={{ marginRight: 2 }}
            style={{ width: "400px" }}
          />
          <TextField
            label="Interests"
            variant="outlined"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            sx={{ marginRight: 2 }}
            style={{ width: "400px" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerateClick}
          >
            Generate Roadmap
          </Button>
        </Box>
      </Card>
    </Grid>

    {/* Progress Bar */}
    {showRoadmap && (
      <Grid item xs={12}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LinearProgress
            variant="determinate"
            value={calculateProgress()}
            sx={{ flexGrow: 1, marginRight: 2 }}
          />
          <Typography variant="body2">
            {`${Math.round(calculateProgress())}%`}
          </Typography>
        </Box>
      </Grid>
    )}
  </Grid>

  {/* Timeline and AI Companies/Topics */}
  {showRoadmap && (
    <Grid container spacing={2} sx={{ marginTop: 2 }}>
      {/* Left Side: Timeline */}
      <Grid item xs={12} md={6}>
        <Box sx={{ position: "relative", width: "100%" }}>
          {roadmap.map((module: Module, index: number) => (
            <TimelineCard
              key={index}
              onClick={() => handleModuleClick(module)}
              style={{
                width: "100%",
                backgroundColor: "white",
                borderRadius: "10px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              {index !== 0 && <ConnectingLine />}
              <Typography variant="h6">{module.title}</Typography>
              <Typography
                variant="body2"
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                Duration: {module.duration}
              </Typography>
              <Typography
                variant="body2"
                style={{
                  padding: "4px 8px",
                  borderRadius: "20px",
                  width: "fit-content",
                  backgroundColor:
                    module.difficulty === "Easy"
                      ? "#e8f5e9"
                      : module.difficulty === "Medium"
                      ? "#fffde7"
                      : "#ffebee",
                  color:
                    module.difficulty === "Easy"
                      ? "#2e7d32"
                      : module.difficulty === "Medium"
                      ? "#f57f17"
                      : "#c62828",
                }}
              >
                {module.difficulty}
              </Typography>
            </TimelineCard>
          ))}
        </Box>
      </Grid>

      {/* Right Side: AI Companies and Topics */}
      <Grid item xs={12} md={6} style={{height:'500px',marginTop:'18px'}}>
        <CompanyCard>
          <Typography variant="h6" gutterBottom>
            Top AI Companies
          </Typography>
          <List>
            {topAICompanies.map((company, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar src={company.logo} alt={company.name} />
                </ListItemAvatar>
                <ListItemText
                  primary={company.name}
                  secondary={
                    <>
                      <Typography variant="body2">
                        Roles: {company.roles.join(", ")}
                      </Typography>
                      <Typography variant="body2">
                        Package: {company.package}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </CompanyCard>
        <TopicCard>
          <Typography variant="h6" gutterBottom>
            Top AI Topics and Roles
          </Typography>
          <List>
            {topAITopics.map((item, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar style={{backgroundColor:'white'}}>{item.icon}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.topic}
                  secondary={`Roles: ${item.roles.join(", ")}`}
                />
              </ListItem>
            ))}
          </List>
        </TopicCard>
      </Grid>
    </Grid>

  )}
    

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: { width: "30%" },
        }}
      >
        <Box sx={{ padding: 3 }}>
          {selectedModule && (
            <>
              <Typography variant="h4" sx={{ marginBottom: 2 }}>
                {selectedModule.title}
              </Typography>
              <List>
                {selectedModule.courses.map(
                  (course: Course, courseIndex: number) => (
                    <ListItem key={courseIndex}>
                      <Checkbox
                        checked={course.completed || false}
                        onChange={() =>
                          handleCourseChange(
                            roadmap.findIndex(
                              (m) => m.title === selectedModule.title
                            ),
                            courseIndex
                          )
                        }
                        color="primary"
                      />
                      <ListItemText>
                        <Typography variant="body1">{course.name}</Typography>
                        <a
                          href={course.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {course.link}
                        </a>
                      </ListItemText>
                    </ListItem>
                  )
                )}
              </List>
            </>
          )}
          <Button
            variant="contained"
            onClick={() => setOpen(false)}
            sx={{ marginTop: 2 }}
          >
            Close
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default CareerRoadmapGenerator;
