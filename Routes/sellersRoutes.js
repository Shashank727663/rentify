const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authmiddleware')
const {getListings, addListing, deleteListing, updateListing , getListForOneEnrtry} = require('../Controllers/sellersController');

router.route("/all").get(protect , getListings);
router.route("/add").post(protect , addListing);
router.route("/delete/:id").delete(protect , deleteListing);
router.route("/update/:id").put(protect , updateListing);
router.route("/getOne/:id").get(protect , getListForOneEnrtry);

module.exports = router;