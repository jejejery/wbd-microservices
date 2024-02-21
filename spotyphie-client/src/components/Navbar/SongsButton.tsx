import { VStack, Button, Image, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

import React, {useEffect} from 'react';

class SongsButton extends React.Component {
    private title : string;
    private imgSrc : string;
    constructor(props : any) {
        super(props);
        this.title = props.title;
        this.imgSrc = props.imgSrc;
    }

    render() : React.ReactNode {
        return (
            <Button bgColor='white' size='fit-content' p='20px'>
                <VStack spacing='20px'>
                    <Image src={this.imgSrc} alt='Song image' maxHeight='100px'/>
                    <Text>{this.title}</Text>
                </VStack>
            </Button>
        );
    }
}

export default SongsButton;