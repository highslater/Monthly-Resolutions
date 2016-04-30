import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Resolutions = new Mongo.Collection('resolutions');

Template.body.helpers({
    resolutions: function() {
        if (Session.get('hideFinished')) {
            return Resolutions.find({checked: {$ne: true}});
        } // end of if 
        else {
            return Resolutions.find();
        } // end of else    
    }, // end of resolutions

    hideFinished: function() {
        return Session.get('hideFinished');
    }, // end of hideFinished
}); // end of Template.body.helpers

Template.body.events( {
    'submit .new-resolution': function(event) {
        var title = event.target.title.value;
        Meteor.call('addResolution', title); 
        event.target.title.value = "";
        return false;
    }, // end of submit .new-resolution

    'change .hide-finished': function(event) {
        Session.set('hideFinished', event.target.checked);
    }, // end of change .hide-finished
});

Template.resolution.events({

    'click .toggle-checked': function () {
        Resolutions.update(this._id, {
            $set: {
                checked: !this.checked
            } // end of $set
        }); // end of Resolutions.update
    }, // end of click .toggle-checked

    'click .delete': function () {
        Resolutions.remove(this._id);
    }, // end of click .delete
}); // end of Template.resolution.events


Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});

// Meteor.methods({ // add to server/main.js also
//     addResolution: function(title) {
//        Resolutions.insert({
//             title: title,
//             createdAt: new Date()
//         }); // end of Resolutions.insert
//    }, // end of addResolutions
// }); // end of Meteor.methods


