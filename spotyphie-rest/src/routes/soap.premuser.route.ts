import express from 'express';
import axios from 'axios';
import { SOAP_WSDL_PREMUSER_URL } from '../configs/config';
import PremiumUser from '../model/PremiumUser';
import os from 'os';
import { SOAPJSONparser } from '../helper/function';

function getSOAPhttpHeader() {
    return {
      headers: {
        'Content-Type': 'text/xml',
      }
    };
  }

// Ambil semua network interfaces yang ada
const nets = os.networkInterfaces();
var ip : string = "";

for (const name of Object.keys(nets)) {
    if (nets[name] != undefined) {
        for (const net of nets[name]!) {
            // Ambil alamat IPv4 yang pertama saja
            const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
            if (net.family === familyV4Value && !net.internal) {
                    ip = net.address;
                    break;
            }
        }
    }
    if (ip) {
        break;
    }
}
var api_key = process.env.SOAP_API_KEY;
var endpoint = SOAP_WSDL_PREMUSER_URL;

const soapHeader = 
'<api_key xmlns="PremiumUserService">' + api_key + '</api_key>' +
'<ip_address xmlns="PremiumUserService" >' + ip + '</ip_address>' +
'<endpoint xmlns="PremiumUserService">' + endpoint + '</endpoint>';

const router = express.Router();
var pu = new PremiumUser();

// Ambil premium user dengan id tertentu
router.get('/getPremiumUserByID', async (req,res) => {
    let id = req.query.uID;
    if (id == undefined || id == "") {
        res.status(400).send("No user ID found");
    } else {
      try {
        let response = await pu.getPremiumUserByID(id);
        console.log(SOAPJSONparser(response.data));
        res.status(response.status).send(SOAPJSONparser(response.data));
      } catch(e) {
        res.status(404).send(e);
      }
    }
  }
)

// Ambil semua premium user
router.get('/getAllPremUser', async (req,res) => {
      const reqBody =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:prem="PremiumUserService">' +
      '<soapenv:Header>' +
        soapHeader +
      '</soapenv:Header>' +
        '<soapenv:Body>' +
          '<prem:getAllPremiumUsers>' +
          '</prem:getAllPremiumUsers>' +
        '</soapenv:Body>' +
      '</soapenv:Envelope>';

  axios.post(SOAP_WSDL_PREMUSER_URL,
      reqBody,
      getSOAPhttpHeader()).then(result=>{
        if (result.status === 200) {
          res.status(200).send(SOAPJSONparser(result.data));
        }
      }).catch(err=>{res.status(404).send(err)});
})

// Update premium user dengan id tertentu
// Format tanggal start dan end : yyyy-mm-dd
router.put('/updatePremUser', async (req,res) => {
  let id = req.body.uID;
  let start = req.body.start;
  let end = req.body.end;
  if (id == undefined || id == "" || start == undefined || start == "" || end == undefined || end == "") {
      res.status(400).send("Parameters not complete");
  } else {
    try {
      let response = await pu.updatePremiumUser(id, start, end);
      res.status(response.status).send(SOAPJSONparser(response.data));
    } catch (e) {
      res.status(404).send(e);
    }
  }
})

// Hapus premium user dengan id tertentu
router.delete('/deletePremUser', async (req,res) => {
    let id = req.body.uID;
    if (id == undefined || id == "") {
        res.status(400).send("No user ID found");
    } else {
      try {
        let response = await pu.deletePremiumUser(id);
        res.status(response.status).send(response.data);
      } catch (e) {
        res.status(404).send(e);
      }
    }
})

// Tambah premium user baru
// Format tanggal start dan end : yyyy-mm-dd
router.post('/addPremUser', async (req,res) => {
    let id = req.body.uID;
    let start = req.body.start;
    let end = req.body.end;
    if (id == undefined || id == "" || start == undefined || start == "" || end == undefined || end == "") {
        res.status(400).send("Parameters not complete");
    } else {
        try {
          let response = await pu.addPremiumUser(id,start,end);
          res.status(response.status).send(SOAPJSONparser(response.data));
        } catch (e) {
          res.status(500).send(e);
        }
    }
  }
)

export { router as premiumUser };