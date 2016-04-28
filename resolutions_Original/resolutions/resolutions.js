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

    Template.resolution.events({

        'click .toggle-checked': function() {
            Resolutions.update(this._id, {
                $set: {
                    checked: !this.checked
                } // end of $set
            }); // end of Resolutions.update
    }, // end of click .toggle-checked

        'click .delete': function() {
            Resolutions.remove(this._id);
        }, // end of click .delete
    }); // end of Template.resolution.events
} // end of if (Meteor.isClient)

if (Meteor.isServer) {
} // end of if (Meteor.isServer)

