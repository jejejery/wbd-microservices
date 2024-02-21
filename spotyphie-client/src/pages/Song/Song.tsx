import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { restUrl, authHeader, sessionHandler} from '../../config/configs';
import { Box, Button, ButtonGroup, Flex, Spacer, Heading, Image, VStack , Text, Input, Modal, ModalBody, ModalCloseButton, 
        ModalOverlay, ModalContent, ModalHeader, FormControl, FormLabel, ModalFooter, useDisclosure, Slide,  } from '@chakra-ui/react';
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

function getQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function SongPage() {
    let query = getQuery();
    const [songsRenderer, setSongsRenderer] = useState<React.ReactNode[]>([]);
    const [displayPrevBtn, setDisplayPrevBtn] = useState('visible');
    const [displayNextBtn, setDisplayNextBtn] = useState('visible');
    const [currPage, setCurrPage] = useState(1);
    const [currPageContent, setCurrPageContent] = useState([]);
    const [prevPageContent, setPrevPageContent] = useState([]);
    const [nextPageContent, setNextPageContent] = useState([]);
    const [curr_id, setCurrID] = useState(-1);
    const [ownedSongsID, setOwnedSongsID] = useState([]);
    

    const getNextPage = async () => {
        try {
          var res;
          if (curr_id !== -1) {
            res = await axios.get(`${restUrl}/getPremSongPageByID?id=${curr_id+6}&size=3`, authHeader);
            setCurrID(curr_id+3);
          } else {
            res = await axios.get(`${restUrl}/getPremSongPage?num=${currPage + 2}&size=3`, authHeader);
            setCurrPage(currPage + 1);
          }
          setPrevPageContent(currPageContent);
          setCurrPageContent(nextPageContent);
          setNextPageContent(res.data);
          setDisplayPrevBtn('visible');
        } catch(e : any){
          console.log(e);
          sessionHandler(e.response.status);
        } 
    }

    const getPrevPage = async () => {
      try {
        console.log('cek prev page');
        var res;
        if (curr_id !== -1) {
          res = await axios.get(`${restUrl}/getPremSongPageByID?id=${curr_id-6}&size=3`, authHeader);
          setCurrID(curr_id-3);
        } else {
          if (currPage > 1) {
            res = await axios.get(`${restUrl}/getPremSongPage?num=${currPage - 1}&size=3`, authHeader);
            setCurrPage(currPage-1);
          } else {
            res = {data : []};
          }
        }
        setNextPageContent(currPageContent);
        setCurrPageContent(prevPageContent);
        setPrevPageContent(res.data);
      } catch(e : any){
        console.log(e);
        sessionHandler(e.response.status);
      } 
  }

    useEffect(() => {
      const init = async () => {
        try {
          var res;
          var id = query.get("id");
          var useID = (id !== undefined && id !== "" && id !== null);
          const idArr = (await axios.get(`${restUrl}/getOwnedPremSong?uID=${localStorage.getItem('user_id')}`, authHeader)).data;
          setOwnedSongsID(idArr.map(item => item.song_id));
          if (!useID) {
            res = await axios.get(`${restUrl}/getPremSongPage?num=${currPage}&size=3`, authHeader);
            if (res.data.length === 0) {
              alert('No premium song found');
            } else {
              setCurrPageContent(res.data);
              setSongsRenderer(renderSongsList(res.data, ownedSongsID));
              setDisplayPrevBtn('hidden');
              let resNext = await axios.get(`${restUrl}/getPremSongPage?num=${currPage+1}&size=3`, authHeader);
              setNextPageContent(resNext.data);
              if (resNext.data.length === 0) {
                setDisplayNextBtn('hidden');
              }
            }
          } else {
            if (Number(id) >= 0) {
              res = await axios.get(`${restUrl}/getPremSongPageByID?id=${id}&size=3`, authHeader);
              if (res.data.length === 0) {
                alert('No premium song with ID ' + Number(id) + ' found');
              } else {
                let minID = Number(id);
                for (let key in res.data) {
                  if (res.data[key].song_id < minID) {
                    minID = res.data[key].song_id;
                  }
                }
                setCurrID(minID);
                setCurrPageContent(res.data);
                setSongsRenderer(renderSongsList(currPageContent, ownedSongsID));
                let resNext = await axios.get(`${restUrl}/getPremSongPageByID?id=${Number(id)+3}&size=3`, authHeader);
                setNextPageContent(resNext.data);
                if (resNext.data.length === 0) {
                  setDisplayNextBtn('hidden');
                }
                var resPrev = {data : []};
                if (Number(id)-3 >= 0) {
                  resPrev = await axios.get(`${restUrl}/getPremSongPageByID?id=${Number(id)-3}&size=3`, authHeader);
                  setPrevPageContent(resPrev.data);
                }
                if (resPrev.data.length === 0) {
                  setDisplayPrevBtn('hidden');
                }
              }
              setSongsRenderer(renderSongsList(res.data, ownedSongsID));
            } else {
              alert('Invalid ID (< 0)');
            }
          } 
        } catch(e : any){
              console.log(e);
              sessionHandler(e.response.status);
        }
          
      };

      init();
      
    }, []);

    useEffect(() => {
      console.log(ownedSongsID);
      setSongsRenderer(renderSongsList(currPageContent, ownedSongsID));
    }, [currPageContent]);

    useEffect(() => {
      if (nextPageContent.length === 0) {
        setDisplayNextBtn('hidden');
      } else {
        setDisplayNextBtn('visible');
      }
    }, [nextPageContent]);

    useEffect(() => {
      if (prevPageContent.length === 0) {
        setDisplayPrevBtn('hidden');
      } else {
        setDisplayPrevBtn('visible');
      }
    }, [prevPageContent]);

    const buySong = async (item : any) => {
      const prevSaldo = Number(localStorage.getItem('credits'));
      if (prevSaldo < item.price) {
        alert('Saldo tidak cukup untuk membeli lagu');
      } else {
        const buyReq = {
          uID : Number(localStorage.getItem('user_id')), 
          sID : item.song_id,
          prevCredit : prevSaldo,
          songPrice : item.price}
        const buyResponse = await axios.put(`${restUrl}/buyPremSong`, buyReq);
        if (buyResponse.status === 200) {
          localStorage.setItem('credits', String(prevSaldo-item.price));
          alert(`Pembelian lagu ${item.title} berhasil`);
        } else {
          alert('Pembelian lagu gagal');
        }
      }
    }

    const renderSongsList = (sl : any[], ownedSongsID : any): React.ReactNode[] => {
      var result = [];
      for (const item of sl) {
        result.push(
          <>
          <VStack px='20px' py='30px' maxH='600px'>
            <Image src={item.picture} alt='Prev song image' maxHeight='600px' fallbackSrc='./logo_spotyphie.png'
                    borderRadius='full' boxSize='200px' objectFit='cover' />
            <VStack spacing='20px'>
                <Heading color='white'>{item.title}</Heading>
                <Text color='white' fontSize='lg'>{item.artist}</Text>
                <Text color='white' fontSize='lg'>Price : Rp. {item.price},-</Text>
                { ownedSongsID.includes(item.song_id) ? <audio src={item.audio} controls></audio> : 
                            <Button colorScheme='green' marginTop='20px' onClick={() => {
                              buySong(item);
                            }}>Buy</Button>}
            </VStack>
          </VStack>
          <Spacer />
          </>);
      }
      return result;
    }
    
    
    return (
        <>
        <Navbar search=''/>
        <VStack justifyContent='center' paddingTop='50px' spacing='24px'>
            <Flex flexDir='row' w='100%' alignItems='center' justifyContent='center'>
                <Button h='70px' w='70px' bgColor='#334F5B' color='white' onClick={getPrevPage} visibility={displayPrevBtn}>{"<"}</Button>
                <Spacer />  
                  {songsRenderer}
                <Spacer />
                <Button h='70px' w='70px' bgColor='#334F5B' color='white' onClick={getNextPage} visibility={displayNextBtn}>{">"}</Button>
            </Flex>
        </VStack>
        
        {/* <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Song</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Song title</FormLabel>
              <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Song author</FormLabel>
              <Input value={newAuthor} onChange={(e) => setNewAuthor(e.target.value)} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Song author</FormLabel>
              <Input value={newSrc} onChange={(e) => setNewSrc(e.target.value)} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => {
                    addSong(newTitle, newAuthor, newSrc);
                    setNewTitle('');
                    setNewAuthor('');
                    setNewSrc('');
                }}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
        </>
    )
}

export default SongPage;