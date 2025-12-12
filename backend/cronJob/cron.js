const cron = require("node-cron");
const Lead = require("../models/Lead");

cron.schedule("*/5 * * * *", async () => {
  console.log("Running CRM Sync Job...");

  const leads = await Lead.find({ status: "Verified", synced: false });

  for (let lead of leads) {
    console.log(
      `[CRM Sync] Sending verified lead ${lead.name} to Sales Team...`
    );
    lead.synced = true;
    await lead.save();
  }

  console.log("CRM Sync Completed");
});
