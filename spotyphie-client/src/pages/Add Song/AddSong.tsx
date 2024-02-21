import React, { useState, useRef } from 'react';
import { Box, Button, ButtonGroup, HStack, Heading, Image, VStack, Text, Input, Modal, ModalBody, ModalCloseButton, 
  ModalOverlay, ModalContent, ModalHeader, FormControl, FormLabel, ModalFooter, useDisclosure } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auto } from '@popperjs/core';
import Navbar from "../../components/Navbar/Navbar";

interface AddSongState {
    SongDetails : {
        song_id: number;
        title: string;
        artist: string;
        genre: string;
        audio: string;
        picture: string;
    }[];
}

function AddSong() {
    const [songDetails, setsongDetails] = useState<AddSongState[]>([]);
    const [newTitle, setNewTitle] = useState('');
    const [newArtist, setNewArtist] = useState('');
    const [newGenre, setNewGenre] = useState('');
    const [newAudio, setNewAudio] = useState('');
    const [newPicture, setNewPicture] = useState('');

    function addNewSong(title : string = 'Song Title', artist : string = 'artist', genre : string = 'genre', audioSrc :  string = '', pictureSrc : string = './logo_spotyphie.png') {
        const newSongData = {
            song_id : songDetails.length,
            title: title,
            artist: artist,
            genre: genre,
            audioSrc: audioSrc,
            pictureSrc: pictureSrc,
        }
        let songDet = [...songDetails, newSongData]
        // setsongDetails(songDet);
    }

    return (
        <>
        <Navbar search =''/>
        <VStack justifyContent='center' paddingTop='50px' spacing='24px'>
        <Heading color='white'>Add Song</Heading>
        <HStack spacing='35px' w='70%'>
          
        </HStack>
        <VStack my="auto" mx="auto">
            <FormControl isRequired>
                <FormLabel color='white'>Song title</FormLabel>
                <Input type='text' name='songTitle' w='500px' variant='filled' color='white' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
            </FormControl>
            <FormControl isRequired>
                <FormLabel color='white'>Artist</FormLabel>
                <Input type='text' name='artist' w='500px' variant='filled' color='white' value={newArtist} onChange={(e) => setNewArtist(e.target.value)} />
            </FormControl>
            <FormControl isRequired>
                <FormLabel color='white'>Genre</FormLabel>
                <Input type='text' name='artist' w='500px' variant='filled' color='white' value={newGenre} onChange={(e) => setNewGenre(e.target.value)} />
            </FormControl>
        </VStack>
        <Box>
            <VStack spacing='20px'>
                <Button margin='0px'>Add playlist audio</Button>
                <Image src='' alt='Playlist audio' color='white' maxHeight='100px'/>
                <Input type="file" id="audioInput" accept="audio/*" style={{ display: 'none' }} onChange={(e) => setNewAudio(e.target.value)}/>
            </VStack>
        </Box>
        <Box>
            <VStack spacing='20px'>
                <Button margin='0px'>Add playlist image</Button>
                <Image src='' alt='Playlist image' color='white' maxHeight='100px'/>
            </VStack>
        </Box>
        <Button colorScheme='green'>Submit</Button>
      </VStack>
    </>
  );
}

export default AddSong;
