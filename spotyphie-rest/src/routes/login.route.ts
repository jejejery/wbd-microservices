import { Router, Request, Response } from "express";
import { monolithURL, secretKey, prisma } from "../configs/config";
import axios from "axios";
import { sign } from "jsonwebtoken";
import Account from "../model/Account"
import PremiumUser from "../model/PremiumUser";
import { SOAPJSONparser } from "../helper/function";

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
    console.log(req.body);
    try {
        
        // const { username, password } = req.body;
        
        // req  to php db
        const phpResponse = await Account.loginPHP(req.body.username, req.body.password)
        const pu = new PremiumUser();
        var isPrem;
        try {
            // Periksa apakah pengguna ada di daftar user premium
            const soapResponse = await pu.getPremiumUserByID(phpResponse.data.user_id);
            if (soapResponse.status === 200) {
                const endDate = new Date(SOAPJSONparser(soapResponse.data).end_date);
                const currDate = new Date();
                isPrem = (currDate < endDate);
                if (!isPrem) {
                    // Jika langganan sudah kedaluarsa, hapus user dari daftar premium user
                    const delResponse = await pu.deletePremiumUser(phpResponse.data.user_id);
                }
            } else {
                isPrem = false;
            }
        } catch (e) {
            isPrem = false;
        }

        const theCredits = await prisma.userApp.findUnique({
            where: {
                user_id: phpResponse.data.user_id
            }
        }).then((user) => {
            return user?.credits
        })

        const token = sign(
            phpResponse.data,
            secretKey
        )

        
        return res.status(phpResponse.status).json
            (
            {
            user_id: phpResponse.data.user_id,
            username: phpResponse.data.username,
            is_admin: phpResponse.data.is_admin,
            credits : theCredits,
            is_premium: isPrem,
            token: token
            }
            );
    } catch (error) {
        res.status(404).send("Data not found");
    }
});


export { router as login };
