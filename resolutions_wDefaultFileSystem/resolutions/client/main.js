import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Resolutions = new Mongo.Collection('resolutions');

Template.body.helpers({
    resolutions: function() {
        return Resolutions.find();
    }, // end of resolutions
}); // end of Template.body.helpers

Template.body.events( {
    'submit .new-resolution': function(event) {
        var title = event.target.title.value;

        Resolutions.insert({
            title: title,
            createdAt: new Date()
        }); // end of Resolutions.insert

        event.target.title.value = "";
        return false;

    }, // end of submit .new-resolution
});
