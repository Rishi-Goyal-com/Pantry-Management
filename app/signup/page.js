'use client'
import React, { useEffect, useState } from 'react';
import { auth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { Box, Stack, Typography, Button, Modal, TextField, IconButton } from '@mui/material';

export default function SignUp() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // Redirect to pantry management page if user is authenticated
        router.push('/pantry');
      } else {
        // Redirect to home if no user is authenticated
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [router]);

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
      <source src="https://lottie.host/fc606277-fd4b-4e62-9338-f5433b434349/heQnqUODqv.json" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  
</Box>

  
  );
}
