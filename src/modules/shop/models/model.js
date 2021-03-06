'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ShopSchema = new Schema({
    name: {
        type: String,
        required: 'Please fill a Shop name',
    },
    user_id: {
        type: String
    },
    peoples:{
        type:String
    },
    image: {
        type: String
    },
    imagereview: {
        type: [String]
    },
    descreiption: {
        type: {
            title: {
                type: String
            },
            detail: {
                type: String
            }
        }
    },

    starttime: {
        type: String
    },
    endtime: {
        type: String
    },
    house_no: {
        type: String,
    },
    village: {
        type: String
    },
    subdistrict: {
        type: String
    },
    district: {
        type: String
    },
    province: {
        type: String
    },
    postalcode: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    createby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    },
    updateby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    }
});

mongoose.model("Shop", ShopSchema);