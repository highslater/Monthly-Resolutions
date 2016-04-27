import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Resolutions } from '../api/resolutions.js';
import './body.html';


Template.body.helpers({
    resolutions: function() {
        // see the newest tasks first.
        return Resolutions.find({}, { sort: {createdAt: -1} });
    } // end of resolutions
}); // end of Template.body.helpers

Template.body.events({
    'submit .new-resolution': function(event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const text = target.text.value; 

        // Insert a task into the collection
        Resolutions.insert({
            text,
            createdAt: new Date() // current time
        }); // end of Resolutions.insert

        // Clear form
        target.text.value = "";

    } // end of submit .new-resolution
}); // end of Template.body.events