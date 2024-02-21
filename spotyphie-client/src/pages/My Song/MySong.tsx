import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Button, Center, Flex, Grid, GridItem, Heading, Image, Text, chakra, color } from '@chakra-ui/react'
import Navbar from "../../components/Navbar/Navbar";
import { restUrl, authHeader, sessionHandler } from '../../config/configs';
import axios from 'axios';


const MySong: React.FC<any> = () => {
    const [mySongsList, setMySongsList] = useState<React.ReactNode[]>([]); 
    
    const getSongsList = (ms : any[]) => {
        return ms.map((item,index) => (
            <Button px={2} py={2} width='100%' height='fit-content' color='white' bgColor='black' onClick={() => {window.location.href = `/songPage?id=${item.song_id}`}}>
                <Image src={item.picture}
                    maxHeight={{ base: "40px", lg: "60px" }}
                    />
                Title : {item.title}<br/>
                Artist : {item.artist}
            </Button>
        ))
    }

    useEffect(() => {
        const init = async () => {
          try {
            var res = await axios.get(`${restUrl}/getOwnedPremSong?uID=${localStorage.getItem('user_id')}`, authHeader);
            setMySongsList(getSongsList(res.data));
          } catch(e : any){
            console.log(e);
            sessionHandler(e.response.status);
          }
            
        };
  
        init();
        
      }, []);

    return (
        <>
        <Navbar search =''/>
        <Center>
            <Flex width='100%' alignItems='center' flexDir='column'>
                <Heading color='white' p='20px'>My Song</Heading>
                <Box overflowY='scroll' maxH='350px' 
                                        maxW={{base : '60%', lg:'100%'}}
                                        css={{
                                            '&::-webkit-scrollbar': {
                                                width: '10px',
                                            },
                                            '&::-webkit-scrollbar-track': {
                                                width: '14px',
                                            },
                                            '&::-webkit-scrollbar-thumb': {
                                                background: '#334F5B',
                                                borderRadius: '24px',
                                            },
                                            }}>
                    {mySongsList}
                </Box>
            </Flex>
        </Center>
        </>
    )
}

export default MySong;