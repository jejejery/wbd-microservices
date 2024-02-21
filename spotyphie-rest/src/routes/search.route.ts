import express from 'express';
import axios from 'axios';
import PremiumSong from '../model/PremiumSong';
import { SOAPJSONparser } from '../helper/function';
import { tokenAuthenticator } from "../middleware";

const router = express.Router();
const ps = new PremiumSong()


router.get('/search',tokenAuthenticator, async (req,res) => {
    const title = req.query.title;
    try{
        let response = await ps.searchPremiumSong(title);
        res.status(response.status).send(SOAPJSONparser(response.data));
    }
    catch(e){
        res.status(404).send(e);
    }
  
})

  
export { router as search };