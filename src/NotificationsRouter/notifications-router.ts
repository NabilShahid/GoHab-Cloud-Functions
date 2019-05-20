import { NotificationItems } from './../interfaces';
import * as express from 'express';
import { getNotificationCountsAndIDs } from '../DatabaseOperations/get-notification-counts-and-ids';
import { logException } from '../logger';
const notificationsRouter = express.Router();
notificationsRouter.get('/', function(req, res) {
    getNotificationCountsAndIDs("nabil110176@gmail.com").then((result:NotificationItems)=>{
        res.send(JSON.stringify(result));        
    }).catch(ex=>{
        logException("nabil110176@gmail.com",ex);
        res.send(`{"Error":"true"}`);
    })
});
export default notificationsRouter;