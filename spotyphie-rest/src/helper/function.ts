import { prisma, monolithURL} from '../configs/config'

import axios from 'axios';
/**
 * 
 * @param data : XML response dari SOAP
 */
export function SOAPJSONparser(data: string) {
    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;
    try {
        const dom = new JSDOM(data, { contentType: 'text/xml' });
        const xmlDoc = dom.window.document;

        const returnElement = xmlDoc.querySelector('return');
        if (!returnElement) {
            throw new Error('Element "return" not found in XML.');
        }
        const returnJSON = JSON.parse(returnElement.textContent!);
        return returnJSON;
    } catch (error) {
        console.error('Error parsing SOAP response:', error);
        throw error;
    }
}

//this function takes two array and sort them by their timestamp
// example of timestamp
function msgArrayProcessor(sendArray: any[], receiveArray: any[], sender : number) {
    let msgArray = sendArray.concat(receiveArray);
    msgArray.sort(function (a, b) {
        return a.chat_time - b.chat_time;
    });
    let msgArray2 : any[] = [];
    for (let i = 0; i < msgArray.length; i++) {
        let msg = {
            "isSender": msgArray[i].sender_id === sender,
            "chat_time": msgArray[i].chat_time,
            "content": msgArray[i].content,
        }
        msgArray2.push(msg);
    }
    return msgArray2;
}

export async function chatPageResponse (user_id: any, receiver_id : any) {

    let idFirst : any = receiver_id;
    if(idFirst === undefined || idFirst === null){
        const sendFirst = await prisma.chat.findFirst({
            where: {
                sender_id: user_id
            },
            orderBy: {
                receiver_id: 'asc'
            }
        });
        idFirst = sendFirst?.receiver_id;
    }
    else{
        idFirst = parseInt(idFirst);
    }

    
    const send = await prisma.chat.findMany({
        where: {
            sender_id: user_id,
            receiver_id: idFirst
        },
    });

    const receive = await prisma.chat.findMany({
        where: {
            sender_id: idFirst,
            receiver_id: user_id
        },  
    });

    const msg = msgArrayProcessor(send, receive, user_id)
    
    // search all user that chat with user_id
    const user = await prisma.chat.findMany({
        where: {
            sender_id: user_id
        },
        select: {
            receiver_id: true
        }
    });

    const user2 = await prisma.chat.findMany({
        where: {
            receiver_id: user_id
        },
        select: {
            sender_id: true
        }
    });
    const combinedUsersID = Array.from(new Set([...user.map(item => item.receiver_id), ...user2.map(item => item.sender_id)]));
    let combinedUsers : any[] = []

    for(let i = 0; i < combinedUsersID.length; i++){
        const res = await axios.get(monolithURL + `/controller/search_user_controller.php?user_id=${combinedUsersID[i]}`)
        if(res.data){
            combinedUsers.push({
            "user_id" : combinedUsersID[i],
            "username" : res.data.username.trim(),
        })
        }
    }
    // const user = await axios.get(monolithURL + `/controller/search_user_controller.php?user_id=${username}`)

    const res = {
        "receiver_id": idFirst,
        "messages": msg,
        "users": combinedUsers
    }


    return res;
}

//


