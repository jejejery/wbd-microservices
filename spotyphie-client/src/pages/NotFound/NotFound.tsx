// NotFound.tsx
import React, { Component } from 'react';
import { Box, 
    chakra, 
    Heading,
    Image,
    Flex,
    Text,
    Link
    } from "@chakra-ui/react";


class NotFound extends Component {
render() {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh" textColor={"whatsapp.100"}>
            <Box textAlign="center">

                <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Chromium_T-Rex-error-offline.svg/2048px-Chromium_T-Rex-error-offline.svg.png"
                    width="20%" 
                    alt="logo"
                    mx="auto" 
                    paddingLeft={5}/>
                
                <Box textAlign="center">
                    <Heading>404</Heading>
                    <h2>Yah Halamannya ga ketemu!</h2>
                    <Text color={"telegram.300"}><Link href='/'>Yuk Balik</Link></Text>
                </Box>
            </Box>
        </Box>
    );
}
}

export default NotFound;





