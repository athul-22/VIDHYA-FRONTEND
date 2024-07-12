/* eslint-disable @next/next/no-img-element */
'use client';
import "regenerator-runtime/runtime";
import React, { useState, useEffect, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {
  Typography, Box, TextField, Button, Paper, IconButton, Menu, MenuItem,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Select, FormControl, InputLabel, SelectChangeEvent, Grid, Avatar, Backdrop, CircularProgress
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import Anjali from '../../../assets/Anjeli1.gif'
import { set } from "lodash";

interface Message {
  text: string;
  sender: 'ai' | 'user';
}

const paperStyle = {
  boxShadow: 'none',
  border: 'none',
  outline: 'none',
};

const SamplePage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hello! How can I assist you today?', sender: 'ai' },
    // { text: 'Can you tell me more about your services?', sender: 'user' },
  ]);

  const [input, setInput] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<{ target: HTMLElement | null, index: number | null }>({ target: null, index: null });
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>('en-IN');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedText, setTranslatedText] = useState<string>('');
  const [originalText, setOriginalText] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const [isRecording, setIsRecording] = useState(false);

  // CHAT GPT API


  const chatApi = async (text: string) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });
      const data = await response.json();
      setMessages([...messages, { text: data.text, sender: 'ai' }]);
      return data;
    } catch (error) {
      console.error('Error fetching chat response:', error);
      return null;
    }
  }

  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [messages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const languageOptions = [
    { value: 'en-IN', label: 'English' },
    { value: 'hi-IN', label: 'Hindi' },
    { value: 'ml-IN', label: 'Malayalam' },
    { value: 'ta-IN', label: 'Tamil' },
    { value: 'te-IN', label: 'Telugu' },
    { value: 'kn-IN', label: 'Kannada' },
    { value: 'bn-IN', label: 'Bengali' },
  ];

  const handleStartRecording = () => {
    setIsRecording(true);
    resetTranscript();
    console.log(language)
    SpeechRecognition.startListening({ language });

  };

  const handleStopRecording = async () => {
    SpeechRecognition.stopListening();
    setIsRecording(false);
    setIsTranslating(true);
    setOriginalText(transcript);
    setTranslatedText(transcript)
    if (transcript) {
      try {
        const response = await fetch('/api/translate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: transcript, targetLanguage: 'ml' }),
        });
        const data = await response.json();
        setTranslatedText(data.translation);
        setMessages([...messages, { text: data.translation, sender: 'user' }]);
      } catch (error) {
        console.error('Error translating text:', error);
      }
    }
    setIsTranslating(false);
  };

  const handleCancelRecording = () => {
    SpeechRecognition.stopListening();
    setIsRecording(false);
    resetTranscript();
    console.log('Recording cancelled');
    console.log(transcript)
    setTranslatedText(transcript)
    setMessages([...messages, { text:transcript, sender: 'user' }]);
  };

  const handleSendMessage = () => {
    if (input.trim() !== '') {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'This is a response from the AI.', sender: 'ai' },
        ]);
      }, 1000);
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setAnchorEl({ target: event.currentTarget, index });
  };

  const handleMenuClose = () => {
    setAnchorEl({ target: null, index: null });
  };

  const handleSaveMessage = (index: number | null) => {
    if (index !== null) {
      console.log(`Saving message at index ${index}:`, messages[index].text);
    }
    handleMenuClose();
  };

  const handleFileUploadClick = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    console.log(event.target.value)
    setLanguage(event.target.value);
  };

  const handleGeneratePDF = () => {
    console.log('Generate PDF');
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn&apos;t support speech recognition.</span>;
  }

  return (
    <PageContainer title="AI Teacher" description="this is Sample page">
      <DashboardCard title={
        <Box display="flex" flexDirection="column" alignItems="flex-start" width="100%">
          <Typography variant="h6">AI Teacher</Typography>
          <Box display="flex" alignItems="center" mt={1}>
            <FormControl variant="outlined" size="small" style={{ marginRight: '1rem', minWidth: 120 }}>
              <InputLabel>Language</InputLabel>
              <Select
                value={language}
                onChange={handleLanguageChange}
                label="Language"
              >
                {languageOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              style={{ backgroundColor: '#1976d2', color: 'white' }}
              onClick={handleGeneratePDF}
            >
              Generate PDF
            </Button>
          </Box>
        </Box>
      }>
        <Grid container spacing={2}>
          {/* Left side: Chat section */}
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="column" height="60vh" style={{border:'none',boxShadow: 'none',outline:'none'}}>
              <Box flexGrow={1} overflow="auto" padding={2} component={Paper} style={{ ...paperStyle, display: 'flex', flexDirection: 'column' }}>
                {messages.map((message, index) => (
                  <Box 
                    key={index} 
                    display="flex" 
                    justifyContent={message.sender === 'ai' ? 'flex-start' : 'flex-end'}
                    mb={2}
                    position="relative"
                    onMouseEnter={(e) => handleMenuClick(e, index)}
                    onMouseLeave={handleMenuClose}
                  >
                    <Box
                      style={{
                        backgroundColor: message.sender === 'ai' ? '#e0e0e0' : '#1976d2',
                        color: message.sender === 'ai' ? 'black' : 'white',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        maxWidth: '75%',
                        position: 'relative',
                      }}
                    >
                      <Typography>{message.text}</Typography>
                      <IconButton
                        size="small"
                        onClick={(event) => handleMenuClick(event, index)}
                        style={{
                          position: 'absolute',
                          top: '-10px',
                          right: '-10px',
                          backgroundColor: message.sender === 'ai' ? '#e0e0e0' : '#1976d2',
                          display: anchorEl.index === index ? 'block' : 'none',
                        }}
                      >
                        <MoreVertIcon fontSize="small" style={{ color: message.sender === 'ai' ? 'black' : 'white' }} />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
                <div ref={messagesEndRef} />
              </Box>
              <Box display="flex" alignItems="center" padding={2} component={Paper} style={paperStyle}>
                <IconButton onClick={handleFileUploadClick}>
                  <AttachFileIcon />
                </IconButton>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message here..."
                  style={{ marginLeft: '1rem', marginRight: '1rem' }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSendMessage}
                >
                  Send
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Right side: Voice capture and translation */}
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="column" alignItems="center" height="60vh" justifyContent="center">
              <Box display="flex" flexDirection="column" alignItems="center" width="100%">
                <img src={Anjali.src} alt="Anjali" style={{height:'300px',width:'300px',marginBottom:'20px',borderRadius:'50%'}}  />
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<MicIcon />}
                  onClick={handleStartRecording}
                  disabled={isRecording}
                  style={{ marginBottom: '1rem', width: '200px' }}
                >
                  Start Recording
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleStopRecording}
                  disabled={!isRecording}
                  style={{ marginBottom: '1rem', width: '200px' }}
                >
                  Stop Recording
                </Button>
              </Box>
            </Box>

            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={isRecording || isTranslating}
            >
              {isRecording ? (
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Box
                    width="100px"
                    height="100px"
                    borderRadius="50%"
                    bgcolor="primary.main"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      animation: 'pulse 1.5s ease-in-out infinite',
                      '@keyframes pulse': {
                        '0%': { transform: 'scale(0.8)', opacity: 0.7 },
                        '50%': { transform: 'scale(1)', opacity: 1 },
                        '100%': { transform: 'scale(0.8)', opacity: 0.7 },
                      },
                    }}
                  >
                    <MicIcon style={{ fontSize: 50, color: 'white' }} />
                  </Box>
                  <Typography variant="h6" style={{ marginTop: '1rem' }}>
                    Listening...
                  </Typography>
                  <Typography variant="body1" style={{ marginTop: '0.5rem' }}>
                    {transcript}
                  </Typography>
                 <div style={{display:'flex',justifyContent:'center'}}>
                 <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCancelRecording}
                    // onClick={handleStopRecording}
                    style={{ marginTop: '1rem' }}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleCancelRecording}
                    // onClick={handleStopRecording}
                    style={{ marginTop: '1rem' }}
                  >
                    Cancel
                  </Button>
                 </div>
                </Box>
              ) : (
                <Box display="flex" flexDirection="column" alignItems="center">
                  <CircularProgress color="inherit" />
                  <Typography variant="h6" style={{ marginTop: '1rem' }}>
                    Translating...
                  </Typography>
                </Box>
              )}
            </Backdrop>
          </Grid>
        </Grid>
      </DashboardCard>

      <Menu
        anchorEl={anchorEl.target}
        open={Boolean(anchorEl.target)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleSaveMessage(anchorEl.index)}>Save</MenuItem>
      </Menu>

      <Dialog open={openDialog} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>Upload File</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select a file to upload.
          </DialogContentText>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            style={{
              border: '2px dashed #1976d2',
              borderRadius: '8px',
              padding: '2rem',
              marginTop: '1rem',
            }}
          >
            <Typography>Drag and drop a file here, or click to select a file</Typography>
            <Button
              variant="outlined"
              color="primary"
              style={{ marginTop: '1rem' }}
            >
              Browse Files
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDialogClose} color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default SamplePage;