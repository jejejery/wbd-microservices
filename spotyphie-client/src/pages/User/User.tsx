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
import CookieManager from "../../auth/cookie";



class User extends React.Component<any,any> {


    constructor(props : any){
        super(props);
        this.state = {
            referralCode : '',
            isReferralCodeModalOpen: false,
            username: '',
            name: '',
            email: '',
            password: ''
        }

    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        this.setState((prevState : any) => ({
            ...prevState,
            [name]: value,
        }));
    };

    onClickLogout = () => {
        localStorage.clear();
        CookieManager.deleteCookie('token');
        window.location.href = '/';
    }


    onClickUpdate = async () =>
    {
        try{
            if(this.state.username === '' || this.state.name === '' || this.state.email === '' || this.state.password === ''){
                alert('Please fill all the field!');
                return;
            }
            const updateUrl = `${restUrl}/user/update`;
            const res = await axios.put(updateUrl, {username: this.state.username, name: this.state.name, email: this.state.email, password: this.state.password}, authHeader)
            if (res.status === 200) {
                alert('Update Success!');
                
            }
        }
        catch(e){
            console.log(e);
            alert('Update Failed!');
        }
    }

    onClickDelete = async () =>{
        const confirmed = window.confirm("Are you sure you want to delete your account?");
        if (!confirmed) {
            return;
        }
        try{
            const res = await axios.delete(`${restUrl}/user/delete`, authHeader);
            console.log(res);
            alert('You\'ve been deleted your account!');
            this.onClickLogout();
        }
        catch(e){
            console.log(e);
            alert('Delete Failed!');
        }
        
    }


    onClickVerify = async () => {
        try{
            const referralUrl = `${restUrl}/referral`;
            const res = await axios.post(referralUrl, {code:this.state.referralCode}, {headers: {'Content-Type': 'application/json'}})
            if (res.status === 200) {
                if(res.data.isValid){
                    alert('Referral Code Verified!');
                    localStorage.setItem('referral', "true");
                    window.location.href = '/referral';
                }
                else{
                    alert('Referral Code Already Used!');
                }
                
            } 
        }
        catch(e){
            alert('Invalid Referral Code!');
        }
        
        

    }


    render(): React.ReactNode {
        return (
            <>
            <Navbar search =''/>
            <VStack justifyContent='center' paddingTop='50px' spacing='24px'>
                <Heading color='white'>Hello, {localStorage.getItem('username')}!</Heading>
                <Flex>
                    <Text color='white'>Your Balance : Rp{localStorage.getItem('credits')}</Text>
                </Flex>
                
                <form>
                    <FormControl>
                        <FormLabel color='white'>Your Username</FormLabel>
                        <Input type='text' w='100%' variant='filled' color='white' name = "username" onChange={this.handleChange}></Input>
                        <FormLabel color='white'>Your Name</FormLabel>
                        <Input type='text' w='100%' variant='filled' color='white' name = "name" onChange={this.handleChange}></Input>
                        <FormLabel color="white">Your Email</FormLabel>
                        <Input type='email' w='100%' variant='filled' color='white' name = "email" onChange={this.handleChange}></Input>
                        <FormLabel color='white'>Your Password</FormLabel>
                        <Input type='password' w='100%' variant='filled' color='white' name = "password" onChange={this.handleChange}></Input>
                    </FormControl>
                </form>
                <Flex marginTop='20px' 
                maxW={window.innerWidth * 0.9} 
                justifyContent='space-between'>
                    <Button
                        colorScheme='green'
                        marginRight='10px'
                        fontSize={{base : '10px', lg : '15px'}}
                        onClick={this.onClickUpdate}
                    >
                        <Text>Update Profile</Text>
                    </Button>
                    <Button
                        colorScheme='gray'
                        marginLeft='10px'
                        marginRight='10px'
                        fontSize={{base : '10px', lg : '15px'}}
                        onClick={this.onClickLogout}
                    >
                        <Text>Sign Out</Text>
                    </Button>
                    <Button
                        colorScheme='red'
                        marginLeft='10px'
                        marginRight='10px'
                        fontSize={{base : '10px', lg : '15px'}}
                        onClick={this.onClickDelete}
                    >
                        <Text>Delete Your Account</Text>
                    </Button>
                </Flex>
                <Flex>
                    <Button colorScheme='green'
                           onClick={() => {
                            this.setState({ isReferralCodeModalOpen: true });
                            }}>+ Add referral code</Button>
                    <Button
                            colorScheme='blue'
                            marginLeft='10px'
                            marginRight='10px'
                            fontSize={{base : '10px', lg : '15px'}}
                            onClick={()=>{
                                window.location.href = '/topup';
                            }}
                        >
                            <Text>+ Top Up</Text>
                    </Button>
                </Flex>

                <Modal
                    isOpen={this.state.isReferralCodeModalOpen}
                    onClose={() => this.setState({ isReferralCodeModalOpen: false })}
                >
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>Verify The Referral Code</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                        <FormLabel>Enter Your Referral Code:</FormLabel>
                        <Input type="text" onChange={(e) => {this.setState({referralCode: e.target.value})}}/>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                        colorScheme="green"
                        onClick={this.onClickVerify}
                        >
                        Verify
                        </Button>
                    </ModalFooter>
                    </ModalContent>
                </Modal>
            </VStack>
            </>
        );
    }

}

export default User;