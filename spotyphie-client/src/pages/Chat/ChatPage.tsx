import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { Box, Button, Center, Flex, Grid, GridItem, Input, Avatar, Text } from '@chakra-ui/react';
import logoSpotyphie from '../../assets/logo_spotyphie.png';
import Navbar from "../../components/Navbar/Navbar";
import axios from 'axios';
import { restUrl, authHeader } from '../../config/configs';
import { TimeLike } from 'fs';

interface ChatMessage {
  isSender: boolean;
  chat_time: TimeLike;
  content: string;
}

interface ChatPageState {
  messages: ChatMessage[];
  newMessage: string;
  activeChatRoom: string;
}

// "isSender": msgArray[i].sender_id === sender,
//             "chat_time": msgArray[i].chat_time,
//             "content": msgArray[i].content,


const SendMessage: React.FC<any> = ({ content }) => (
  <Flex marginRight="auto" padding={3}>
    <Box bg="#0084FF" color="white" borderRadius="8px" p={2} maxWidth="200px">
      { content }
    </Box>
  </Flex>
);

const ReceiveMessage: React.FC<any> = ({ content }) => (
  <Flex marginLeft="auto" padding={3}>
    <Box bg="white" color="black" borderRadius="8px" p={2} maxWidth="200px">
    { content }
    </Box>
  </Flex>
);

const ChatPage: React.FC = () => {
  const [state, setState] = useState<ChatPageState>({
    messages: [],
    newMessage: '',
    activeChatRoom: 'default',
  });

  const [receiver, setReceiver] = useState<number>(-1);
  const [search, setSearch] = useState<string>("");
  const [renderSearch, setRenderSearch] = useState<React.ReactNode[]>(null);
  const [available_user, setAvailableUser] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams(window.location.search);
      let param: string;
      if (params.get('receiver_id') !== null) {
        param = `?receiver_id=${params.get('receiver_id')}`
      } else {
        param = ''
      }
  
      try {
        const res = await axios.get(`${restUrl}/chats${param}`, authHeader);
        const msgs = res.data.messages;
        const receiver = res.data.receiver_id;
        const available_user = res.data.users;
        console.log(res.data)
        setState((prevState) => ({
          ...prevState,
          messages: msgs.map((msg: any) => ({
            isSender: msg.isSender,
            chat_time: msg.chat_time,
            content: msg.content,
          })),
        }));
        
        setReceiver(receiver);
        setAvailableUser(available_user);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    const intervalId = setInterval(fetchData, 1000);
  
    return () => clearInterval(intervalId);
  }, []); 

  const addMessage = () => {
    const { newMessage } = state;
    if (newMessage.trim() === '') {
      return;
    }
  
    const payload = {
      receiver_id: receiver,
      message: newMessage,
    };
    
    axios.post(`${restUrl}/chat`, payload, authHeader)
      .then((res) => {
        console.log(res);
        // Reset the newMessage state to clear the input
        setState((prevState) => ({ ...prevState, newMessage: '' }));
      })
      .catch((err) => {
        console.error(err);
      });
  };
  

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({ ...prevState, newMessage: event.target.value }));
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addMessage();
    }
  };

  const handleNewChatRoom = () => {
    const { messages, activeChatRoom } = state;
    const newChatRoom = prompt('Enter a new chat room name:') || 'default';

    setState({
      activeChatRoom: newChatRoom,
      messages: [
        ...messages,
        { id: messages.length + 1, content: `You created a new chat room: ${newChatRoom}`, chatRoom: newChatRoom },
      ],
    });
  };

  
  interface ChatHistoryMessageProps {
    id: number; 
  }
  
  const ChatHistoryMessage: React.FC<ChatHistoryMessageProps> = ({ id }) => (
    <Flex alignItems="center" mb={1} bg="gray" onClick={()=>{window.location.href = `/chatPage?receiver_id=${id}`}}>
      <Text style={{ fontSize: '2em' }}>🗨️</Text>
      <Box ml={2}>
        <Text fontWeight="bold">User ID</Text>
        <Text maxWidth="200px" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
          {id}
        </Text>
      </Box>
    </Flex>
  );
  
  const renderMessages = () => {

    if(search === ""){
      if (available_user.length === 0) {
        return null;
      }
      let x: React.ReactNode[] = [];
      for (let i = 0; i < available_user.length; i++) {
        x.push(<Flex alignItems="center" mb={1} bg="gray" onClick={()=>{window.location.href = `/chatPage?receiver_id=${available_user[i].user_id}`}}>
        <Text style={{ fontSize: '2em' }}>🗨️</Text>
        <Box ml={2}>
          <Text fontWeight="bold">User ID : {available_user[i].user_id}</Text>
          <Text maxWidth="200px" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
            {available_user[i].username}
          </Text>
        </Box>
      </Flex>);
      }
      return x;
    }
    // else{
    //   let x: React.ReactNode[] = [];
    //   const res = axios.get(`${restUrl}/users?username=${search}`, authHeader);
    //   const available_user = res.data;
    //   for (let i = 0; i < available_user.length; i++) {
    //     x.push(<ChatHistoryMessage key={available_user[i]} id={available_user[i]} />);
    //   }
    //   return x;
    // }
  };

  const onChangeSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearch(searchTerm);
    if(searchTerm === ""){
      setRenderSearch(null);
      return;
    }
  
    try {
      // Gantilah dengan URL dan konfigurasi permintaan sesuai kebutuhan Anda
      const res = await axios.get(`${restUrl}/users?username=${searchTerm}`, authHeader);
      const data = res.data;
      let x = [];
      for (let i = 0; i < data.length; i++) {
        if(data[i].user_id === parseInt(localStorage.getItem('user_id')!)){
          continue;
        }
        x.push(<Flex alignItems="center" mb={1} bg="gray" onClick={()=>{window.location.href = `/chatPage?receiver_id=${data[i].user_id}`}}>
        <Text style={{ fontSize: '2em' }}>🗨️</Text>
        <Box ml={2}>
          <Text fontWeight="bold">User ID : {data[i].user_id}</Text>
          <Text maxWidth="200px" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
            {data[i].username}
          </Text>
        </Box>
      </Flex>);
      }
      setRenderSearch(x);
      // Lakukan sesuatu dengan data yang diterima, misalnya, perbarui state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const renderSentMessages = () => {
    const { messages } = state;
    if (messages.length === 0) {
      return null;
    }
   

    return (
      <Flex flexDirection="column" alignItems="flex-end" alignSelf="flex-end" width="100%">
        {messages.map((message) => (
          message.isSender ? <SendMessage key= {message.content} {...message} /> : <ReceiveMessage key= {message.content} {...message} />
        ))}
      </Flex>
    );
  };

  return (
    <>
      <Navbar search='' />
      <Flex width="100%" height="calc(100vh - 10vh)" bg="red">
        {/* Elemen A - 20% Lebar */}
        <Box width="35%" bg="#333" height="100%">
          <Box display="flex" alignItems="center">
                  <Input type='text' width='80%'  bg='#1F1F1F' marginTop='10px' marginRight='5px' color = "white" placeholder='Search...' onChange={onChangeSearch} />
                  <Button ml={0}  marginTop='10px' bgColor='green' color="black" >
                    +
                  </Button>
          </Box>
          <Box
                  marginTop='10px'
                  overflowY='scroll'
                  overflowX ='hidden'
                  maxW='100%'
                  css={{
                    '&::-webkit-scrollbar': {
                      width: '10px',
                    },
                    '&::-webkit-scrollbar-track': {
                      width: '14px',
                    }
                  }}
                >
                  {renderSearch !== null ? renderSearch : renderMessages()}
            </Box>
        </Box>

        {/* Elemen B - 80% Lebar */}
        
        <Box width="65%" 
        bg="#EBFAFF" 
        height="100%" 
        >
          <Box width="100%"  
          height="90%" 
          overflowY={'scroll'}
          css={{
            '&::-webkit-scrollbar': {
              width: '10px',
            },
            '&::-webkit-scrollbar-track': {
              width: '14px',
            }
          }}>
          {renderSentMessages()}
          </Box>
          <Flex bg="white" width="100%" paddingTop = "2vh">
                  <Input
                    type='text'
                    value={state.newMessage}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder='Type your message...'
                    maxWidth='70%'
                    marginLeft='5%'
                  />
                  <Button onClick={addMessage} bgColor='green' color="white" maxWidth='10%' flexShrink={0} marginLeft='5%'>
                    Send
                  </Button>
          </Flex>
        </Box>
      </Flex>
      
      {/* <Box minH="100%" bgColor="blue" >
        <Center>
            <Grid templateColumns='1fr 3fr' width='100%' height="100%" >
              <Box display="flex" flexDirection="column" bg="#333" height="100%">
                <Box display="flex" alignItems="center">
                  <Input type='text' width='20vw' height='5vh' bg='#1F1F1F' marginTop='10px' marginRight='5px' placeholder='Search...' />
                  <Button ml={0} height='5vh' marginTop='10px' bgColor='green' color="black" onClick={handleNewChatRoom}>
                    +
                  </Button>
                </Box>
                <Box
                  marginTop='10px'
                  overflowY='scroll'
                  maxW='100%'
                  css={{
                    '&::-webkit-scrollbar': {
                      width: '10px',
                    },
                    '&::-webkit-scrollbar-track': {
                      width: '14px',
                    }
                  }}
                >
                  {renderMessages()}
                </Box>
              </Box>

              <GridItem p={0} display="flex" flexDirection="column" height="100%" width="100%">
                <Box
                  display="flex"
                  bg="#EBFAFF"
                  height="100%"
                  width="100%"
                  overflowY='scroll'
                  maxH='100%'
                  maxW='100%'
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
                  {renderSentMessages()}
                </Box>
                <Flex bg="white" width="100%">
                  <Input
                    type='text'
                    value={state.newMessage}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder='Type your message...'
                    width='90%'
                  />
                  <Button onClick={addMessage} bgColor='green' color="white" width='10%' flexShrink={0} marginTop='-5px'>
                    Send
                  </Button>
                </Flex>
              </GridItem>
            </Grid>
        </Center>
      </Box> */}
    </>
  );
};

export default ChatPage;
