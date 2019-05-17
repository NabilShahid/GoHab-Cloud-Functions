import * as express from 'express';
import firestoreInstance from "../firebase";
import { getNotificationCountsAndIDs } from '../DatabaseOperations/get-notification-counts-and-ids';
console.log(firestoreInstance);
const notificationsRouter = express.Router();
notificationsRouter.get('/', function(req, res) {
    getNotificationCountsAndIDs("nabil110176@gmail.com").then((result:any)=>{
        res.send(result);        
    })
});
export default notificationsRouter;