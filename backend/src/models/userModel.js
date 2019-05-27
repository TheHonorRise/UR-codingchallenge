import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 16
    },
    likedShops: [
        {
            type: Schema.Types.ObjectId,
            ref: 'shops'
        }
    ],
    dislikedShops: [
        {
            _id: {
                type: Schema.Types.ObjectId,
                ref: 'shops'
            },
            dislikeTime: {
                type: Date,
                default: Date.now()
            }
        }
    ]
});