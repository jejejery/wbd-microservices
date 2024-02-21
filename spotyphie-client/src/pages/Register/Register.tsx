import React, {ChangeEvent} from 'react';
import {Box, Button, Center, FormControl, FormLabel, Input, Link, Image, Text, VStack} from '@chakra-ui/react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "../../components/Navbar/Navbar";
import axios from 'axios';
import { restUrl} from '../../config/configs';
import CookieManager from '../../auth/cookie';


class Register extends React.Component <{}, {name: string, username: string, email: string, password: string, isRegister: boolean}> {
    
    constructor(props: any) {
        super(props);
        this.state = {
            name: '',
            username: '',
            email: '',
            password: '',
            isRegister: false
        };
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        this.setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    
    
    

    handleSubmit = async (event: any) => {
        event.preventDefault();

        // Validasi input
        if (this.state.name === '' || this.state.username === '' || this.state.email === '' || this.state.password === '') {
            alert('Please fill all the fields!');
            return;
        }
           
        try {
    
            // Data object as json
            const registerData = {
                name: this.state.name,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
            }
    
            const registerUrl = `${restUrl}/register`;

            const registerHeader = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
    
            const response = await axios.post(registerUrl, registerData, registerHeader);
            
            console.log(response);
            alert('Register success!');
            // Set cookie
            this.setState({isRegister : true});
            window.location.reload();
            // Redirect ke login
        } catch (error : any) {
            alert('Username or email already exists!');
        }
   
    };

    componentDidUpdate(prevProps: any, prevState: any) {
        if (this.state.isRegister && this.state.isRegister !== prevState.isRegister) {
            // Navigate to the Main page
            window.location.href = "/Login";
        }
    }

    render(): React.ReactNode {
        return (
            <>
            <VStack justifyContent='center' paddingTop='50px' spacing='24px'>
                <Image src='./logo_spotyphie.png'
                        maxHeight={{ base: '100px', lg: '150px' }}
                        alt='logo'
                        objectFit='contain'>
                </Image>
                <Box p={8} boxShadow={'lg'} borderWidth={1} borderRadius={8}>
                <form onSubmit={this.handleSubmit}>
                    <FormControl isRequired>
                    <FormLabel color='white'>Name</FormLabel>
                    <Input type='text' w='100%' variant='filled' color='gray.600' name = "name" onChange={this.handleChange}/>
                    <FormLabel color='white'>Username</FormLabel>
                    <Input type='text' w='100%' variant='filled' color='gray.600' name = "username" onChange={this.handleChange}/>
                    <FormLabel color='white'>Email</FormLabel>
                    <Input type='email' w='100%' variant='filled' color='gray.600' name = "email" onChange={this.handleChange}/>
                    <FormLabel color='white'>Password</FormLabel>
                    <Input type='password' w='100%' variant='filled' color='gray.600' name = "password" onChange={this.handleChange}
                    />
                    <Center>
                        <Button type='submit' colorScheme='green' marginTop='20px'>
                        Register
                        </Button>
                    </Center>
                    </FormControl>
                </form>
                </Box>
                <Text color='white'>Already have an account ? <Link href='/login' color='green'>Log in here</Link></Text>
            </VStack>
            </>
        );
    }

}

export default Register;