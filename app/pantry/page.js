'use client';
import Link from 'next/link'; 
import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography, Button, Modal, TextField, IconButton } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { auth, firestore } from '@/firebase';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import PostAddIcon from '@mui/icons-material/PostAdd';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  //boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

export default function Pantry() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');

  const updateInventory = async () => {
    const user = auth.currentUser;
    if (!user) return; // Ensure the user is signed in
    const userDocRef = doc(firestore, 'users', user.uid);
  const itemsCollectionRef = collection(userDocRef, 'items');
    
  const snapshot = query(itemsCollectionRef);
  const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() });
    });
    setInventory(inventoryList);
  };

  const addItem = async (item) => {
    const user = auth.currentUser;
    if (!user) return; // Ensure the user is signed in

    const userDocRef = doc(firestore, 'users', user.uid);
    const itemDocRef = doc(collection(userDocRef, 'items'), item);
    const itemSnap = await getDoc(itemDocRef);
  if (itemSnap.exists()) {
    const { quantity } = itemSnap.data();
    await setDoc(itemDocRef, { quantity: quantity + 1 });
  } else {
    await setDoc(itemDocRef, { quantity: 1 });
  }
  await updateInventory();
};

  const removeItem = async (item) => {
    const user = auth.currentUser;
  if (!user) return; // Ensure the user is signed in

  const userDocRef = doc(firestore, 'users', user.uid);
  const itemDocRef = doc(collection(userDocRef, 'items'), item);

  const itemSnap = await getDoc(itemDocRef);
  if (itemSnap.exists()) {
    const { quantity } = itemSnap.data();
    if (quantity === 1) {
      await deleteDoc(itemDocRef);
    } else {
      await setDoc(itemDocRef, { quantity: quantity - 1 });
    }
  }
  await updateInventory();
};

  const deleteItem = async (item) => {
    const user = auth.currentUser;
  if (!user) return; // Ensure the user is signed in

  const userDocRef = doc(firestore, 'users', user.uid);
  const itemDocRef = doc(collection(userDocRef, 'items'), item);

  const itemSnap = await getDoc(itemDocRef);
  if (itemSnap.exists()) {
    const { quantity } = itemSnap.data();
    
      await deleteDoc(itemDocRef);
    
  }
  await updateInventory();
};

  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6">Add Item</Typography>
          <Stack direction={'row'} spacing={2}>
            <TextField
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName);
                setItemName('');
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>

      
      

      <Box
        border={'1px solid #333'}
        padding={'10px'}
        boxShadow={'5px 10px 8px #888888'}
        sx={{ fontFamily: 'Bradley Hand ITC, cursive' ,backgroundColor: 'rgba(0, 0, 0, 0.2)',}}
        
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
          paddingLeft={"180px"}
        >
          <Box justifyContent={'center'}
          alignItems={'center'}>
            <Typography
            variant={'h2'}
            color={'#333'}
            textAlign={'center'}
            sx={{ fontFamily: 'Bradley Hand ITC, cursive', fontWeight: 'bold' ,paddingRight:'20px'}}
          >
            Pantry Items
          </Typography>
          </Box>
          <Box sx={{paddingRight:'100px'}}>
          <IconButton  onClick={handleOpen}>
        <PostAddIcon style={{fontSize:50 }}/>
      </IconButton>
          </Box>
          
      <Box display="flex" textAlign={'right'} marginRight={'0px'} justifyContent={'left'}
          alignItems={'left'}>
      <Link href="/signup" passHref>
      <IconButton>
        <LoginIcon style={{fontSize:50 }}/>
      </IconButton>
      </Link>
      </Box>
      
        </Box>

        <Stack width="800px" height="300px" spacing={1} overflow={'auto'}>
          {inventory.map(({ name, quantity }) => (
            <Box
              key={name}
              width="100%"
              minHeight="50px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ background: 'linear-gradient(180deg, #D9AFD9, #97D9E1)' }}
              paddingX={5}
            >
              <Typography
                variant="h3"
                color="#333"
                fontSize="30px"
                sx={{ fontFamily: 'Bradley Hand ITC, cursive', fontWeight: 'bold' }}
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Box display="flex">
                <IconButton onClick={() => addItem(name)}>
                  <AddCircleIcon />
                </IconButton>
                <Typography
                  variant="h3"
                  color="#333"
                  fontSize="20px"
                  sx={{
                    width: '40px',
                    padding: '10px',
                    margin: 'auto 10px',
                    textAlign: 'center',
                  }}
                >
                  {quantity}
                </Typography>
                <IconButton onClick={() => removeItem(name)}>
                  <RemoveCircleOutlineIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => deleteItem(name)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
