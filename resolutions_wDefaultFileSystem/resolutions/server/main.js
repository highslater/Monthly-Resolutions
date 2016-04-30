import { Meteor } from 'meteor/meteor';

Resolutions = new Mongo.Collection('resolutions');

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({ // add to client/main.js also (or not) or add a stub to client
    addResolution: function(title) {
       Resolutions.insert({
            title: title,
            createdAt: new Date()
        }); // end of Resolutions.insert
   }, // end of addResolutions
}); // end of Meteor.methods
