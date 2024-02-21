import express from 'express';
import axios from 'axios';
import { tokenAuthenticator } from "../middleware";
import {prisma} from "../configs/config";

const router = express.Router();



router.post('/subscription',tokenAuthenticator, async (req,res) => {
    try{
        /*
        req body params:
        {
            credits: int //updated credits
            referral_code: string

            
        }
        */ 

       let user_id = res.locals.user.user_id;
       console.log(user_id)
       //update premium pada tabel userApp
         const user = await prisma.userApp.update({
            where: {
                user_id: user_id
            },
            data: {
                isPremium: true,
                credits: req.body.credits
            }
        });
  
        const referral = await prisma.referralCode.create({
            data: {
                code: req.body.referral_code,
                isValid: true,
                user_id: user_id
            }
        });

        return res.status(200).send("success");

    }
    catch(e){
        res.status(404).send(e);
    }
  
})

  
export { router as subscription };