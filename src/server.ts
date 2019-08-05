import * as express from 'express';
import notificationsRouter from "./NotificationsRouter/notifications-router";
const expressAppInstance=express();
//set json parsing for incoming reqeust
expressAppInstance.use(express.json());
//set headers for cors
expressAppInstance.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
//set routers
expressAppInstance.use("/notifications",notificationsRouter);

export default expressAppInstance;



// var resp={};  
// fetch("https://us-central1-test-project-1-ba9d5.cloudfunctions.net/getStudents/students").then(function(response){
//         // perform setState here
// 		response.text().then(t=>console.log(t))
//     });