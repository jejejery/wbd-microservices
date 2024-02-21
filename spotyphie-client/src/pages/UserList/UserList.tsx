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
    TableContainer,
    Table,
    TableCaption,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td
    } from "@chakra-ui/react";

import React, {
    ReactNode,

} from "react";

import {UserType } from '../../utils/UserType';
import Navbar from "../../components/Navbar/Navbar";

const users : UserType[] = [
    {
        username : 'admin',
        email : 'admin@gmail.com',
        role : 'admin'
    },
    {
        username : 'bowo',
        email : 'bowo@gmail.com',
        role : 'user'
    },
    {
        username : 'samuel',
        email : 'samuel@gmail.com',
        role : 'user'
    }
]



class UserList extends React.Component<any,any> {


constructor(props : any){
    super(props);

}


renderTable(users : UserType[]) : React.ReactNode[]{
    const elements = [];
    for(let i = 0; i < users.length; i++){
        elements.push(
            <Tr>
                <Td>{i+1}</Td>
                <Td>{users[i].username}</Td>
                <Td>{users[i].email}</Td>
                <Td>{users[i].role}</Td>
            </Tr>
        )
    }

    return elements;
}


render(): React.ReactNode {
    return (
    <>
    <Navbar search =''/>
    <Center>
        <Box maxW = '90%'>
            <Heading color='white' p='20px'>List User</Heading>
            <TableContainer
            >
                <Table
                color='white'>
                    <TableCaption>List of Users Table</TableCaption>
                    <Thead>
                    <Tr>
                        <Th isNumeric>No</Th>
                        <Th>Username</Th>
                        <Th>Email</Th>
                        <Th>Role</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        {this.renderTable(users)}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
        

    </Center>

    </>
    )
}

}

export default UserList;