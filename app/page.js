'use client'
import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Box, Stack, Typography, Button, Modal, TextField, IconButton } from '@mui/material';
import Fingerprint from '@mui/icons-material/Fingerprint';


export default function Home() {
  const router = useRouter();
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  };
  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // Redirect to sign-up page if sign-in is successful
      router.push('/signup');
    } catch (error) {
      console.error("Error during sign-in:", error.message);
    }
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={2}
    >
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      >
        <source src="https://cdn.pixabay.com/video/2017/06/05/9584-220312371_large.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    <Box
      border={'1px solid #333'}
      padding={'10px'}
      boxShadow={'5px 10px 8px #888888'}
      sx={{ fontFamily: 'Bradley Hand ITC, cursive' }}
    >
      <Box
        width="800px"
        height="100px"
        sx={{
          background: 'linear-gradient(90deg, #00DBDE, #FC00FF)',
        }}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        borderBottom={'4px solid black'}
      >
        <Typography
          variant={'h2'}
          color={'#333'}
          textAlign={'center'}
          sx={{ fontFamily: 'Bradley Hand ITC, cursive', fontWeight: 'bold' }}
        >
          Authenticate with Google
        </Typography>
        <IconButton aria-label="fingerprint" color="black" onClick={handleSignIn} >
        <Fingerprint style={{ fontSize: 50 }}/>
      </IconButton>
      </Box>
    </Box>
  </Box>


    //<div>
      //<h1>Home Page</h1>
      //<button onClick={handleSignIn}>Sign In with Google</button>
    //</div>
  
  );
}
