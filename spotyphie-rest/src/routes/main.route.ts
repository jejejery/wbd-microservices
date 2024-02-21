import express from 'express';
import axios from 'axios';
import PremiumSong from '../model/PremiumSong';
import { SOAPJSONparser } from '../helper/function';
import { tokenAuthenticator } from "../middleware";

const router = express.Router();
const ps = new PremiumSong()


router.get('/main', tokenAuthenticator, async (req,res) => {
      try {
        let fu = await ps.getSomePremiumSong(5);
        let ts = await ps.getSomePremiumSong(9);

        let data = {
            "for_you": SOAPJSONparser(fu.data),
            "top_song": SOAPJSONparser(ts.data)
        }
        res.status(ts.status).send(data);
      } catch (e) {
        res.status(404).send(e);
      }
  
  })

  
export { router as main };