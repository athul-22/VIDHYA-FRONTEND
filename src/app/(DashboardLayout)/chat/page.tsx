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
import AnjaliStatic from '../../../assets/AnjaliStatic.png'
import { set } from "lodash";
import SaveIcon from '@mui/icons-material/Save';
// import { CanvasDraw } from "react-canvas-draw";
// import type { CanvasDrawProps } from 'react-canvas-draw';
// import CanvasDraw from "react-canvas-draw";
import GestureIcon from '@mui/icons-material/Gesture';
// import { CanvasDraw } from 'react-canvas-draw';

interface Message {
  text: string;
  sender: 'ai' | 'user' | 'typing';
}

const paperStyle = {
  boxShadow: 'none',
  border: 'none',
  outline: 'none',
};

const TypingAnimation: React.FC = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" padding={1}>
      <div style={{
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: '#1976d2',
        margin: '0 3px',
        animation: 'typing 1s infinite ease-in-out',
        animationDelay: '0s'
      }}></div>
      <div style={{
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: '#1976d2',
        margin: '0 3px',
        animation: 'typing 1s infinite ease-in-out',
        animationDelay: '0.2s'
      }}></div>
      <div style={{
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: '#1976d2',
        margin: '0 3px',
        animation: 'typing 1s infinite ease-in-out',
        animationDelay: '0.4s'
      }}></div>
      <style jsx>{`
        @keyframes typing {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </Box>
  );
};

const SamplePage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hello! How can I assist you today?', sender: 'ai' },
  ]);

  const [input, setInput] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<{ target: HTMLElement | null, index: number | null }>({ target: null, index: null });
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>('en-IN');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedText, setTranslatedText] = useState<string>('');
  const [originalText, setOriginalText] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [hoveredMessageIndex, setHoveredMessageIndex] = useState<number | null>(null);
  
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const [isRecording, setIsRecording] = useState(false);

  const [isAnjaliAnimating, setIsAnjaliAnimating] = useState(false);

  // CANVAS

  // const [isSketchDialogOpen, setIsSketchDialogOpen] = useState(false);
  // const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const [isSketchDialogOpen, setIsSketchDialogOpen] = useState(false);
// const [canvasRef, setCanvasRef] = useState<CanvasDraw | null>(null);
// const canvasRef = useRef<CanvasDraw | null>(null);

  const handleOpenSketchDialog = () => {
    setIsSketchDialogOpen(true);
  };
  
  const handleCloseSketchDialog = () => {
    setIsSketchDialogOpen(false);
  };
  
  // const handleSubmitSketch = async () => {
  //   if (canvasRef) {
  //     const imageDataUrl = canvasRef.current?.getDataURL();
  //     try {
  //       const response = await fetch('https://vidhya-nodejs.onrender.com/analyze-image', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ imageData: imageDataUrl }),
  //       });
  //       const data = await response.json();
  //       console.log('Image analysis:', data.analysis);
        
  //       // Add the AI response to the chat
  //       setMessages(prevMessages => [
  //         ...prevMessages,
  //         { text: "Here's what I see in your sketch:", sender: 'ai' },
  //         { text: data.analysis, sender: 'ai' }
  //       ]);
  //     } catch (error) {
  //       console.error('Error analyzing image:', error);
  //       setMessages(prevMessages => [
  //         ...prevMessages,
  //         { text: "I'm sorry, I couldn't analyze the image. Please try again.", sender: 'ai' }
  //       ]);
  //     }
  //   }
  //   handleCloseSketchDialog();
  // };
  // const ctx: CanvasRenderingContext2D | null

  

  // CHAT GPT API
  // const chatApi = async (text: string) => {
  //   setMessages([...messages, { text: 'Typing...', sender: 'typing' }]);
  //   try {
  //     const response = await fetch('https://vidhya-nodejs.onrender.com/chat', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ message: text, language }),
  //     });
  //     const data = await response.json();
  //     setMessages((prevMessages) =>
  //       prevMessages.filter((msg) => msg.sender !== 'typing')
  //     );
  //     setMessages((prevMessages) => [
  //       ...prevMessages,
  //       { text: data.response, sender: 'ai' },
  //     ]);
  //   } catch (error) {
  //     console.error('Error fetching chat response:', error);
  //   }
  // };

  const chatApi = async (text: string) => {
    const typingMessage: Message = { text: '', sender: 'typing' };
    setMessages(prevMessages => [...prevMessages, typingMessage]);
    
    try {
      const response = await fetch('https://vidhya-nodejs.onrender.com/chat', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text, language }),
      });
      const data = await response.json();
      
      setMessages(prevMessages => {
        const newMessages = prevMessages.filter(msg => msg !== typingMessage);
        return [...newMessages, { text: data.response, sender: 'ai' }];
      });

      setIsAnjaliAnimating(true);

      const speech = new SpeechSynthesisUtterance(data.response);
    speech.lang = language === 'hi-IN' ? 'hi-IN' : 'en-US';
    window.speechSynthesis.speak(speech);

    speech.onend = () => {
      setIsAnjaliAnimating(false);
    };


    } catch (error) {
      console.error('Error fetching chat response:', error);
      setMessages(prevMessages => prevMessages.filter(msg => msg !== typingMessage));
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const languageOptions = [
    { value: 'en-IN', label: 'English' },
    { value: 'hi-IN', label: 'Hindi' },
  ];

  const handleStartRecording = () => {
    setIsRecording(true);
    resetTranscript();
    SpeechRecognition.startListening({ language });
  };

  const handleSubmitRecording = () => {
    setIsRecording(false);
    resetTranscript();
    const newMessage: Message = { text: transcript, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    chatApi(transcript);
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
    // setTranslatedText(transcript);
    // setMessages([...messages, { text: transcript, sender: 'user' }]);
  };

  
  const handleSendMessage = () => {
    if (input.trim() !== '') {
      const newMessage: Message = { text: input, sender: 'user' };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      chatApi(input);
      setInput('');
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
      const currentMessage = messages[index].text;
      const previousMessage = index > 0 ? messages[index - 1].text : '';
      
      const savedMessages = JSON.parse(localStorage.getItem('savedMessages') || '[]');
      savedMessages.push({ previous: previousMessage, current: currentMessage });
      localStorage.setItem('savedMessages', JSON.stringify(savedMessages));
      
      console.log('Saved messages:', savedMessages);
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
      <DashboardCard title="Anjali">
      <React.Fragment>
      <Box display="flex" flexDirection="column" alignItems="flex-start" width="100%">
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
            {/* <Button
              variant="contained"
              style={{ backgroundColor: '#1976d2', color: 'white' }}
              onClick={handleGeneratePDF}
            >
              Generate PDF
            </Button> */}
          </Box>
        </Box>
        <Grid container spacing={2}>
          {/* Left side: Chat section */}
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="column" height="68vh" style={{border:'none',boxShadow: 'none',outline:'none'}}>
              <Box flexGrow={1} overflow="auto" padding={2} component={Paper} style={{ ...paperStyle, display: 'flex', flexDirection: 'column' }}>
                {/* {messages.map((message, index) => (
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
                ))} */}
                {messages.map((message, index) => (
  <Box 
    key={index} 
    display="flex" 
    justifyContent={message.sender === 'ai' ? 'flex-start' : 'flex-end'}
    mb={2}
    position="relative"
    onMouseEnter={() => setHoveredMessageIndex(index)}
    onMouseLeave={() => setHoveredMessageIndex(null)}
  >
    {message.sender === 'typing' ? (
      <TypingAnimation />
    ) : (
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
        {hoveredMessageIndex === index && (
          <IconButton
            size="small"
            onClick={() => handleSaveMessage(index)}
            style={{
              position: 'absolute',
              top: '-10px',
              right: '-10px',
              backgroundColor: message.sender === 'ai' ? '#e0e0e0' : '#1976d2',
            }}
          >
            <SaveIcon fontSize="small" style={{ color: message.sender === 'ai' ? 'black' : 'white' }} />
          </IconButton>
        )}
      </Box>
    )}
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
                <img src={isAnjaliAnimating ? Anjali.src : AnjaliStatic.src}  alt="Anjali" style={{height:'300px',width:'300px',marginBottom:'20px',borderRadius:'50%'}}
                  />
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
                  onClick={handleOpenSketchDialog}
                  // disabled={!isRecording}
                  startIcon={<GestureIcon />}
                  style={{ marginBottom: '1rem', width: '200px' ,backgroundColor:'#ffb700',color:'white'}}
                >
                  Draw Sketch
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
                      onClick={handleSubmitRecording}
                      style={{ marginTop: '1rem' }}
                    >
                      Submit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleCancelRecording}
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
        </React.Fragment>
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
      <Dialog open={isSketchDialogOpen} onClose={handleCloseSketchDialog} maxWidth="md" fullWidth>
  <DialogTitle>Draw Your Sketch</DialogTitle>
  <DialogContent>
  {/* <CanvasDraw
  ref={canvasRef}
  brushColor="#000000"
  brushRadius={2}
  lazyRadius={0}
  canvasWidth={550}
  canvasHeight={400}
/> */}
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseSketchDialog} color="primary">
      Cancel
    </Button>
    {/* <Button onClick={handleSubmitSketch} color="primary">
      Submit
    </Button> */}
  </DialogActions>
</Dialog>
    </PageContainer>
  );
};

export default SamplePage;
