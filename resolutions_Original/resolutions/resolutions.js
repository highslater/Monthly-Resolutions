

if (Meteor.isClient) {
  Template.body.helpers({
    resolutions: [
    {title: "Hello Resolution #1"},
    {title: "Hello Resolution #2"},
    {title: "Hello Resolution #3"}
    ]
  });
} // end of if (Meteor.isClient)

if (Meteor.isServer) {
} // end of if (Meteor.isServer)

