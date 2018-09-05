const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.post('/request', ctrlUser.userForm);
router.get('/myRequests/:email', ctrlUser.myRequests);
router.get('/allRequests', ctrlUser.allRequests);
router.delete('/delete/:id', ctrlUser.deletedoc);
router.put('/update/:id', ctrlUser.updatedoc);


module.exports = router;



