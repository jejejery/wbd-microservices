import { monolithURL, secretKey} from "../configs/config";
import axios from "axios";
import { sign } from "jsonwebtoken";

class Account{
    private static loginMonolithURL : string = `${monolithURL}/controller/login_controller.php`;
    private static updateMonolithURL : string = `${monolithURL}/controller/user_page_controller.php`;

    constructor(){

    }

    public static async loginPHP(username: string, password : string){
        const loginData = new URLSearchParams({
            username,
            password
        });
        const loginPort = `${monolithURL}/controller/login_controller.php`;
        const loginHeader = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        };


        const loginResponse = await axios.post(Account.loginMonolithURL, loginData.toString(), loginHeader);

        return loginResponse;
    }

    public static async updatePHP(username: string, password : string, email : string, name : string){
        const updateData = new URLSearchParams({
            username,
            password,
            email,
            name
        });
        const updatePort = `${monolithURL}/controller/user_page_controller.php`;
        const updateHeader = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        };


        const updateResponse = await axios.post(Account.updateMonolithURL, updateData.toString(), updateHeader);

        return updateResponse;
    }

    public static async deletePHP(the_id : any){
       
        const deletePort = `${monolithURL}/controller/delete_account_controller.php`;

        const deleteResponse = await axios.delete(deletePort, {
            data: { user_id: the_id },
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return deleteResponse;

    }

}

export default Account;