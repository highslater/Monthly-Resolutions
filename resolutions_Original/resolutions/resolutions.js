
Resolutions = new Mongo.Collection('resolutions');

if (Meteor.isClient) {
    Meteor.subscribe("resolutions");
    Template.body.helpers({
        resolutions: function() {
            if (Session.get('HF')) {
                return Resolutions.find({checked: {$ne: true}});
            }
            else {
                return Resolutions.find();
            }
        }, // end of resolutions
        HF: function() {
            return Session.get('HF');
        }
    }); // end of Template.body.helpers

    Template.body.events({
        'submit .new-resolution': function(event) {
            var title = event.target.title.value;
            Meteor.call('addResolution', title);
            event.target.title.value = "";
            return false;
        }, // end of submit .new-resolution
        'change .hide-finished': function(event) {
            Session.set('HF', event.target.checked);
        } // end of change .hide-finished
    }); // end of Template.body.events

    Template.resolution.helpers({
        isOwner: function() {
           return this.owner === Meteor.userId();
        },
    }); // end of Template.resolutions.helpers

    Template.resolution.events({
        'click .toggle-checked': function() {
            Meteor.call('updateResolution', this._id, !this.checked )
        }, // end of click .toggle-checked
        'click .delete': function() {
           Meteor.call('deleteResolution', this._id); 
        }, // end of click .delete
        'click .toggle-private': function() {
            Meteor.call('setPrivate', this._id, !this.private)
        }, // end of click .toggle-checked
    }); // end of Template.resolution.events
    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    }); // end of  Accounts.ui.config
} // end of if (Meteor.isClient)

if (Meteor.isServer) {
    Meteor.startup(() => {
        // code to run on server at startup
    }); // end of Meteor.startup
    Meteor.publish("resolutions", function() {
        return Resolutions.find({
            $or: [
                {private: {$ne: true}},
                {owner: this.userId}
            ]
        })
    }); // end of Meteor.publish
} // end of if (Meteor.isServer)

Meteor.methods({
    addResolution: function(title) {
        Resolutions.insert({
                title: title,
                createdAt: new Date(),
                owner: Meteor.userId()
        }); // end of Resolutions.insert
    }, // end of addResolution
    updateResolution: function(id, checked) {
        var res = Resolutions.findOne(id);
        if (res.owner !== Meteor.userId()) {
            throw new Meteor.Error('Not-Authorized');
        }
        Resolutions.update(id, {$set:{checked: checked}});
    }, // end of updateResolution
    deleteResolution: function(id) {
        var res = Resolutions.findOne(id);
        if (res.owner !== Meteor.userId()) {
            throw new Meteor.Error('Not-Authorized');
        }
        Resolutions.remove(id);
    }, // end of deleteResolution
    setPrivate: function(id, private) {
        var res = Resolutions.findOne(id);
        if (res.owner !== Meteor.userId()) {
            throw new Meteor.Error('Not-Authorized');
        }
        Resolutions.update(id, {$set:{private: private}});
    }, // end of setPrivate
}); // end of Meteor.methods