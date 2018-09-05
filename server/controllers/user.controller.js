const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');
const Employee = mongoose.model('Employee');

var ObjectId = require('mongoose').Types.ObjectId;

module.exports.register = (req, res, next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['This email is already registered.']);
            else
                return next(err);
        }

    });
}
//post=> http://localhost:3000/api/request
module.exports.userForm = (req, res, next) => {
    var employee = new Employee();
    employee.email = req.body.email,
    employee.projectname = req.body.projectname,
    employee.datacenter = req.body.datacenter,
    employee.ostype = req.body.ostype,
    employee.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            return next(err);
        }

    });
}



module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['fullName','email']) });
        }
    );
}
// =>   http://localhost:3000/api/myrequests/vivekratnesh001@gmail.com
//To get all docs using email
module.exports.myRequests = (req, res, next) =>{
  Employee.find({ email: req.params.email }, (err, employee) => {
       if (!err) { res.send(employee); }
        else { console.log('Error in Retriving Employee  by Id :' + JSON.stringify(err, undefined, 2)); }
       }
   );
}

// =>   http://localhost:3000/api/allrequests
//To get all docs
module.exports.allRequests = (req, res, next) =>{
    Employee.find((err, employee) => {
         if (!err) { res.send(employee); }
          else { console.log('Error in Retriving Employee  by Id :' + JSON.stringify(err, undefined, 2)); }
         }
     );
  }

/*odule.exports.myRequests = (req, res, next) =>{
    Employee.find((err, employee) => {
        if (!err) { res.send(employee); }
        else { console.log('Error in Retriving Employee  by Id :' + JSON.stringify(err, undefined, 2)); }
        }
    );
}*/

//http://localhost:3000/api/delete/5b81678069d55b2ea0da6ba2
module.exports.deletedoc = ('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});
 
// http://localhost:3000/api/update/5b81686669d55b2ea0da6ba4
module.exports.updatedoc = ('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var emp = {
        projectname: req.body.projectname,
        datacenter: req.body.datacenter,
        ostype: req.body.ostype,
    };
    //new: true in below line says if doc has to store new values or old values 
    Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); } 
        else { console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2)); }
    });
});
