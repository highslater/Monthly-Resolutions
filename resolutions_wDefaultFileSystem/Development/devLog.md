<!-- devLog -->
###Meteor For Everyone Tutorial #1 - Installing Meteor & Creating a Project:  

######Console Output:

```Console

@mint64 ~/Monthly_Resolutions/resolutions_wDefaultFileSystem 
$ meteor create resolutions

Created a new Meteor app in 'resolutions'.    

To run your new app:                          
  cd resolutions                              
  meteor                                      
                                              
If you are new to Meteor, try some of the learning resources here:
  https://www.meteor.com/learn                
                                              
@mint64 ~/Monthly_Resolutions/resolutions_wDefaultFileSystem 
$ ls
Development  resolutions
@mint64 ~/Monthly_Resolutions/resolutions_wDefaultFileSystem 
$ cd resolutions
@mint64 ~/Monthly_Resolutions/resolutions_wDefaultFileSystem/resolutions 
$ ls -hal

total 28K
drwxr-xr-x 5 highslater highslater 4.0K Apr 24 21:21 .
drwxr-xr-x 4 highslater highslater 4.0K Apr 24 21:21 ..
drwxr-xr-x 2 highslater highslater 4.0K Apr 24 21:21 client
-rw-r--r-- 1 highslater highslater   13 Apr 24 21:21 .gitignore
drwxr-xr-x 3 highslater highslater 4.0K Apr 24 21:22 .meteor
-rw-r--r-- 1 highslater highslater  152 Apr 24 21:21 package.json
drwxr-xr-x 2 highslater highslater 4.0K Apr 24 21:21 server
@mint64 ~/Monthly_Resolutions/resolutions_wDefaultFileSystem/resolutions 
$ meteor

[[[[[ ~/Monthly_Resolutions/resolutions_wDefaultFileSystem/resolutions ]]]]]

=> Started proxy.                             
=> Started MongoDB.                           
=> Started your app.                          

=> App running at: http://localhost:3000/

```

######client/main.html  

```HTML

<head>
  <title>simple</title>
</head>

<body>
  <h1>Welcome to Meteor!</h1>

  {{> hello}}
  {{> info}}
</body>

<template name="hello">
  <button>Click Me</button>
  <p>You've pressed the button {{counter}} times.</p>
</template>

<template name="info">
  <h2>Learn Meteor!</h2>
  <ul>
    <li><a href="https://www.meteor.com/try">Do the Tutorial</a></li>
    <li><a href="http://guide.meteor.com">Follow the Guide</a></li>
    <li><a href="https://docs.meteor.com">Read the Docs</a></li>
    <li><a href="https://forums.meteor.com">Discussions</a></li>
  </ul>
</template>

```

######client/main.js

```JavaScript

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});

```

######server/main.js  

```JavaScript 

import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

```

######Web Output:  

![devImages/Selection_001.png](devImages/Selection_001.png)

###Meteor For Everyone Tutorial #3 - Views & Templates In Meteor:  

######client/main.html  

```HTML 

<head>
  <title>simple</title>
</head>

<body>
  <ul>

  {{#each resolutions}}
    {{> resolution}}
  {{/each}}

  </ul>
</body>

<template name="resolution">
  <li>{{title}}</li>
</template>

```

######client/main.js  

```JavaScript 

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

```

######Web Output:  

![devImages/Selection_002.png](devImages/Selection_002.png)

###Meteor For Everyone Tutorial #4 - Storing Data In Collections: 

######client/main.js 

```JavaScript 

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Resolutions = new Mongo.Collection('resolutions');

Template.body.helpers({
    resolutions: function() {
        return Resolutions.find();
    }
}); // end of Template.body.helpers

```

######server/main.js 

```JavaScript 

import { Meteor } from 'meteor/meteor';

Resolutions = new Mongo.Collection('resolutions');

Meteor.startup(() => {
  // code to run on server at startup
});

```
 

######Console Output:  

```Console  

@mint64 ~/Monthly_Resolutions/resolutions_wDefaultFileSystem/resolutions 
$ meteor mongo

MongoDB shell version: 2.6.7
connecting to: 127.0.0.1:3001/meteor
meteor:PRIMARY> db.resolutions.insert({title:"Hello Resolution #1", createdAt: new Date()});
WriteResult({ "nInserted" : 1 })
meteor:PRIMARY> db.resolutions.insert({title:"Hello Resolution #2", createdAt: new Date()});
WriteResult({ "nInserted" : 1 })
meteor:PRIMARY> db.resolutions.insert({title:"Hello Resolution #3", createdAt: new Date()});
WriteResult({ "nInserted" : 1 })
meteor:PRIMARY> 

```

######Web Output:

![devImages/Selection_003.png](devImages/Selection_003.png)

###Meteor For Everyone Tutorial #5 - Adding Data With Forms:

######client/main.html  


```HTML  

<head>
  <title>simple</title>
</head>

<body>
  <div class="container">
        <header>
            <h1>Monthly Resolutions</h1>
            <form class="new-resolution">
                <input type="text" name="title" placeholder="A New Resolution">
                <input type="submit" value="Submit">
            </form>
        </header>
        <ul>
              {{#each resolutions}}
                {{> resolution}}
              {{/each}}
        </ul> 
  </div>
</body>

<template name="resolution">
  <li>{{title}}</li>
</template>

```

######client/main.js  

```JavaScript  

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Resolutions = new Mongo.Collection('resolutions');

Template.body.helpers({
    resolutions: function() {
        return Resolutions.find();
    }, // end of resolutions
}); // end of Template.body.helpers

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
});

```


![devImages/Selection_004.png](devImages/Selection_004.png)

###Meteor For Everyone Tutorial #6 - Deleting & Updating Collections In Meteor:  

######client/main.html  

```HTML  

<head>
    <title>simple</title>
</head>

<body>
    <div class="container">
        <header>
            <h1>Monthly Resolutions</h1>
            <form class="new-resolution">
                <input type="text" name="title" placeholder="A New Resolution">
                <input type="submit" value="Submit">
            </form>
        </header>
        <ul>
            {{#each resolutions}}
            {{> resolution}}
            {{/each}}
      </ul> 
  </div>
</body>

<template name="resolution">
    <li class="{{#if checked}} checked {{/if}}">
        <input type="checkbox" checked="{{checked}}" class="toggle-checked">
        <span class="text">{{title}}</span>
        <button class="delete">Remove</button>
    </li>
</template>

```

######client/main.js  

```JavaScript  


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
});

Template.resolution.events({

    'click .toggle-checked': function () {
        Resolutions.update(this._id, {
            $set: {
                checked: !this.checked
            } // end of $set
        }); // end of Resolutions.update
    }, // end of click .toggle-checked

    'click .delete': function () {
        Resolutions.remove(this._id);
    }, // end of click .delete
}); // end of Template.resolution.events

```

######Web Output:  

![devImages/Selection_005.png](devImages/Selection_005.png)


###Meteor For Everyone Tutorial #7 - Temporary Session Data in Meteor:  

######Console Output:  

```Console

@mint64 ~/Monthly_Resolutions/resolutions_wDefaultFileSystem/resolutions 
$ meteor add session
                                              
Changes to your project's package version selections:
                                              
reactive-dict  added, version 1.1.7           
session        added, version 1.1.5

                                              
session: Session variable        

```

######client/main.html  


```HTML  

<head>
    <title>simple</title>
</head>

<body>
    <div class="container">
        <header>
            <h1>Monthly Resolutions</h1>
            <label class="hide-finished">
                <input type="checkbox" checked="{{hideFinished}}">
                Hide Finished Resolutions
            </label>
            <form class="new-resolution">
                <input type="text" name="title" placeholder="A New Resolution">
                <input type="submit" value="Submit">
            </form>
        </header>
        <ul>
            {{#each resolutions}}
            {{> resolution}}
            {{/each}}
      </ul> 
  </div>
</body>

<template name="resolution">
    <li class="{{#if checked}} checked {{/if}}">
        <input type="checkbox" checked="{{checked}}" class="toggle-checked">
        <span class="text">{{title}}</span>
        <button class="delete">Remove</button>
    </li>
</template>

```


######client/main.js  

```JavaScript  

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Resolutions = new Mongo.Collection('resolutions');

Template.body.helpers({
    resolutions: function() {
        if (Session.get('hideFinished')) {
            return Resolutions.find({checked: {$ne: true}});
        } // end of if 
        else {
            return Resolutions.find();
        } // end of else    
    }, // end of resolutions

    hideFinished: function() {
        return Session.get('hideFinished');
    }, // end of hideFinished
}); // end of Template.body.helpers

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

    'change .hide-finished': function(event) {
        Session.set('hideFinished', event.target.checked);
    }, // end of change .hide-finished
});

Template.resolution.events({

    'click .toggle-checked': function () {
        Resolutions.update(this._id, {
            $set: {
                checked: !this.checked
            } // end of $set
        }); // end of Resolutions.update
    }, // end of click .toggle-checked

    'click .delete': function () {
        Resolutions.remove(this._id);
    }, // end of click .delete
}); // end of Template.resolution.events

```


######Web Output:  

######Unchecked:  

![devImages/Selection_006.png](devImages/Selection_006.png)  

######checked:

![devImages/Selection_007.png](devImages/Selection_007.png)


###Meteor For Everyone Tutorial #9 - Easy User Accounts With Meteor Accounts UI:  


```Console  

@mint64 ~/Monthly_Resolutions/resolutions_wDefaultFileSystem/resolutions 
$ meteor add accounts-ui accounts-password
                                              
Changes to your project's package version selections:
                                              
accounts-base          added, version 1.2.7   
accounts-password      added, version 1.1.8
accounts-ui            added, version 1.1.9
accounts-ui-unstyled   added, version 1.1.12
ddp-rate-limiter       added, version 1.0.4
email                  added, version 1.0.12
less                   added, version 2.6.0
localstorage           added, version 1.0.9
npm-bcrypt             added, version 0.8.5
rate-limit             added, version 1.0.4
service-configuration  added, version 1.0.9
sha                    added, version 1.0.7
srp                    added, version 1.0.8
                                             
accounts-ui: Simple templates to add login widgets to an app
accounts-password: Password support for accounts

@mint64 ~/Monthly_Resolutions/resolutions_wDefaultFileSystem/resolutions 
$ meteor list

accounts-password      1.1.8  Password support for accounts
accounts-ui            1.1.9  Simple templates to add login widgets to an app
autopublish            1.0.7  (For prototyping only) Publish the entire datab...
blaze-html-templates   1.0.4  Compile HTML templates into reactive UI with Me...
ecmascript             0.4.3  Compiler plugin that supports ES2015+ in all .j...
es5-shim               4.5.10  Shims and polyfills to improve ECMAScript 5 su...
insecure               1.0.7  (For prototyping only) Allow all database write...
jquery                 1.11.8  Manipulate the DOM using CSS selectors
meteor-base            1.0.4  Packages that every Meteor app needs
mobile-experience      1.0.4  Packages for a great mobile user experience
mongo                  1.1.7  Adaptor for using MongoDB and Minimongo over DDP
reactive-var           1.0.9  Reactive variable
session                1.1.5  Session variable
standard-minifier-css  1.0.6  Standard css minifier used with Meteor apps by ...
standard-minifier-js   1.0.6  Standard javascript minifiers used with Meteor ...
tracker                1.0.13  Dependency tracker to allow reactive callbacks

```


######client/main.html  

```HTML  

<head>
    <title>simple</title>
</head>

<body>
    <div class="container">
        {{>loginButtons}}
        <header>
            <h1>Monthly Resolutions</h1>
            <label class="hide-finished">
                <input type="checkbox" checked="{{hideFinished}}">
                Hide Finished Resolutions
            </label>
        {{#if currentUser}}
            <form class="new-resolution">
                <input type="text" name="title" placeholder="A New Resolution">
                <input type="submit" value="Submit">
            </form>
        {{/if}}
        </header>
        <ul>
            {{#each resolutions}}
            {{> resolution}}
            {{/each}}
      </ul> 
  </div>
</body>

<template name="resolution">
    <li class="{{#if checked}} checked {{/if}}">
        <input type="checkbox" checked="{{checked}}" class="toggle-checked">
        <span class="text">{{title}}</span>
        <button class="delete">Remove</button>
    </li>
</template>

```


######client/main.js  

```JavaScript  

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Resolutions = new Mongo.Collection('resolutions');

Template.body.helpers({
    resolutions: function() {
        if (Session.get('hideFinished')) {
            return Resolutions.find({checked: {$ne: true}});
        } // end of if 
        else {
            return Resolutions.find();
        } // end of else    
    }, // end of resolutions

    hideFinished: function() {
        return Session.get('hideFinished');
    }, // end of hideFinished
}); // end of Template.body.helpers

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

    'change .hide-finished': function(event) {
        Session.set('hideFinished', event.target.checked);
    }, // end of change .hide-finished
});

Template.resolution.events({

    'click .toggle-checked': function () {
        Resolutions.update(this._id, {
            $set: {
                checked: !this.checked
            } // end of $set
        }); // end of Resolutions.update
    }, // end of click .toggle-checked

    'click .delete': function () {
        Resolutions.remove(this._id);
    }, // end of click .delete
}); // end of Template.resolution.events


Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});

```


######Web Output:  

![devImages/Selection_008.png](devImages/Selection_008.png)


###Meteor For Everyone Tutorial #14 - Making Your Meteor App More Secure:  

######Console Output:  


```Console  

@mint64 ~/Monthly_Resolutions/resolutions_wDefaultFileSystem/resolutions 
$ meteor remove insecure
                                              
Changes to your project's package version selections:
                                              
insecure  removed from your project           

insecure: removed dependency                  
@mint64 ~/Monthly_Resolutions/resolutions_wDefaultFileSystem/resolutions 
$ meteor list

accounts-password      1.1.8  Password support for accounts
accounts-ui            1.1.9  Simple templates to add login widgets to an app
autopublish            1.0.7  (For prototyping only) Publish the entire datab...
blaze-html-templates   1.0.4  Compile HTML templates into reactive UI with Me...
ecmascript             0.4.3  Compiler plugin that supports ES2015+ in all .j...
es5-shim               4.5.10  Shims and polyfills to improve ECMAScript 5 su...
jquery                 1.11.8  Manipulate the DOM using CSS selectors
meteor-base            1.0.4  Packages that every Meteor app needs
mobile-experience      1.0.4  Packages for a great mobile user experience
mongo                  1.1.7  Adaptor for using MongoDB and Minimongo over DDP
reactive-var           1.0.9  Reactive variable
session                1.1.5  Session variable
standard-minifier-css  1.0.6  Standard css minifier used with Meteor apps by ...
standard-minifier-js   1.0.6  Standard javascript minifiers used with Meteor ...
tracker                1.0.13  Dependency tracker to allow reactive callbacks

```


######client/main.js  

```JavaScript  

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Resolutions = new Mongo.Collection('resolutions');

Template.body.helpers({
    resolutions: function() {
        if (Session.get('hideFinished')) {
            return Resolutions.find({checked: {$ne: true}});
        } // end of if 
        else {
            return Resolutions.find();
        } // end of else    
    }, // end of resolutions

    hideFinished: function() {
        return Session.get('hideFinished');
    }, // end of hideFinished
}); // end of Template.body.helpers

Template.body.events( {
    'submit .new-resolution': function(event) {
        var title = event.target.title.value;
        Meteor.call('addResolution', title); 
        event.target.title.value = "";
        return false;
    }, // end of submit .new-resolution

    'change .hide-finished': function(event) {
        Session.set('hideFinished', event.target.checked);
    }, // end of change .hide-finished
});

Template.resolution.events({

    'click .toggle-checked': function () {
        Resolutions.update(this._id, {
            $set: {
                checked: !this.checked
            } // end of $set
        }); // end of Resolutions.update
    }, // end of click .toggle-checked

    'click .delete': function () {
        Resolutions.remove(this._id);
    }, // end of click .delete
}); // end of Template.resolution.events


Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});

// Meteor.methods({ // add to server/main.js also
//     addResolution: function(title) {
//        Resolutions.insert({
//             title: title,
//             createdAt: new Date()
//         }); // end of Resolutions.insert
//    }, // end of addResolutions
// }); // end of Meteor.methods

```

######server/main.js  

```JavaScript  

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

```


###Meteor For Everyone Tutorial #15 - Making Your App More Secure Part 2:

######client/main.js  

```JavaScript  

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Resolutions = new Mongo.Collection('resolutions');

Template.body.helpers({
    resolutions: function() {
        if (Session.get('hideFinished')) {
            return Resolutions.find({checked: {$ne: true}});
        } // end of if 
        else {
            return Resolutions.find();
        } // end of else    
    }, // end of resolutions

    hideFinished: function() {
        return Session.get('hideFinished');
    }, // end of hideFinished
}); // end of Template.body.helpers

Template.body.events( {
    'submit .new-resolution': function(event) {
        var title = event.target.title.value;
        Meteor.call('addResolution', title); 
        event.target.title.value = "";
        return false;
    }, // end of submit .new-resolution

    'change .hide-finished': function(event) {
        Session.set('hideFinished', event.target.checked);
    }, // end of change .hide-finished
});

Template.resolution.events({

    'click .toggle-checked': function () {
       Meteor.call('updateResolution', this._id, !this.checked);
    }, // end of click .toggle-checked
    'click .delete': function () {
       Meteor.call('deleteResolution', this._id);
    }, // end of click .delete
}); // end of Template.resolution.events

Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});

/*
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
*/

```


######server/main.js  


```JavaScript  

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

```


###Meteor For Everyone Tutorial #16 - Introduction to Publish & Subscribe:  

######Console Output:  


```Console  

@mint64 ~/Monthly_Resolutions/resolutions_wDefaultFileSystem/resolutions 
$ meteor remove autopublish
                                              
Changes to your project's package version selections:                                             
autopublish  removed from your project        
autopublish: removed dependency 

@mint64 ~/Monthly_Resolutions/resolutions_wDefaultFileSystem/resolutions 
$ meteor list

accounts-password      1.1.8  Password support for accounts
accounts-ui            1.1.9  Simple templates to add login widgets to an app
blaze-html-templates   1.0.4  Compile HTML templates into reactive UI with Me...
ecmascript             0.4.3  Compiler plugin that supports ES2015+ in all .j...
es5-shim               4.5.10  Shims and polyfills to improve ECMAScript 5 su...
jquery                 1.11.8  Manipulate the DOM using CSS selectors
meteor-base            1.0.4  Packages that every Meteor app needs
mobile-experience      1.0.4  Packages for a great mobile user experience
mongo                  1.1.7  Adaptor for using MongoDB and Minimongo over DDP
reactive-var           1.0.9  Reactive variable
session                1.1.5  Session variable
standard-minifier-css  1.0.6  Standard css minifier used with Meteor apps by ...
standard-minifier-js   1.0.6  Standard javascript minifiers used with Meteor ...
tracker                1.0.13  Dependency tracker to allow reactive callbacks

```


######client/main.js  


```JavaScript  

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Resolutions = new Mongo.Collection('resolutions');

Meteor.subscribe('resolutions');

Template.body.helpers({
    resolutions: function() {
        if (Session.get('hideFinished')) {
            return Resolutions.find({checked: {$ne: true}});
        } // end of if 
        else {
            return Resolutions.find();
        } // end of else    
    }, // end of resolutions

    hideFinished: function() {
        return Session.get('hideFinished');
    }, // end of hideFinished
}); // end of Template.body.helpers

Template.body.events( {
    'submit .new-resolution': function(event) {
        var title = event.target.title.value;
        Meteor.call('addResolution', title); 
        event.target.title.value = "";
        return false;
    }, // end of submit .new-resolution

    'change .hide-finished': function(event) {
        Session.set('hideFinished', event.target.checked);
    }, // end of change .hide-finished
});

Template.resolution.events({

    'click .toggle-checked': function () {
       Meteor.call('updateResolution', this._id, !this.checked);
    }, // end of click .toggle-checked
    'click .delete': function () {
       Meteor.call('deleteResolution', this._id);
    }, // end of click .delete
}); // end of Template.resolution.events

Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});

/*
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
*/

```

######server/main.js  

```JavaScript  

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

```

###Meteor For Everyone Tutorial #17 - Authorized Content Publishing & Methods Part 1:  

###Meteor For Everyone Tutorial #18 - Authorized Content Publishing & Methods Part 2:

######client/main.js  


```JavaScript  

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

Resolutions = new Mongo.Collection('resolutions');
Meteor.subscribe('resolutions');

Template.body.helpers({
    resolutions: function() {
        if (Session.get('hideFinished')) {
            return Resolutions.find({checked: {$ne: true}});
        } // end of if 
        else {
            return Resolutions.find();
        } // end of else    
    }, // end of resolutions
    hideFinished: function() {
        return Session.get('hideFinished');
    }, // end of hideFinished
}); // end of Template.body.helpers

Template.body.events( {
    'submit .new-resolution': function(event) {
        var title = event.target.title.value;
        Meteor.call('addResolution', title); 
        event.target.title.value = "";
        return false;
    }, // end of submit .new-resolution
    'change .hide-finished': function(event) {
        Session.set('hideFinished', event.target.checked);
    }, // end of change .hide-finished
});

Template.resolution.helpers({
    isOwner: function() {
        return this.owner === Meteor.userId();
    }, // end of isOwner
}); // end of Template.resolution.helpers

Template.resolution.events({
    'click .toggle-checked': function () {
       Meteor.call('updateResolution', this._id, !this.checked);
    }, // end of click .toggle-checked
    'click .toggle-private': function () {
       Meteor.call('setPrivate', this._id, !this.private);
    }, // end of click .toggle-private
    'click .delete': function () {
       Meteor.call('deleteResolution', this._id);
    }, // end of click .delete
}); // end of Template.resolution.events

Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});

```

######server/main.js  

```JavaScript  

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

```

######client/main.html  

```HTML  

<head>
    <title>simple</title>
</head>

<body>
    <div class="container">
        {{>loginButtons}}
        <header>
            <h1>Monthly Resolutions</h1>
            <label class="hide-finished">
                <input type="checkbox" checked="{{hideFinished}}">
                Hide Finished Resolutions
            </label>
        {{#if currentUser}}
            <form class="new-resolution">
                <input type="text" name="title" placeholder="A New Resolution">
                <input type="submit" value="Submit">
            </form>
        {{/if}}
        </header>
        <ul>
            {{#each resolutions}}
            {{> resolution}}
            {{/each}}
      </ul> 
  </div>
</body>

<template name="resolution">
    <li class="{{#if checked}} checked {{/if}}">
    {{#if isOwner}}
        <input type="checkbox" checked="{{checked}}" class="toggle-checked">
            <button class="toggle-private">
                {{#if private}}
                    Private
                {{else}}
                    Public
                {{/if}}
        </button>
    {{/if}}
        <span class="text">{{title}}</span>
    {{#if isOwner}}
        <button class="delete">Remove</button>
    {{/if}}
    </li>
</template>

```





