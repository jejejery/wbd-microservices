import { Router, Request, Response} from "express";
import { monolithURL, secretKey, prisma } from "../configs/config";
import Account from "../model/Account"
import axios from 'axios';
import { tokenAuthenticator } from "../middleware";

const router = Router();

router.get('/users', tokenAuthenticator,async (req : Request, res : Response) => {
    const username = req.query.username;
    const user = await axios.get(monolithURL + `/controller/search_user_controller.php?username=${username}`)

    let jsonArray = user.data;
    for (var i = 0; i < jsonArray.length; i++) {
        // Menghapus spasi ekstra dari "name"
        jsonArray[i].name = jsonArray[i].name.trim();
    
        // Menghapus spasi ekstra dari "email"
        jsonArray[i].email = jsonArray[i].email.trim();
    
        // Menghapus spasi ekstra dari "username"
        jsonArray[i].username = jsonArray[i].username.trim();
    }
    res.status(user.status).send(jsonArray);
});


router.put('/user/update', tokenAuthenticator, async (req : Request, res : Response) => {
    try{
        const data = {
            username : req.body.username,
            password : req.body.password,
            email : req.body.email,
            name : req.body.name,
        }
        
    
        const response = await Account.updatePHP(data.username, data.password, data.email, data.name);
        return res.status(200).send(response.data);
    }
    catch(e){
        console.log(e);
        res.status(404).send("Something wrong");
        return;
    }


});

router.delete('/user/delete', tokenAuthenticator, async (req : Request, res : Response) => {
    try{
        const user_id = res.locals.user.user_id;  
        const response = await Account.deletePHP(user_id);
        if(response.status === 200){
            return res.sendStatus(200).send(user_id);
        }
        else{
            return res.sendStatus(404).send("Something wrong");
        }
       
    }
    catch(e){
        console.log(e);
        res.status(404).send("Something wrong");
        return;
    }


});



export { router as user};