import { NotificationItem } from "./../interfaces";
import * as express from "express";
import { getNotificationCountsAndIDs } from "../NotificationOperations/notifications-counts-and-ids-operations";
import { logException } from "../logger";
const notificationsRouter = express.Router();
notificationsRouter.get("/:user/:items", function(req, res) {
  getNotificationCountsAndIDs(req.params.user, req.params.items)
    .then((result: Array<NotificationItem>) => {
      // res.send("HELLO WORLD");
      res.send(JSON.stringify(result));
    })
    .catch(ex => {
      logException(req.params.user, ex);
      res.send(`{"Error":"true"}`);
    });
});
export default notificationsRouter;
