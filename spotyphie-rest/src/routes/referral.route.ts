import { Router, Request, Response} from "express";
import { prisma } from "../configs/config";
import PremiumSong from "../model/PremiumSong";
import { SOAPJSONparser } from '../helper/function';
import { tokenAuthenticator } from "../middleware";

const router = Router();
const ps = new PremiumSong()

router.post('/referral', async (req : Request, res : Response) => {
    try{
        const referral = await prisma.referralCode.findUnique({
            where: {
                code: req.body.code
            }
        });
        if(referral === null){
            res.status(404).send("Referral code not found");
            return;
        }
        else{
            if(referral.isValid){
                await prisma.referralCode.update({
                    where: {
                        code: req.body.code
                    },
                    data: {
                        isValid: false
                    }
                });
                return res.status(200).json({isValid: true});
            } 
            return res.status(200).json({isValid: false});
        }
    }
    catch(e){
        console.log(e);
        res.status(404).send("Something wrong");
        return;
    }

    
});

router.get('/referralPage',tokenAuthenticator, async (req : Request, res : Response) => {
    
    try {
        let recomendations = await ps.getSomePremiumSong(5);
        let search = req.query.title ? await ps.searchPremiumSong(req.query.title) : null

        let data = {
            "recomendations": SOAPJSONparser(recomendations.data),
            "search": req.query.title ? SOAPJSONparser(search!.data) : null
        }

        res.status(recomendations.status).send(data);
      } catch (e) {
        res.status(404).send(e);
      }

    
});

router.post('/referralPage/addSong',tokenAuthenticator, async (req : Request, res : Response) => {
    
    try {
        let user_id = res.locals.user.user_id;  
        let song_id = req.body.song_id;

        // add to prisma
        await prisma.userPremiumSong.create({
            data: {
                user_id: user_id,
                song_id: song_id
            }
        });
      } catch (e) {
        res.status(404).send(e);
      }

    
});


export { router as referral };