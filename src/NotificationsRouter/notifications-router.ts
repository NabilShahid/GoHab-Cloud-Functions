import { NotificationItems } from "./../interfaces";
import * as express from "express";
import { getNotificationCountsAndIDs } from "../DatabaseOperations/get-notification-counts-and-ids";
import { logException } from "../logger";
const notificationsRouter = express.Router();
notificationsRouter.get("/:user/:items", function(req, res) {
  getNotificationCountsAndIDs(req.params.user, req.params.items)
    .then((result: NotificationItems) => {
      res.send(JSON.stringify(result));
    })
    .catch(ex => {
      logException(req.params.user, ex);
      res.send(`{"Error":"true"}`);
    });
});
export default notificationsRouter;
