import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
export const Resolutions = new Mongo.Collection('resolutions');

if (Meteor.isServer) {
    Meteor.publish('resolutions', function resolutionsPublication() {
        return Resolutions.find({
            $or: [
                { private: { $ne: true } },
                { owner: this.userId },
            ], // end of $or
        }); // end of return Resolutions.find
    }); // end of Meteor.publish
} // end of if (Meteor.isServer)

Meteor.methods({
    'resolutions.insert': function(text) {
        Resolutions.insert({
            text,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.users.findOne(this.userId).username
        }); // end of Resolutions.insert
    }, // end of resolutions.insert
    'resolution.update': function(id, checked) {
        var res = Resolutions.findOne(id);
        if (res.owner !== Meteor.userId()) {
            throw new Meteor.Error('Not Authorized');
        }
        Resolutions.update(id, {
            $set: {
                checked: checked,
            } // end of $set
        }); // end of Resolutions.update
    }, // end of resolutions.update
    'resolution.setPrivate': function(id, private) {
        const res = Resolutions.findOne(id);
        if (res.owner !== Meteor.userId()) {
            throw new Meteor.Error('Not Authorized');
        }
        Resolutions.update(id, { $set: { private: private } });
    }, // end of resolution.setPrivate
    'resolution.delete': function(id) {
        var res = Resolutions.findOne(id);
        if (res.owner !== Meteor.userId()) {
            throw new Meteor.Error('Not Authorized');
        }
        Resolutions.remove(id);
    }, // end of resolutions.delete
}); // end of Meteor.methods
