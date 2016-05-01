import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Resolutions = new Mongo.Collection('resolutions');

if (Meteor.isServer) {
    Meteor.publish('resolutions', function resolutionsPublication() {
        return Resolutions.find();
    }); // end of Meteor.publish
} // end of if (Meteor.isServer)


Meteor.methods({
    'resolutions.insert': function(text) {
         Resolutions.insert({
            text,
            createdAt: new Date(), // current time
            owner: Meteor.userId(),
            username: Meteor.users.findOne(this.userId).username
        }); // end of Resolutions.insert
    }, // end of resolutions.insert
    'resolution.update': function(id, checked) {
        Resolutions.update(id, {
            $set: {
                checked: checked,
            } // end of $set
        }); // end of Resolutions.update
    }, // end of resolutions.update
    'resolution.delete': function(id) {
        Resolutions.remove(id);
    }, // end of resolutions.delete
}); // end of Meteor.methods