import axios from 'axios';
import { SOAP_WSDL_PREMSONG_URL } from '../configs/config';
import os from 'os';

class PremiumSong {
    private ip : string;
    private api_key = process.env.SOAP_API_KEY;
    private endpoint : string = SOAP_WSDL_PREMSONG_URL;
    private soapHeader : string;

    private getSOAPhttpHeader() {
        return {
          headers: {
            'Content-Type': 'text/xml',
          }
        };
    }

    public constructor () {
        // Ambil semua network interfaces yang ada
        const nets = os.networkInterfaces();

        // Cari IP mesin sekarang
        this.ip = "";
        for (const name of Object.keys(nets)) {
            if (nets[name] != undefined) {
                for (const net of nets[name]!) {
                    // Ambil alamat IPv4 yang pertama saja
                    const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
                    if (net.family === familyV4Value && !net.internal) {
                            this.ip = net.address;
                            break;
                    }
                }
            }
            if (this.ip) {
                break;
            }
        }

        this.soapHeader = 
        '<api_key xmlns="PremiumSongService">' + this.api_key + '</api_key>' +
        '<ip_address xmlns="PremiumSongService" >' + this.ip + '</ip_address>' +
        '<endpoint xmlns="PremiumSongService">' + this.endpoint + '</endpoint>';
    }

    private reqBodyGenerator (funcName: string, param: any) {
        return '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:prem="PremiumSongService">' +
        '<soapenv:Header>' +
            this.soapHeader +
        '</soapenv:Header>' +
            '<soapenv:Body>' +
                `<prem:${funcName}>` +
                  param +
                `</prem:${funcName}>` +
            '</soapenv:Body>' +
        '</soapenv:Envelope>';
    }
    

    public async getPremiumSong(n: any) {
        const param = `<arg0>${n}</arg0>`;
        const reqBody = this.reqBodyGenerator("getPremiumSong", param);

        const response = await axios.post(this.endpoint, reqBody, this.getSOAPhttpHeader());
        return response;
    }


    public async getSomePremiumSong(n: any) {
        const param = `<arg0>${n}</arg0>`;
        const reqBody = this.reqBodyGenerator("getSomePremiumSong", param);

        const response = await axios.post(this.endpoint, reqBody, this.getSOAPhttpHeader());
        return response;
    }

    public async getPremiumSongPage(pageNum : any, pageSize : any) {
        const param = `<arg0>${pageNum}</arg0><arg1>${pageSize}</arg1>`;
        const reqBody = this.reqBodyGenerator("getPremiumSongPage", param);

        const response = await axios.post(this.endpoint, reqBody, this.getSOAPhttpHeader());
        return response;
    }

    public async getPremiumSongPageByID(id : any, pageSize : any) {
        const param = `<arg0>${id}</arg0><arg1>${pageSize}</arg1>`;
        const reqBody = this.reqBodyGenerator("getPremiumSongPageByID", param);

        const response = await axios.post(this.endpoint, reqBody, this.getSOAPhttpHeader());
        return response;
    }

    public async searchPremiumSong(n: any) {
        const param = `<arg0>${n}</arg0>`;
        const reqBody = this.reqBodyGenerator("searchPremiumSong", param);

        const response = await axios.post(this.endpoint, reqBody, this.getSOAPhttpHeader());
        return response;
    }
}

export default PremiumSong;