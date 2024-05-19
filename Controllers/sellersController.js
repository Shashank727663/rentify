const { mongoose } = require("mongoose");
const properties = require("../Models/selersModel")
// get all listing from db for a user through token
const getListings = async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    let { limit = 10, offset = 0 } = req.query;

    limit = parseInt(limit);
    offset = parseInt(offset);

    // Validate limit and offset
    if (isNaN(limit) || isNaN(offset) || limit <= 0 || offset < 0) {
      return res.status(400).json({ message: "Invalid limit or offset" });
    }

    // Perform pagination query
    const listings = await properties
      .find({ sellerId: user._id })
      .limit(limit)
      .skip(offset);

    if (!listings || listings.length === 0) {
      return res.status(404).json({ message: "No listings found" });
    }

    res.status(200).json({ listings });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// add listing to db
const addListing = async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    const {
      place,
      area,
      numberOfBedRooms,
      numberOfBathRooms,
      price,
      numberOfHospitals,
      numberOfColleges
    } = req.body;

    const listing = await properties.create({
      place: place,
      area: area,
      numberOfBedRooms: numberOfBedRooms,
      numberOfBathRooms: numberOfBathRooms,
      price: price,
      numberOfHospitals: numberOfHospitals,
      numberOfColleges: numberOfColleges,
      sellerId: user._id,
      seller: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber
      }
    });
    res.status(201).json({ listing });
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ message: "Server error", err });
  }
};

//delete the entry from the db
const deleteListing = async (req, res) => {
  try {
    const user = req.user;
    const listing = await properties.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "No listing found" });
    }

    if (listing.sellerId.toString() !== user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await properties.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Listing deleted" });
  } catch (error) {
    
    return res.status(500).json({ message: "Server error", error });
  }
};

// update the listing in the db
const updateListing = async (req, res) => {
  try {
    const user = req.user;
    const {
      place,
      area,
      numberOfBedRooms,
      numberOfBathRooms,
      price,
      numberOfHospitals,
      numberOfColleges
    } = req.body;
    const listing = await properties.findById(req.params.id);
    console.log(user)
    if (!listing) {
      return res.status(404).json({ message: "No listing found" });
    }
   
    if(new mongoose.Types.ObjectId(listing.sellerId).toString() !== new mongoose.Types.ObjectId(user._id).toString()){
      return res.status(401).json({ message: "Not authorized" });
    }
    listing.place = place;
    listing.area = area;
    listing.numberOfBedRooms = numberOfBedRooms;
    listing.numberOfBathRooms = numberOfBathRooms;
    listing.price = price;
    listing.numberOfHospitals = numberOfHospitals;
    listing.numberOfColleges = numberOfColleges;
    await listing.save();
    res.status(200).json({ listing });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error", error });
  }
};

const getListForOneEnrtry = async(req,res) => {
  try {
    const listing = await properties.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: "No listing found" });
    }
    res.status(200).json({ listing });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }

}




module.exports = { getListings, addListing, deleteListing, updateListing  , getListForOneEnrtry };
