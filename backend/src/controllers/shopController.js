import _ from 'lodash';
import mongoose from "mongoose";
import {ShopSchema} from "../models/shopModel";
import {UserSchema} from "../models/userModel";


const Shop = mongoose.model('Shop', ShopSchema);
const User = mongoose.model('User', UserSchema);


/////////////////////////////////////////////////////////////////////
// Credit to : https://www.geodatasource.com/developers/javascript //
/////////////////////////////////////////////////////////////////////
export const getNearbyshops = async (req, res) => {
    let myLocation = [req.body.location.latitude, req.body.location.longitude];
    try {
        let shops = await Shop.find({});
        shops = _.sortBy(shops, [(s) => {
            let radlat1 = Math.PI * myLocation[0] / 180;
            let radlat2 = Math.PI * s.location.coordinates[0] / 180;
            let theta = myLocation[1] - s.location.coordinates[1];
            let radtheta = Math.PI * theta / 180;
            let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            dist = dist * 1.609344;
            return dist;
        }]);
        let start = 0, end = 10;
        if (req.query.pageSize && req.query.pageNb) {
            start = req.query.pageSize * req.query.pageNb;
            end =  start + parseInt(req.query.pageSize);
            console.log(start +'  '+ end + ' '+req.query.pageNb+' '+req.query.pageSize);
        }
        res.status(200).json({shops: shops.slice(start, end)});
    } catch (e) {
        console.log(e);
    }
};



export const getPreferedShops = async (req, res) => {
    let user = await User.findOne({_id: req.decoded._id});
    let myLocation = [req.body.location.latitude, req.body.location.longitude];
    Shop.find({ _id: {$in: user.likedShops}}, async (error, success) => {
        if (error) {
            console.log(error);
            res.status(400).send(error);
        } else {
            console.log(success);
            success = await _.sortBy(success, [(s) => {
                let radlat1 = Math.PI * myLocation[0] / 180;
                let radlat2 = Math.PI * s.location.coordinates[0] / 180;
                let theta = myLocation[1] - s.location.coordinates[1];
                let radtheta = Math.PI * theta / 180;
                let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                if (dist > 1) {
                    dist = 1;
                }
                dist = Math.acos(dist);
                dist = dist * 180 / Math.PI;
                dist = dist * 60 * 1.1515;
                dist = dist * 1.609344;
                return dist;
            }]);
            res.status(200).json({likedShops: success});
        }
    });
};

export const addPreferredShop = (req, res)=>{
    User.update({_id: req.decoded._id}, {$push: {likedShops: req.body.shopId}}, function (error, success) {
        if (error) {
            res.status(400).send("not added");
        } else {
            res.status(200).send("added successfully");
        }
    });
};

export const removePreferredShop = (req, res)=>{
    User.update({_id: req.decoded._id}, {$pull: {likedShops: req.body.shopId}}, function (error, success) {
        if (error) {
            res.status(400).send("net removed");
        } else {
            res.status(200).send("removed successfully");
        }
    });
};

export const addDislikedShop = (req, res) => {
    User.update({_id: req.decoded._id}, {$push: {dislikedShops: {_id: '5a0c6b83fd3eb67969316dd5', dislikeTime: Date.now()}}}, function (error, success) {
        if (error) {
            res.status(400).send("not added");
        } else {
            res.status(200).send("added successfully");
        }
    });
};
