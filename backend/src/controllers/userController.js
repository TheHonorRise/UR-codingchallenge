import bcrypt from "bcrypt";
import mongoose from 'mongoose';
import { UserSchema } from './../models/userModel';
import config from './../../config';
import _ from 'lodash';
import jwt from 'jsonwebtoken';

const User = mongoose.model('User', UserSchema);

export const signUpUser = async (req, res) => {
    let newUser = new User(req.body);
    let hash = bcrypt.hashSync('myPassword', config.salt);

    newUser.password = hash;
    newUser.save((err, User)=>{
        if(err){
            res.status(400).json(err);
        }else {
            res.status(201).send('you can login now');
        }
    })
};

export const signInUser = async (req, res) => {
    let user = await User.findOne({email: req.body.email });
    console.log(user);
    console.log(req.body);
    if (!user) return res.status(404).json({error : "invalid email or password"});
    let pass = await bcrypt.compareSync(req.body.password, user.password);
    console.log(pass);
    if (!pass) {
        return res.status(404).send({error : "invalid email or password"});
    }
    const token = jwt.sign({_id: user._id}, config.secretKey);



    console.log(_.pick(user, ['_id', 'username', 'email']));
    res.status(200).json({
        access_token: token,
        user: _.pick(user, ['_id', 'username', 'email'])
    });
};



