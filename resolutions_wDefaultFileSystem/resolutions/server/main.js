import { Meteor } from 'meteor/meteor';

Resolutions = new Mongo.Collection('resolutions');

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish('resolutions', function() {
    return Resolutions.find({
        $or: [
            {private: { $ne: true }},
            { owner: this.userId}
        ] // end of $or
    }); // end of Resolutions.find
}); // end of Meteor.publish

Meteor.methods({ // add to client/main.js also (or not) or add a stub to client
    addResolution: function(title) {
        Resolutions.insert({
            title: title,
            createdAt: new Date(),
            owner: Meteor.userId()
        }); // end of Resolutions.insert
    }, // end of addResolutions
    updateResolution: function( id, checked) {
        var res = Resolutions.findOne(id);
        if (res.owner !== Meteor.userId()) {
            throw new Meteor.Error('Not Authorized');
        } // end of if
        Resolutions.update(id, {
            $set: {
                checked: checked
            } // end of $set
        }); // end of Resolutions.update
    }, // end of updateResolution
    setPrivate: function(id, private) {
        var res = Resolutions.findOne(id);
        if (res.owner !== Meteor.userId()) {
            throw new Meteor.Error('Not Authorized');
        } // end of if
        Resolutions.update(id, {
            $set: {
                private: private
            } // end of $set
        }); // end of Resolutions.update
    }, // end of setPrivate
    deleteResolution: function(id) {
        var res = Resolutions.findOne(id);
        if (res.owner !== Meteor.userId()) {
            throw new Meteor.Error('Not Authorized');
        } // end of if
        Resolutions.remove(id);
    }, // end of deleteResolution



}); // end of Meteor.methods
