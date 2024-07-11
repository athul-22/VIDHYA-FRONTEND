'use client';

import React, { useState, useEffect, useRef, MouseEvent } from 'react';
import {
  Typography, Box, TextField, Button, Paper, IconButton, Menu, MenuItem,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Select, FormControl, InputLabel, SelectChangeEvent
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

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
    { text: 'Can you tell me more about your services?', sender: 'user' },
  ]);

  const [input, setInput] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<{ target: HTMLElement | null, index: number | null }>({ target: null, index: null });
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>('English');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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

  const handleMenuClick = (event: MouseEvent<HTMLElement>, index: number) => {
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
    setLanguage(event.target.value as string);
  };

  const handleGeneratePDF = () => {
    console.log('Generate PDF');
  };

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
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Hindi">Hindi</MenuItem>
                <MenuItem value="Kannada">Kannada</MenuItem>
                <MenuItem value="Tamil">Tamil</MenuItem>
                <MenuItem value="Malayalam">Malayalam</MenuItem>
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
        <Box display="flex" flexDirection="column" height="60vh" style={{border:'none',boxShadow: 'none',outline:'none'}}>
          <Box flexGrow={1} overflow="auto" padding={2} component={Paper} style={{ ...paperStyle, display: 'flex', flexDirection: 'column-reverse' }}>
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
            <IconButton>
              <MicIcon />
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
