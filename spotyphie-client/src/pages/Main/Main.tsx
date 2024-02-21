import React, { useEffect, useState } from 'react';
import { Box, Button, Center, Flex, Grid, GridItem, Heading, Image } from '@chakra-ui/react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import { restUrl, authHeader, sessionHandler } from '../../config/configs';

const Main: React.FC = () => {
    const [forYou, setForYou] = useState<any[]>([]);
    const [topSongs, setTopSongs] = useState<any[]>([]);

    useEffect(() => {
        document.title = 'Spotyphie';

        const fetchData = async () => {
            try {
                
                const response = await axios.get(`${restUrl}/main`, authHeader);
                setForYou(response.data.for_you);
                setTopSongs(response.data.top_song);
                console.log(response.data);
            } catch (error : any) {
                console.error('Error fetching data:', error);
              
                sessionHandler(error.response.status);
            }
        };

        fetchData();
    }, []);

    const renderForYou = (fu: any[]): React.ReactNode[] => {
        return fu.map((item, index) => (
            <Button key={index} px={2} py={2} width="100%" height="fit-content" color="white" bgColor="black" onClick={() => {window.location.href = `/songPage?id=${item.song_id}`}}>
                <Image src={item.picture} maxHeight={{ base: '40px', lg: '60px' }} />
                Title : {item.title}
                <br />
                Artist : {item.artist}
            </Button>
        ));
    };

    const renderTopSongs = (ts: any[]): React.ReactNode[] => {
        return ts.map((item, index) => (
            <GridItem key={index} w="100%" p={6}>
                <Button px={2} py={2} height="fit-content" w="100%" maxH={{ base: '50px', lg: '150px' }} bgColor="#334F5B" color="white" onClick={() => {window.location.href = `/songPage?id=${item.song_id}`}}>
                    <Image src={item.picture} maxHeight={{ base: '20px', lg: '60px' }} justifySelf="left" />
                    Title : {item.title}
                    <br />
                    Artist: {item.artist}
                </Button>
            </GridItem>
        ));
    };

    return (
        <>
            <Navbar search="" />
            <Center>
                <Flex width="100%" alignItems="center" flexDir="column">
                    <Heading color="white" p="20px">
                        For You
                    </Heading>
                    <Box
                        overflowY="scroll"
                        maxH="200px"
                        maxW={{ base: '60%', lg: '100%' }}
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
                        }}
                    >
                        {renderForYou(forYou)}
                    </Box>

                    <Heading color="white" p="20px">
                        Top Songs
                    </Heading>
                    <Grid templateColumns={{ base: 'repeat(1, 2fr)', lg: 'repeat(3,2fr)' }} columnGap={6} w="80%">
                        {renderTopSongs(topSongs)}
                    </Grid>
                </Flex>
            </Center>
        </>
    );
};

export default Main;
