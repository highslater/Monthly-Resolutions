import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Resolutions } from '../api/resolutions.js';
import './body.html';
import './resolution.html';



Template.resolution.helpers({
    isOwner: function() {
        return this.owner === Meteor.userId();
    }, // end of isOwner
}); // end of Template.resolution.helpers

Template.resolution.events({
    'click .toggle-checked': function() {
        Meteor.call('resolution.update', this._id, !this.checked);
    }, // end of click .toggle-checked
    'click .toggle-private': function() {
        Meteor.call('resolution.setPrivate', this._id, !this.private)
    }, // end of click .toggle-private
    'click .delete': function() {
        Meteor.call('resolution.delete', this._id);
    }, // end of click .delete
}); // end of Template.resolution.events
