import _ from 'lodash';
import mongoose from "mongoose";
import {ShopSchema} from "../models/shopModel";


const Shop = mongoose.model('Shop', ShopSchema);


/////////////////////////////////////////////////////////////////////
// Credit to : https://www.geodatasource.com/developers/javascript //
/////////////////////////////////////////////////////////////////////
export const getNearbyshops = async (req, res) => {
    let myLocation = [req.body.location.latitude, req.body.location.longitude];
    try {
        let shops = await Shop.find({});
        let sorted = _.sortBy(shops, [(s) => {
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
        if (req.query.npp && req.query.p) {
            start = await (0 + req.query.npp) * (req.query.p - 1);
            end = await start + req.query.npp ;
        }
        res.status(200).json({shops: sorted.slice(start, end)});
    } catch (e) {
        console.log(e);
    }
};