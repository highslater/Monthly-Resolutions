import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

Resolutions = new Mongo.Collection('resolutions');
Meteor.subscribe('resolutions');

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

Template.resolution.helpers({
    isOwner: function() {
        return this.owner === Meteor.userId();
    }, // end of isOwner
}); // end of Template.resolution.helpers

Template.resolution.events({
    'click .toggle-checked': function () {
       Meteor.call('updateResolution', this._id, !this.checked);
    }, // end of click .toggle-checked
    'click .toggle-private': function () {
       Meteor.call('setPrivate', this._id, !this.private);
    }, // end of click .toggle-private
    'click .delete': function () {
       Meteor.call('deleteResolution', this._id);
    }, // end of click .delete
}); // end of Template.resolution.events

Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});