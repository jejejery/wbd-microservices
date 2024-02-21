import { Router, Request, Response} from "express";
import { monolithURL, secretKey, prisma } from "../configs/config";
import { tokenAuthenticator } from "../middleware";
import { SOAPJSONparser, chatPageResponse } from "../helper/function";

const router = Router();

router.get('/chats', tokenAuthenticator, async (req : Request, res : Response) => {
    try{
        
    
    //if the request query doesnt have receiver_id: find first smaller receiver_id
    const user_id = res.locals.user.user_id;
    let resp = await chatPageResponse(user_id, req.query.receiver_id);
    return res.status(200).send(resp);
    }
    catch(e){
        console.log(e);
        res.status(404).send("Something wrong");
        return;
    }
    
});

router.post('/chat', tokenAuthenticator, async (req : Request, res : Response) => {
    try{
        const user_id = res.locals.user.user_id;
        const receiver_id = req.body.receiver_id;
        const message = req.body.message;
        let the_id = new Date().toUTCString()
        the_id += ":" + user_id + ":" + receiver_id;
        const response = await prisma.chat.create({
            data: {
                chat_id: the_id,
                sender_id: user_id,
                receiver_id: receiver_id,
                chat_time : new Date(),
                content: message
            }
        });
        return res.status(200).send(response);
    }
    catch(e){
        console.log(e);
        res.status(404).send("Something wrong");
        return;
    }
});


export { router as chat };