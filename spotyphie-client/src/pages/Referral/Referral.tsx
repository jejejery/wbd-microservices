import React, { useEffect, useState } from 'react';
import { Box, Button, Center, Flex, Grid, GridItem, Heading, Image, Text, chakra, FormControl, Input } from '@chakra-ui/react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { restUrl, authHeader, sessionHandler} from '../../config/configs';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';
import _ from 'lodash';
import CookieManager from '../../auth/cookie';

const Referral: React.FC<any> = () => {
    const [searchRenderer, setSearchRenderer] = useState<React.ReactNode[]>([]);
    const [recommendRenderer, setRecommendRenderer] = useState<React.ReactNode[]>([]);

    const [search, setSearch] = useState<string>('');

    const debouncedSearch = _.debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSearch(event.target.value);
    }, 700);


    
    function handleClickSong(id: number, title: string){
        try {
            const confirmed = window.confirm(`Are you sure want to choose this song (${title})?`);
            if (!confirmed) {
                return;
            }
            let res = axios.post(`${restUrl}/referralPage/addSong`, { song_id: id }, authHeader);
            alert('premium song succesfuly added to your song list!');
            localStorage.removeItem('referral');
            window.location.href = `/songPage?id=${id}`;
        } catch (error) {
            alert('bad session');
            console.error(error);
        }
    }

    const renderRecomendation = (rec: any[]): React.ReactNode[] => {
        return rec.map((item, index) => (
                        <Flex
                            px={2}
                            py={2}
                            width="100%"
                            height="fit-content"
                            color="white"
                            bgColor="black"
                            justifyContent="space-between"
                        >
                            <Flex>
                                <Image src={item.picture} maxHeight={{ base: '40px', lg: '60px' }} />
                                <chakra.div>
                                Title : {item.title}
                                <br />
                                Artist : {item.artist}
                                </chakra.div>
                            </Flex>
                            <chakra.div height="100%" paddingRight={2} paddingTop={2}>
                                <chakra.div fontSize="4xl" height="100%" onClick={() => handleClickSong(item.song_id, item.title)}>
                                    <IoMdAddCircleOutline color="white" />
                                </chakra.div>
                            </chakra.div>
                        </Flex>
        ));
    };

    const renderSearch = (sc: any[]): React.ReactNode[] => {
        return sc.map((item, index) => (
                    <GridItem w="100%" p={6}>
                    <Button
                        px={2}
                        py={2}
                        height="fit-content"
                        w="100%"
                        maxH={{ base: '50px', lg: '150px' }}
                        bgColor="#334F5B"
                        color="white"
                        onClick={() => handleClickSong(item.song_id, item.title)}
                    >
                        <Image
                            src="./logo_spotyphie.png"
                            maxHeight={{ base: '20px', lg: '60px' }}
                            justifySelf="left"
                        />
                        Title : {item.title}
                        <br />
                        Artist : {item.artist}
                    </Button>
                    </GridItem>
        ));
    };


    useEffect(() => {
        const init = async () => {

            try{
                const params = new URLSearchParams(window.location.search);
                const paramsObj = Object.fromEntries(params.entries());
                console.log(paramsObj.title);
                console.log(CookieManager.readCookie('token'))
                const res = await axios.get(`${restUrl}/referralPage?title=${paramsObj.title}`, authHeader);
                if(localStorage.getItem('referral') !== 'true'){
                    alert('ups, kamu belum meredeem referral code!');
                    window.location.href = '/';
                    return;
                }
                setRecommendRenderer(renderRecomendation(res.data.recomendations));
                setSearchRenderer(renderSearch(res.data.search));
            }
            catch(e : any){
                console.log(e);
                sessionHandler(e.response.status);
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
                        Choose Your Premium Song
                    </Heading>

                    <Text color="white" fontSize={{ base: '2xl', lg: '4xl' }}>
                        {' '}
                        Our Recomendations:
                    </Text>
                    <Box
                        overflowY="scroll"
                        maxH="300px"
                        maxW={{ base: '80%', lg: '100%' }}
                        width="60%"
                    >
                    {recommendRenderer}
                    </Box>

                    <Heading color="white" p="20px">
                        Or search for the song...
                    </Heading>
                    <Flex>
                        <form>
                            <FormControl>
                                <Input
                                    type="text"
                                    w="100%"
                                    variant="filled"
                                    color="white"
                                    placeholder="search..."
                                    height="90%"
                                    onChange={debouncedSearch}
                                ></Input>
                            </FormControl>
                        </form>
                    </Flex>
                    <Grid
                        templateColumns={{ base: 'repeat(1, 2fr)', lg: 'repeat(3,2fr)' }}
                        columnGap={6}
                        w="80%"
                    >
                      {searchRenderer}  
                    </Grid>
                </Flex>
                {search !== '' ? (window.location.href = `/referral?title=${search}`) : null}
            </Center>
        </>
    );
};

export default Referral;
