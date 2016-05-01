import { Meteor } from 'meteor/meteor';

Resolutions = new Mongo.Collection('resolutions');

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish('resolutions', function() {
    return Resolutions.find();
});

Meteor.methods({ // add to client/main.js also (or not) or add a stub to client
    addResolution: function(title) {
        Resolutions.insert({
            title: title,
            createdAt: new Date()
        }); // end of Resolutions.insert
    }, // end of addResolutions

    updateResolution: function( id, checked) {
        Resolutions.update(id, {
            $set: {
                checked: checked
            } // end of $set
        }); // end of Resolutions.update
    }, // end of updateResolution

    deleteResolution: function(id) {
        Resolutions.remove(id);
    }, // end of deleteResolution


}); // end of Meteor.methods
