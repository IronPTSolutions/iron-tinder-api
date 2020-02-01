const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema (
    {
        userA: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Likes',
            required: true
        }
    },    

    {
        userB: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Likes',
            required: true
        }
    },

    {
        timestamp: true, 
        toJSON: {
            transform: (doc, ret) => {
                ret.id = doc._id; 
                delete ret._id; 
                delete ret._v; 
                return ret
            }
        }
    }
);

const Matchs = new mongoose.model('Matchs', matchSchema);

module.exports = Matchs; 