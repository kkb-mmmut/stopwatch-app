import { Button, Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';

const useStyles = makeStyles({
  stopwatch: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    height: '100%',
    width:'50%',
    opacity:1,
    margin:'0px auto', 
    
    backgroundImage: (props) => `url(${props.backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    transition: 'background-image 0.5s ease-in-out',
  },
  title:{
    color:'white'
  },
  time: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    color:'white'
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: '0 10px',
    textTransform: 'uppercase',
  },
  buttonStart: {
    backgroundColor: 'green',
    color: 'white',
    '&:hover': {
      backgroundColor: 'darkgreen',
    },
  },
  buttonStop: {
    backgroundColor: 'red',
    color: 'white',
    '&:hover': {
      backgroundColor: 'darkred',
    },
  },
  buttonReset: {
    backgroundColor: 'orange',
    color: 'white',
    '&:hover': {
      backgroundColor: 'darkorange',
    },
  },
});

function Stopwatch() {
  const classes = useStyles({ backgroundImage: getImageUrl() });
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) {
        if (seconds === 59) {
          setSeconds(0);
          if (minutes === 59) {
            setMinutes(0);
            setHours((hours) => hours + 1);
          } else {
            setMinutes((minutes) => minutes + 1);
          }
        } else {
          setSeconds((seconds) => seconds + 1);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, seconds, minutes, hours]);

  function handleStart() {
    setIsRunning(true);
  }

  function handleStop() {
    setIsRunning(false);
  }

  function handleReset() {
    setIsRunning(false);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  }

  function getImageUrl() {
    const now = new Date();
    const minutes = now.getMinutes();
    const imageName = minutes % 2 === 0 ? '1000/800' : '1000/800';
    return `https://random.imagecdn.app/${imageName}`;
  } 

  return (
    <Card className={classes.stopwatch}> 
      <CardContent>
        <Typography variant="h4" className={classes.title}>Stopwatch</Typography> 
          <Typography variant="h2" className={classes.time}>
            {hours < 10 ? '0' + hours : hours}:
            {minutes < 10 ? '0' + minutes : minutes}:
            {seconds < 10 ? '0' + seconds : seconds}
          </Typography>
          <div className={classes.buttonContainer}>
            {isRunning ? (
              <Button
                variant="contained"
                className={`${classes.button} ${classes.buttonStop}`}
                onClick={handleStop}
              >
                Stop
              </Button>
            ) : (
              <Button
                variant="contained"
                className={`${classes.button} ${classes.buttonStart}`}
                onClick={handleStart}
              >
                Start
              </Button>
            )}
            <Button
              variant="contained"
              className={`${classes.button} ${classes.buttonReset}`}
              onClick={handleReset}
            >
              Reset
            </Button>
          </div> 
      </CardContent> 
    </Card>
  );
  
            }
    export default Stopwatch;  