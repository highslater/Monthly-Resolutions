Resolutions = new Mongo.Collection('resolutions');

if (Meteor.isClient) {

  Template.body.helpers({
    resolutions: function() {
        return Resolutions.find();
    } // end of resolutions
  });// end of Template.body.helpers

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
  }); // end of Template.body.events

} // end of if (Meteor.isClient)

if (Meteor.isServer) {
} // end of if (Meteor.isServer)

