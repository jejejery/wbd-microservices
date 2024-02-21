import React, {ChangeEvent, useEffect ,useState} from 'react';
import { Box, Button, Center, FormControl, FormLabel, Image, Input, Link, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { restUrl} from '../../config/configs';
import CookieManager from '../../auth/cookie';

class Login extends React.Component <{}, {isLogin : boolean, failLogin : string}> {
    private inputs;
    constructor(props : any){
        super(props);
        this.inputs = new Map<string,string>();
        this.inputs.set('username', '');
        this.inputs.set('password', '');
        this.state = {
            isLogin : false,
            failLogin : ""
        }
    }

    handleChange = (event : ChangeEvent<HTMLInputElement>) => {
        this.inputs.set(event.target.name, event.target.value);
    };

    handleSubmit =  async (event : any) => {
        event.preventDefault();
        
        try {
    
            // Data object as json
            const loginData = {
                username: this.inputs.get('username'),
                password: this.inputs.get('password'),
            }
    
            const loginUrl = `${restUrl}/login`;

            const loginHeader = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
    
            const response = await axios.post(loginUrl, loginData, loginHeader);
   
            // Set cookie
            this.setState({isLogin : true});
            CookieManager.createCookie('token', response.data.token, 1800);
            // Set Local Storage
            localStorage.setItem('user_id', response.data.user_id);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('is_premium', response.data.is_premium);
            localStorage.setItem('is_admin', response.data.is_admin);
            localStorage.setItem('credits', response.data.credits);
            window.location.reload();
            // Redirect ke halaman utama
        } catch (error : any) {
            this.setState({failLogin : 'Invalid user or password!'});
        }
    };

    componentDidUpdate(prevProps: any, prevState: any) {
        // Check if isLogin state has changed
        if (this.state.isLogin && this.state.isLogin !== prevState.isLogin) {
            // Navigate to the Main page
            window.location.href = "/";
        }
    }
    
    render(): React.ReactNode {
        return (
            <VStack justifyContent='center' paddingTop='50px' spacing='24px'>
                <Image src='./logo_spotyphie.png'
                        maxHeight={{ base: '100px', lg: '150px' }}
                        alt='logo'
                        objectFit='contain'>
                </Image>
                <Box p={8} boxShadow={'lg'} borderRadius={8} bgColor='#334F5B'>
                    <form onSubmit={this.handleSubmit}>
                        <FormControl isRequired>
                            <FormLabel color='white'>Email/Username</FormLabel>
                            <Input type='text' name='username' w='100%' variant='outline' bgColor='white' onChange={this.handleChange} />
                            <FormLabel color="white">Password</FormLabel>
                            <Input type='password' name='password' w='100%' variant='outline' bgColor='white' onChange={this.handleChange} /><br></br>
                            <Center>
                                <Button type='submit' colorScheme='green' marginTop='20px'>Submit</Button>
                            </Center>
                        </FormControl>
                    </form>
                    {this.state.failLogin !== "" &&  <Center><Text color='red'>{this.state.failLogin}</Text></Center>}
                </Box>
                <Text color='white'>Don't have an account ? <Link href='/register' color='green'>Register here</Link></Text>
            </VStack>
            
        )
    }

}

export default Login;