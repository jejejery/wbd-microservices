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
    Heading,
    Select
    } from "@chakra-ui/react";

import React, {
} from "react";


import _ from 'lodash';

import { RxHamburgerMenu} from "react-icons/rx";
import {FaSearchPlus} from "react-icons/fa";
import {CgProfile} from "react-icons/cg";
import UserManager  from '../../auth/user';

interface MyProps {
search : string;
}

interface MyState {
search : string;
}


class Navbar extends React.Component<MyProps,MyState> {


constructor(props : any){
    super(props);
    this.state = {
        search : ''
    }
   

    this.debouncedSearch = this.debouncedSearch.bind(this);
    this.laptopMenu = this.laptopMenu.bind(this);
    this.mobileMenu = this.mobileMenu.bind(this);

}


 // debounced function
 debouncedSearch = _.debounce((event: any) => {
    event.preventDefault();
    this.setState({ search: event.target.value });
}, 700); // 300 adalah waktu tunggu dalam milidetik

//render laptop menu
laptopMenu() : React.ReactNode{
    return(
        <Flex
     alignItems='center'
     alignContent={{ base: "center", lg: "flex-start" }} 
     position='absolute'
     paddingRight={{base : '0%', lg:'3%'}}
     right={{base : '0%', lg:'23%'}}
     maxW='20%'>
        {UserManager.isAdmin() && 
        <chakra.li
        listStyleType="none"
        px={{ lg: "8" }}
        py={{ base: "3", lg: "0" }}
        color={"white"}
        >
            <a href="/userlist">User List</a>
        </chakra.li>}
        
        <chakra.li
        listStyleType="none"
        px={{ lg: "8" }}
        py={{ base: "3", lg: "0" }}
        color={"white"}
        >
            <a href="/chatPage">🗨️</a>
        </chakra.li>
        <chakra.li
        listStyleType="none"
        px={{ lg: "8" }}
        py={{ base: "3", lg: "0" }}
        color={"white"}
        >
            <a href="/transfer">Transfer</a>
        </chakra.li>

        <chakra.li
        listStyleType="none"
        px={{ lg: "8" }}
        py={{ base: "3", lg: "0" }}
        color={"white"}
        >
            <a href="/mySong">My Song</a>
        </chakra.li>

        <chakra.li
        listStyleType="none"
        px={{ lg: "8" }}
        py={{ base: "3", lg: "0" }}
        color={"white"}
        >
            <a href="/Subscription">💲Premium Subscription</a>
        </chakra.li>

        <chakra.li
        listStyleType="none"
        px={{ lg: "8" }}
        py={{ base: "3", lg: "0" }}
        color={"white"}
        >
            <a href="/user"><CgProfile/></a>
        </chakra.li>
    </Flex>
    )
}

//render hamburger menu
mobileMenu() : React.ReactNode{
    return(
        <Box
        position='absolute'
        right='3%'>
            <Menu>  
                <MenuButton
                color='white'
                ><RxHamburgerMenu/></MenuButton>
                <MenuList>
                    {UserManager.isAdmin() && <MenuItem as='a' href='/userlist'>User List</MenuItem>}
                    <MenuItem as='a' href='/transfer'>Transfer</MenuItem>
                    <MenuItem as='a' href='/mySong'>My Song</MenuItem>
                    <MenuItem as='a' href='/chatPage'>🗨️ Chat</MenuItem>
                    <MenuItem as='a' href='/Subscription'>💲Premium Subscription</MenuItem>
                    <MenuItem as='a' href='/user'><CgProfile/>  &nbsp;&nbsp; Your Account</MenuItem>
                </MenuList>
            </Menu>
        </Box>
        
    )
}

advanceSearch() : React.ReactNode{
    return(
        
            <Menu>
                <MenuButton  
                color='white'
                paddingLeft={2}>
                    <FaSearchPlus/>
                </MenuButton>
                <MenuList
                backgroundColor = 'teal.400'
                maxW={window.innerWidth*0.7}>
                    <Box
                    margin={10}
                    marginTop={5}
                    >
                        <FormControl>
                            <Heading color='white' paddingBottom={2}>Advance Search</Heading>
                            <FormLabel>Artist</FormLabel>
                                <Input/>
                            <FormLabel>Genre</FormLabel>
                                <Input/>
                                <FormLabel>Sort</FormLabel>
                                <Select placeholder='sort by...'>
                                    <option>Title</option>
                                    <option>Name</option>
                                </Select>  
                        </FormControl>
                    </Box>
                </MenuList>
            </Menu>
       
        
    )
}



render(): React.ReactNode {
    return (
    <Box
        as="nav"
        display="flex"
        alignItems="center"
        fontWeight="500"
        backgroundColor="black"
        p="10px"
        height = "10vh"
        maxWidth={window.innerWidth}
        >
    <Flex
        alignItems='center'
        alignContent={{ base: "center", lg: "flex-start" }} 
        position='relative'
        left='3%'
        maxWidth='75%'
    >
        <Box
        paddingRight='5px'>
            <a href="/">
                <Image 
                src="./logo_spotyphie.png"
                maxHeight={{ base: "40px", lg: "70px" }}
                />
            </a>
        
        </Box>
        <Flex 
        maxW = '200px'>
        <form onChange={this.debouncedSearch}>
            <FormControl>
                <Input type='text' w='100%' variant='filled' color='white' placeholder="search..." height='90%'></Input>
            </FormControl>
        </form>
        {this.advanceSearch()}
        </Flex>
    </Flex>
    {
        window.innerWidth> 1280 ? this.laptopMenu() : this.mobileMenu()
    }
    {
        this.state.search !== '' ? window.location.href = `/search?title=${this.state.search}` : null
    }
 </Box>
    )
}

}

export default Navbar;