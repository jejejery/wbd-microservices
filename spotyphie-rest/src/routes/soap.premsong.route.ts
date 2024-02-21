import express from 'express';
import axios from 'axios';
import PremiumSong from '../model/PremiumSong';
import { SOAPJSONparser } from '../helper/function';
import { prisma } from '../configs/config';

const router = express.Router();
const ps = new PremiumSong();

router.get('/getPremSong', async (req,res) => {
    let n = req.query.n;
    if (n == undefined || n == "") {
        res.status(400).send("Parameters not complete");
    } 
    else {
      try {
        let response = await ps.getPremiumSong(n);
        res.status(response.status).send(response.data);
      } catch (e) {
        res.status(404).send(e);
      }
    }
  })


router.get('/getSomePremSong', async (req,res) => {
    let n = req.query.n;
    if (n == undefined || n == "") {
        res.status(400).send("Parameters not complete");
    } 
    else {
      try {
        let response = await ps.getSomePremiumSong(n);
        res.status(response.status).send(SOAPJSONparser(response.data));
      } catch (e) {
        res.status(404).send(e);
      }
    }
  })

  router.get('/getPremSongPage', async (req,res) => {
    let num = req.query.num;
    let size = req.query.size;
    if (num == undefined || num == "" || size == undefined || size == "") {
        res.status(400).send("Parameters not complete");
    } 
    else {
      try {
        let response = await ps.getPremiumSongPage(num,size);
        res.status(response.status).send(SOAPJSONparser(response.data));
      } catch (e) {
        res.status(404).send(e);
      }
    }
  })

  router.get('/getPremSongPageByID', async (req,res) => {
    let id = req.query.id;
    let size = req.query.size;
    if (id == undefined || id == "" || size == undefined || size == "") {
        res.status(400).send("Parameters not complete");
    } 
    else {
      try {
        let response = await ps.getPremiumSongPageByID(id,size);
        res.status(response.status).send(SOAPJSONparser(response.data));
      } catch (e) {
        res.status(404).send(e);
      }
    }
  })

  router.get('/getOwnedPremSong', async (req,res) => {
    let u_id = req.query.uID;
    const song_id_list = await prisma.userPremiumSong.findMany({
      where : {
        user_id : Number(u_id)
      }
    });
    // console.log(song_id_list);
    var result = [];
    for (let key in song_id_list) {
      let response = await ps.getPremiumSong(song_id_list[key].song_id);
      result.push(SOAPJSONparser(response.data));
    }
    res.status(200).send(result);
  })

  router.put('/buyPremSong', async(req,res) => {
    try {
      let u_id = req.body.uID;
      let s_id = req.body.sID;
      let prevCredit = req.body.prevCredit;
      let songPrice = req.body.songPrice;
      
      await prisma.userApp.update({
        where: {
          user_id: u_id
        },
        data: {
          credits: prevCredit - songPrice
        }
      })

      await prisma.userPremiumSong.create({
        data: {
          user_id: u_id,
          song_id: s_id
        }
      })

      res.status(200).send("Payment success");
    } catch (e) {
      res.status(500).send(e);
    }
  })

export { router as premiumSong };