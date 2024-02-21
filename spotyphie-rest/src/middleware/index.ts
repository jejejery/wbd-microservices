import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { secretKey } from "../configs/config";

export async function tokenAuthenticator( req : Request , res : Response, next : NextFunction){
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.sendStatus(401); // 401 Unauthorized

    const token = authHeader.split(' ')[1];
    if(!token) return res.sendStatus(401);

    verify(token, secretKey as string, (err : any, user : any)  => {
        if(err) return res.sendStatus(401);
        res.locals.user = user;
        next();
    });
}

export async function adminAuthenticator( req : Request , res : Response, next : NextFunction){
    const is_admin = res.locals.user.is_admin;
    if(!is_admin) return res.sendStatus(403); //403 forbidden

    next();
}