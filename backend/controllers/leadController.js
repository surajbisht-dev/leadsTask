const axios = require("axios");
const Lead = require("../models/Lead");

// I added this to get full country names
const countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

exports.processLeads = async (req, res) => {
  try {
    const { names } = req.body;

    if (!names) {
      return res.status(400).json({ message: "Names required" });
    }

    const nameArray = names
      .split(",")
      .map((n) => n.trim())
      .filter((n) => n);

    const results = await Promise.all(
      nameArray.map(async (name) => {
        const apiRes = await axios.get(
          `https://api.nationalize.io?name=${name}`
        );

        const countryData = apiRes.data.country.sort(
          (a, b) => b.probability - a.probability
        )[0];

        const probability = countryData ? countryData.probability : 0;
        const countryCode = countryData ? countryData.country_id : "Unknown";

        // full country name
        let country = "Unknown";
        if (countryCode && countryCode !== "Unknown") {
          country = countries.getName(countryCode, "en") || countryCode;
        }

        const status = probability >= 0.6 ? "Verified" : "To Check";

        const lead = await Lead.create({
          name,
          country,
          probability,
          status,
        });

        return lead;
      })
    );

    res.json({ message: "Processed successfully", data: results });
  } catch (err) {
    console.error("BACKEND ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getLeads = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const leads = await Lead.find(filter).sort({ _id: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
