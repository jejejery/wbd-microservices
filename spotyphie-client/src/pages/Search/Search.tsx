import React, { useEffect, useState } from 'react';
import { Box, Button, Center, Flex, Grid, GridItem, Heading, Image } from '@chakra-ui/react';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';
import { restUrl, authHeader } from '../../config/configs';

const Search: React.FC = () => {
    const [songRenderer, setSongRenderer] = useState<React.ReactNode[]>([]);

    const renderSongs = (sl: any[]): React.ReactNode[] => {
        return sl.map((song, index) => (
            <GridItem key={index} w="100%" p={6}>
                <Button
                    px={2}
                    py={2}
                    height="fit-content"
                    w="100%"
                    maxH={{ base: '50px', lg: '150px' }}
                    bgColor="#334F5B"
                    color="white"
                    onClick={() => {
                        window.location.href = `/songPage?id=${song.song_id}`;
                    }}
                >
                    <Image src={`${song.picture}`} maxHeight={{ base: '20px', lg: '60px' }} justifySelf="left" />
                    Title : {song.title}
                    <br />
                    Artist : {song.artist}
                </Button>
            </GridItem>
        ));
    };

    useEffect(() => {
        const init = async () => {
            try {
                const params = new URLSearchParams(window.location.search);
                const paramsObj = Object.fromEntries(params.entries());
                const res = await axios.get(`${restUrl}/search?title=${paramsObj.title}`, authHeader);
                setSongRenderer(renderSongs(res.data));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        init();
    }, []); 

    return (
        <>
            <Navbar search="" />
            <Center>
                <Flex width="100%" alignItems="center" flexDir="column">
                    <Heading color="white" p="20px">
                        Result:
                    </Heading>
                    <Grid templateColumns={{ base: 'repeat(1, 2fr)', lg: 'repeat(3,2fr)' }} columnGap={6} w="80%">
                        {songRenderer}
                    </Grid>
                </Flex>
            </Center>
        </>
    );
};

export default Search;
