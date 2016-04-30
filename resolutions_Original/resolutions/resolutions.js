Resolutions = new Mongo.Collection('resolutions'); 
    // because of its placement here,
    // this is loaded on the client and the server.


if (Meteor.isClient) {

    Template.body.helpers({
        resolutions: function() {
            if (Session.get('hideFinished')) {
               return Resolutions.find({checked: {$ne: true}}); 
            }// end of if
            else {
                return Resolutions.find();
            } // end of else
        }, // end of resolutions
        hideFinished: function() {
            return Session.get('hideFinished');
        }, // end of hideFinished
    });// end of Template.body.helpers

    Template.body.events( {
        'submit .new-resolution': function(event) {
            var title = event.target.title.value;
            Meteor.call('addResolution', title);
            event.target.title.value = "";
            return false;
        }, // end of submit .new-resolution

        'change .hide-finished': function(event) { // don't forget the dot
            Session.set('hideFinished', event.target.checked);
        }, // end of change hide-finished
    }); // end of Template.body.events

    Template.resolution.events({
        'click .toggle-checked': function() {
            Meteor.call('updateResolution', this._id, !this.checked )
        }, // end of click .toggle-checked
        'click .delete': function() {
            Meteor.call('deleteResolution', this._id);
        }, // end of click .delete
    }); // end of Template.resolution.events

    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY", // comma or not but not semi-colon
    });

} // end of if (Meteor.isClient)

if (Meteor.isServer) {
} // end of if (Meteor.isServer)

Meteor.methods({     // because of its placement here,
                                // this is loaded on the client and the server.
    addResolution: function(title) {
         Resolutions.insert({
            title: title,
            createdAt: new Date()
        }); // end of Resolutions.insert
    }, // end of addResolutions
    updateResolution: function(id, checked) {
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