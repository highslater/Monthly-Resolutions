import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Resolutions } from '../api/resolutions.js';

import './resolution.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('resolutions');
}); // end of Template.body.onCreated

Template.body.helpers({
    resolutions: function() {
        const instance = Template.instance();
        if (instance.state.get('hideFinished')) {
            return Resolutions.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
        } // end of if
        else {
            // see the newest tasks first.
            return Resolutions.find({}, {sort: {createdAt: -1}});
        } // end of else
            // see the newest tasks first.
            return Resolutions.find({}, { sort: {createdAt: -1} });
    }, // end of resolutions

    incompleteCount: function() {
        return Resolutions.find({ checked: {$ne: true }}).count();
    }, // end of incompleteCount
}); // end of Template.body.helpers

Template.body.events({
    'submit .new-resolution': function(event) {
        // Prevent default browser form submit
        event.preventDefault();
        // Get value from form element
        const target = event.target;
        const text = target.text.value; 
        // Insert a task into the collection
            Meteor.call('resolutions.insert', text);
        // Clear form
        target.text.value = "";
    }, // end of submit .new-resolution

    'change .hide-finished input': function(event, instance) {
        instance.state.set('hideFinished', event.target.checked);
    }, // end of change .hide-finished input
}); // end of Template.body.events