import { Router, Request, Response } from "express";
import { monolithURL, secretKey, prisma} from "../configs/config";
import axios from "axios";
import { sign } from "jsonwebtoken";

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
    try {
        const registerPort = `${monolithURL}/controller/register_controller.php`;

        const { name, username, email, password } = req.body;
        const registerData = new URLSearchParams({
            name,
            username,
            email,
            password
        });

        const header = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        };

        // req  to php db
        const registerResponse = await axios.post(registerPort, registerData.toString(), header);

        if (registerResponse.status == 200) {
            // req to php db
            const loginPort = `${monolithURL}/controller/login_controller.php`;
            const loginData = new URLSearchParams({
                username,
                password
            });
            const loginResponse = await axios.post(loginPort, loginData.toString(), header);

            if (loginResponse.status == 200) {
                await prisma.userApp.create({
                    data: {
                        user_id: loginResponse.data.user_id,
                        credits: 0,
                        isPremium: loginResponse.data.isAdmin? true : false,
                    }
                })
                
                return res.status(200).send("success");
            } else {
                return res.status(404).send("Something is Wrong");
            }
        } else {
            return res.status(404).send("Something is Wrong");
        }

    } catch (error) {
        console.log(error)
        res.status(404).send("Failed");
    }

});

export { router as register };
