import { Router } from "express";
import { chat } from "./chat.route";
import { referral } from "./referral.route";
import { login } from "./login.route";
import { user } from "./user.route";
import { premiumUser } from "./soap.premuser.route";
import { premiumSong } from "./soap.premsong.route";
import { register } from "./register.route";
import { topup } from "./topup.route";
import { transfer } from "./transfer.route";
import { main } from "./main.route";
import { search } from "./search.route";
import { subscription } from "./subscription.route";

const routes = Router();

routes.use(chat);
routes.use(referral);
routes.use(login);
routes.use(user);
routes.use(transfer);
routes.use(premiumUser); 
routes.use(premiumSong)
routes.use(register);
routes.use(topup);
routes.use(main);
routes.use(search);
routes.use(subscription);

export { routes };
