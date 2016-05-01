import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Resolutions } from '../api/resolutions.js';
import './body.html';
import './resolution.html';

Template.resolution.events({
    'click .toggle-checked': function() {
        Meteor.call('resolution.update', this._id, !this.checked);
    }, // end of click .toggle-checked
    'click .delete': function() {
        Meteor.call('resolution.delete', this._id);
    }, // end of click .delete
}); // end of Template.resolution.events