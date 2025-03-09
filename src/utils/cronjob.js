const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const ConnectionRequestModel = require("../models/connectionRequest");
const sendEmail = require("./sendEmail");

cron.schedule("33 12 * * *", async () => {
  //sending mail to users who has received connnection request at morning 8am.
  console.log("running a task every minute" + new Date());
  try {
    //code to send mail
    const yesterday = subDays(new Date(), 0);
    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);
    const pendingRequests = await ConnectionRequestModel.find({
      status: "interested",
      createdAt: {
        $gte: yesterdayStart,
        $lt: yesterdayEnd,
      },
    }).populate("fromUserId toUserId");

    const listOfEmails = [
      ...new Set(
        pendingRequests.map((request) => {
          return request.toUserId.emailId;
        })
      ),
    ];
    for (const email of listOfEmails) {
      // sending mail to user
      try {
        const res = await sendEmail.run(
          `New Connection Request for you ${email}`,
          {
            text: `You have received a connection request from ${pendingRequests
              .filter((request) => request.toUserId.emailId === email)
              .map((request) => request.fromUserId.firstName)}`,
          },
          email
        );
      } catch (error) {
        console.log("Error in sending mail", error);
      }
    }
  } catch (error) {
    console.log("Error in sending mail", error);
  }
});
