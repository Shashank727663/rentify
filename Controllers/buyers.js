const properties = require("../Models/selersModel");

const getAllListings = async (req, res) => {
  try {
    let { limit = 10, offset = 0 } = req.query;

    limit = parseInt(limit);
    offset = parseInt(offset);

    // Validate limit and offset
    if (isNaN(limit) || isNaN(offset) || limit <= 0 || offset < 0) {
      return res.status(400).json({ message: "Invalid limit or offset" });
    }

    // Perform pagination query
    const listings = await properties.find().limit(limit).skip(offset);

    res.status(200).json({ listings });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const sendEmail = async (req, res) => {
  try {
    const user = req.user;

    const client = new SMTPClient({
      user: "user",
      password: "password",
      host: "smtp.your-email.com",
      ssl: true,
    });

    client.send(
      {
        text: "i hope this works",
        from: "shashankkrishu99@gmail.com",
        to: "user.email",
        subject: "testing emailjs",
      },
      (err, message) => {
        console.log(err || message);
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error sending email", error });
  }
};

const IncreaseLikes = async (req, res) => {
  try {
    const listing = await properties.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: "No listing found" });
    }
    listing.Likes += 1;
    await listing.save();
    res.status(200).json({ listing });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getAllListings, IncreaseLikes, sendEmail };
