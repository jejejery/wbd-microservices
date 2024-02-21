import axios from 'axios';
import { SOAP_WSDL_PREMUSER_URL } from '../configs/config';
import os from 'os';

class PremiumUser {
    private ip : string;
    private api_key = process.env.SOAP_API_KEY;
    private endpoint : string = SOAP_WSDL_PREMUSER_URL;
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
        '<api_key xmlns="PremiumUserService">' + this.api_key + '</api_key>' +
        '<ip_address xmlns="PremiumUserService" >' + this.ip + '</ip_address>' +
        '<endpoint xmlns="PremiumUserService">' + this.endpoint + '</endpoint>';
    }

    private reqBodyGenerator (funcName: string, param: any) {
        return '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:prem="PremiumUserService">' +
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
    
    public async getPremiumUserByID(id : any) {
        const param = '<arg0>' + id + '</arg0>'; 
        const reqBody = this.reqBodyGenerator("getPremiumUser", param);
        
        const response = await axios.post(SOAP_WSDL_PREMUSER_URL,reqBody,this.getSOAPhttpHeader());
        return response;
    }

    public async getAllPremiumUser() {
       
        const reqBody = this.reqBodyGenerator("getAllPremiumUser", "");

        const response = await axios.post(SOAP_WSDL_PREMUSER_URL, reqBody, this.getSOAPhttpHeader());
        return response;
    }

    public async updatePremiumUser(id : any, start : any, end : any) {
        const param = '<arg0>' + id +'</arg0>' +
            '<arg1>' + start +'</arg1>' +
            '<arg2>' + end +'</arg2>';
        const reqBody = this.reqBodyGenerator("updatePremiumUser", param);

        const response = await axios.post(SOAP_WSDL_PREMUSER_URL, reqBody, this.getSOAPhttpHeader());
        return response;
    }

    public async deletePremiumUser(id :any) {
        const param = '<arg0>' + id + '</arg0>'
        const reqBody = this.reqBodyGenerator("deletePremiumUser", param);

        const response = await axios.post(SOAP_WSDL_PREMUSER_URL, reqBody, this.getSOAPhttpHeader());
        return response;
    }

    public async addPremiumUser(id : any, start : any, end : any) {
        const param = '<arg0>' + id +'</arg0>' +
                      '<arg1>' + start +'</arg1>' +
                      '<arg2>' + end +'</arg2>';
        const reqBody = this.reqBodyGenerator("addPremiumUser", param);

        const response = await axios.post(SOAP_WSDL_PREMUSER_URL, reqBody, this.getSOAPhttpHeader());
        return response;
    }
}

export default PremiumUser;