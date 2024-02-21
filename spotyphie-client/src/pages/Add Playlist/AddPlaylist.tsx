import React, { useState, useRef } from 'react';
import { Box, Button, ButtonGroup, HStack, Heading, Image, VStack , Text, Input, Modal, ModalBody, ModalCloseButton, 
        ModalOverlay, ModalContent, ModalHeader, FormControl, FormLabel, ModalFooter, useDisclosure,  } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "../../components/Navbar/Navbar";


interface addPlaylistState {
    songsList : {
        id : number;
        title : string;
        author : string;
        imageSrc : string;
    }[];
};

function AddPlaylist() {
    const [songsList, setSongsList] = useState([])
    const [newTitle, setNewTitle] = useState('');
    const [newAuthor, setNewAuthor] = useState('');
    const [newSrc, setNewSrc] = useState('');

    function addSong(title : string = 'Song Title', author : string = 'author', imageSrc : string = './logo_spotyphie.png') {
        const newSongData = {
            id : songsList.length,
            title : title,
            author : author,
            imageSrc : imageSrc
        }
        // setSongsList([...songsList, newSongData]);
    }
    
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
        <Navbar search =''/>
        <VStack justifyContent='center' paddingTop='50px' spacing='24px'>
            <Heading color='white'>Add Your Playlist</Heading>
            <HStack spacing='35px' w='70%'>
                <Box border='1px solid black' px='20px' py='30px' bgColor='#334F5B'>
                    <VStack spacing='20px'>
                        <Image src='./logo_spotyphie.png' alt='Playlist image' maxHeight='100px'/>
                        <Button margin='0px'>Add playlist image</Button>
                    </VStack>
                </Box>
                <ButtonGroup border='1px solid black' padding='20px' spacing='20px' width='100%' minH='275px' maxH='275px'
                        bgColor='#334F5B' overflowX='scroll' css={{
                                            '&::-webkit-scrollbar': {
                                                width: '10px',
                                            },
                                            '&::-webkit-scrollbar-track': {
                                                background: '#1E2930',
                                                width: '14px',
                                            },
                                            '&::-webkit-scrollbar-thumb': {
                                                background: 'black',
                                                borderRadius: '24px',
                                            },
                                            }}>
                    { songsList.map((element : any) => { 
                        return (
                            <Button bgColor='white' p='20px' key={element.id} minH='200px' minW='150px' maxH='200px' maxW='150px'>
                                <VStack spacing='15px'>
                                    <Image src={element.imageSrc} alt='Song image' fallbackSrc='./logo_spotyphie.png' 
                                            objectFit='cover' maxHeight='100px' borderRadius='full' boxSize='100px'/>
                                    <Text>{element.title}</Text>
                                    <Text>{element.author}</Text>
                                </VStack>
                            </Button>
                        );
                    })}
                </ButtonGroup>
                <Button colorScheme='green' p='20px' onClick={onOpen}>Add songs</Button>
            </HStack>
            <Text color='white'>Playlist Name</Text>
            <Input type='text' name='playlistName' w='50%' bgColor='white'></Input>
            <Button colorScheme='green'>Submit</Button>
        </VStack>
        
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Song</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Song title</FormLabel>
              <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Song author</FormLabel>
              <Input value={newAuthor} onChange={(e) => setNewAuthor(e.target.value)} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Song image</FormLabel>
              <Input value={newSrc} onChange={(e) => setNewSrc(e.target.value)} />
            </FormControl>
            <Text id='success'>Song added successfully</Text>
            <Text id='error' color='red'>There was an error while adding the song</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => {
                    addSong(newTitle, newAuthor, newSrc);
                    setNewTitle('');
                    setNewAuthor('');
                    setNewSrc('');
                    onClose();
                }}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        </>
    )
}

export default AddPlaylist;