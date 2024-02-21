import { Router, Request, Response} from "express";
import { monolithURL, secretKey, prisma } from "../configs/config";
import { tokenAuthenticator } from "../middleware";
import axios from 'axios';

const router = Router();

router.patch('/topup', tokenAuthenticator, async (req : Request, res : Response) => {
    /*
    req body params:
    user_id: int
    value: int
    */
    const amount = req.body.value 
    const userID = req.body.user_id
    console.log(req.body)
    //Make update with prisma schema for userApp table
    try{
        const user = await prisma.userApp.findUnique({
            where: {
                user_id: userID
            }
        });
        if(user === null){
            res.status(404).send("User not found");
            return;
        }
        else{
            await prisma.userApp.update({
                where: {
                    user_id: userID
                },
                data: {
                    credits: user.credits + amount
                }
            });
            return res.status(200).json({value: user.credits + amount});
        }
    }
    catch(e){
        console.log(e);
        res.status(404).send("Something wrong");
        return;
    }

});





export { router as topup};