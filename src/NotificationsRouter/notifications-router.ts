import * as express from 'express';
import firestoreInstance from "../firebase";
import { getNotificationCountsAndIDs } from '../DatabaseOperations/get-notification-counts-and-ids';
import { logException } from '../logger';
import { CountAndIds } from '../interfaces';
console.log(firestoreInstance);
const notificationsRouter = express.Router();
notificationsRouter.get('/', function(req, res) {
    getNotificationCountsAndIDs("nabil110176@gmail.com").then((result:CountAndIds[])=>{
        res.send(JSON.stringify(result));        
    }).catch(ex=>{
        logException("nabil110176@gmail.com",ex);
        res.send(`{"Error":"true"}`);
    })
});
export default notificationsRouter;