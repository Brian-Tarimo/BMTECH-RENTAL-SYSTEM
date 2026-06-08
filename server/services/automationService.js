const cron = require("node-cron");

const Invoice = require("../models/Invoice");
const Notification = require("../models/Notification");

/*
=========================================
OVERDUE RENT CHECK
Runs every day at midnight
=========================================
*/
const runOverdueCheck = () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      const today = new Date();

      const overdueInvoices = await Invoice.find({
        dueDate: { $lt: today },
        status: { $ne: "Paid" },
      });

      for (const invoice of overdueInvoices) {
        await Notification.create({
          title: "Rent Overdue",
          message: `Invoice ${invoice.invoiceNumber} is overdue. Please clear your rent.`,
          type: "Rent",
          recipientRole: "Tenant",
        });
      }

      console.log(
        `Overdue check completed. ${overdueInvoices.length} invoices found.`
      );
    } catch (error) {
      console.error("Overdue Check Error:", error);
    }
  });
};

/*
=========================================
RENT DUE REMINDERS
Runs every day at 9 AM
=========================================
*/
const runDueReminders = () => {
  cron.schedule("0 9 * * *", async () => {
    try {
      const today = new Date();

      const threeDaysLater = new Date();
      threeDaysLater.setDate(today.getDate() + 3);

      const upcomingInvoices = await Invoice.find({
        dueDate: {
          $gte: today,
          $lte: threeDaysLater,
        },
        status: { $ne: "Paid" },
      });

      for (const invoice of upcomingInvoices) {
        await Notification.create({
          title: "Rent Reminder",
          message: `Your rent invoice ${invoice.invoiceNumber} is due soon.`,
          type: "Rent",
          recipientRole: "Tenant",
        });
      }

      console.log(
        `Due reminders completed. ${upcomingInvoices.length} invoices found.`
      );
    } catch (error) {
      console.error("Due Reminder Error:", error);
    }
  });
};

/*
=========================================
EXPORTS
=========================================
*/
module.exports = {
  runOverdueCheck,
  runDueReminders,
};