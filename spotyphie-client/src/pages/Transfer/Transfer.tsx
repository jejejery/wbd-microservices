import { Box, 
    chakra, 
    Image,
    FormControl,
    FormLabel,
    Input,
    Flex,
    Menu,
    MenuButton
    ,MenuList,
    MenuItem,
    Center,
    Heading,
    VStack,
    Text,
    Button,
    Link,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    } from "@chakra-ui/react";

import React, {
    ReactNode,

} from "react";

import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { restUrl, authHeader} from '../../config/configs';



class Transfer extends React.Component<any,any> {


    constructor(props : any){
        super(props);
        this.state = {
            receiver_id: '',
            amount: '',
        }

    }


    onClickTransfer = async () => {
        if(this.state.receiver_id === '' || this.state.referralCode === ''){
            alert('Please fill all the fields!');
            return;
        }

        try{
            const userId = parseInt(localStorage.getItem('user_id')!);  
            const credits = parseInt(localStorage.getItem('credits')!);
            const amount = parseInt(this.state.amount);
            const receiverId = parseInt(this.state.receiver_id);

            if(credits < amount){
                alert('Insufficient credits!');
                return;
            }

            if(amount <= 0){
                alert('Invalid amount!');
                return;
            }

            //transfer using axios patch from_user_id, to_user_id, amount
            const transferUrl = `${restUrl}/transfer`;
            const transferData = {
                from_user_id: userId,
                to_user_id: receiverId,
                amount: amount,
            }

            const response = await axios.patch(transferUrl, transferData, authHeader);
            localStorage.setItem('credits', (credits - amount).toString());

            alert('Transfer success!');
            window.location.reload();
        }
        catch(err : any){
            if(err.response.status === 404){
                alert('User not found!' );
            }
            else{
                alert('Something went wrong!');
            }
            
            return;
        }

        

    }


    render(): React.ReactNode {
        return (
            <>
            <Navbar search =''/>
            <VStack justifyContent='center' paddingTop='50px' spacing='24px'>
                <Heading color='green'>$$ Transfer credits $$</Heading>
                <Heading color='white'>Hello, {localStorage.getItem('username')}!</Heading>
                <Flex>
                    <Text color='white'>Your Balance : Rp{localStorage.getItem('credits')}</Text>
                </Flex>
                
                <form>
                    <FormControl>
                        <FormLabel color='white'>User ID</FormLabel>
                        <Input type='text' w='100%' variant='filled' color='black' onKeyPress={(event) => {
                            const keyCode = event.keyCode || event.which;
                            const keyValue = String.fromCharCode(keyCode);
                            if (!/^[0-9]*$/.test(keyValue)) {
                                event.preventDefault();
                            }
                        }}
                        onChange={(event) => {this.setState({receiver_id: event.target.value})}}
                        ></Input>
                        <FormLabel color='white'>Amount</FormLabel>
                        <Input type='text' w='100%' variant='filled' color='black' onKeyPress={(event) => {
                            const keyCode = event.keyCode || event.which;
                            const keyValue = String.fromCharCode(keyCode);
                            if (!/^[0-9]*$/.test(keyValue)) {
                                event.preventDefault();
                            }
                        }}
                        onChange={(event) => {this.setState({amount: event.target.value})}}
                        ></Input>
                    </FormControl>
                </form>
                <Flex marginTop='20px' 
                maxW={window.innerWidth * 0.9} 
                justifyContent='space-between'>
                    <Button
                        colorScheme='blue'
                        marginLeft='10px'
                        marginRight='10px'
                        fontSize={{base : '10px', lg : '15px'}}
                        onClick={this.onClickTransfer}
                    >
                        <Text>Transfer</Text>
                    </Button>
                </Flex>

            </VStack>
            </>
        );
    }

}

export default Transfer;