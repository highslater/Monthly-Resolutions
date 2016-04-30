import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Resolutions = new Mongo.Collection('resolutions');

Meteor.methods({

    'resolutions.insert': function(text) {
 //       check(text, String);
 //       // Make sure the user is logged in before inserting a task
 //       if (! this.userId) {
 //         throw new Meteor.Error('not-authorized');
 //       }
         Resolutions.insert({
            text,
            createdAt: new Date(), // current time
            owner: Meteor.userId(),
            username: Meteor.users.findOne(this.userId).username
        }); // end of Resolutions.insert
    }, // end of resolutions.insert

}); // end of Meteor.methods