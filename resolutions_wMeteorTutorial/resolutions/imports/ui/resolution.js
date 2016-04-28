import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Resolutions } from '../api/resolutions.js';
import './body.html';
import './resolution.html';

Template.resolution.events({
    'click .toggle-checked': function() {
        Resolutions.update(
            this._id, {
            $set: {
                checked: !this.checked
            }, // end of $set
        }); // end of Resolutions.update
    }, // end of click .toggle-checked

    'click .delete': function() {
        Resolutions.remove(this._id);
    }, // end of click .delete

}); // end of Template.resolution.events