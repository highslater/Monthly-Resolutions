import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.body.helpers({
    resolutions: [
        {title: "Hello Resolution #1"},
        {title: "Hello Resolution #2"}, 
        {title: "Hello Resolution #3"} 
    ]
}); // end of Template.body.helpers
