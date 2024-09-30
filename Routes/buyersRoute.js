const expres  = require('express');
const router = expres.Router();

const {getAllListings  , IncreaseLikes , sendEmail} = require('../Controllers/buyers');

const protect = require('../middlewares/authmiddleware');


router.route("/all").get(protect , getAllListings);
 router.route("/email").post(protect , sendEmail);
 router.route("/likes/:id").put(protect , IncreaseLikes);
module.exports = router;