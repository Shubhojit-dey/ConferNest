import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, CardActions, Typography, Button, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import axios from 'axios';

export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        setMeetings(history);
      } catch (error) {
        console.error("Error fetching meeting history:", error);
      }
    };
    fetchHistory();
  }, [getHistoryOfUser]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Delete a specific meeting history
  const handleDeleteMeeting = async (meetingCode) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/users/delete_meeting`, {
        data: { token: localStorage.getItem("token"), meeting_code: meetingCode }
      });
      setMeetings((prevMeetings) => prevMeetings.filter((m) => m.meetingCode !== meetingCode));
    } catch (error) {
      console.error("Error deleting meeting:", error);
    }
  };

  // Delete all meeting history for the user
  const handleDeleteAllHistory = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/users/delete_all_activity`, {
        data: { token: localStorage.getItem("token") }
      });
      setMeetings([]);
    } catch (error) {
      console.error("Error deleting all history:", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header with Home button, title, and Delete All History button */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate('/home')}>
          <HomeIcon fontSize="large" />
        </IconButton>
        <Typography variant="h4" sx={{ ml: 2 }}>
          Meeting History
        </Typography>
        <Button variant="contained" color="error" sx={{ ml: 'auto' }} onClick={handleDeleteAllHistory}>
          Delete All History
        </Button>
      </Box>
      {/* Grid layout using Box with CSS grid */}
      {meetings.length > 0 ? (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 2,
          }}
        >
          {meetings.map((meeting, index) => (
            <Card key={index} variant="outlined" sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6">
                  Meeting Code: {meeting.meetingCode}
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  Date: {formatDate(meeting.date)}
                </Typography>
              </CardContent>
              <CardActions>
                {/* <Button size="small" onClick={() => navigate(`/meeting/${meeting.meetingCode}`)}>
                  View Details
                </Button> */}
                <Button size="small" color="error" onClick={() => handleDeleteMeeting(meeting.meetingCode)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      ) : (
        <Typography variant="body1">No meeting history available.</Typography>
      )}
    </Box>
  );
}
