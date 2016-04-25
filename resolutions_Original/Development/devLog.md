<!-- devLog -->
###Meteor For Everyone Tutorial #1 - Installing Meteor & Creating a Project:  


####Console Output:
```Console  
@mint64 ~/Monthly_Resolutions/resolutions_Original 
$ meteor create resolutions

Created a new Meteor app in 'resolutions'.    

To run your new app:                          
  cd resolutions                              
  meteor                                      
                                              
If you are new to Meteor, try some of the learning resources here:
  https://www.meteor.com/learn                
                                              
@mint64 ~/Monthly_Resolutions/resolutions_Original 
$ cd resolutions

@mint64 ~/Monthly_Resolutions/resolutions_Original/resolutions 
$ ls -hal

total 28K
drwxr-xr-x 5 highslater highslater 4.0K Apr 23 21:50 .
drwxr-xr-x 4 highslater highslater 4.0K Apr 23 21:50 ..
drwxr-xr-x 2 highslater highslater 4.0K Apr 23 21:50 client
-rw-r--r-- 1 highslater highslater   13 Apr 23 21:50 .gitignore
drwxr-xr-x 3 highslater highslater 4.0K Apr 23 21:50 .meteor
-rw-r--r-- 1 highslater highslater  152 Apr 23 21:50 package.json
drwxr-xr-x 2 highslater highslater 4.0K Apr 23 21:50 server
@mint64 ~/Monthly_Resolutions/resolutions_Original/resolutions 
$ meteor

=> Started proxy.                             
=> Started MongoDB.                           
=> Started your app.                          

=> App running at: http://localhost:3000/

```


####client/main.html  

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

####client/main.js  

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

####server/main.js  

```JavaScript

import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

```


####Web Output:  

![devImages/Selection_001.png](devImages/Selection_001.png)

###Change File Structure:

####From:

![../resolutions/Images/Selection_002.png](../resolutions/Images/Selection_002.png)  

####To:  

![../resolutions/Images/Selection_003.png](../resolutions/Images/Selection_003.png) 

###And Change Files to:  

####resolutions.html  

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

####resolutions.js  

```JavaScript  
if (Meteor.isClient) {
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
  }

if (Meteor.isServer) {
  Meteor.startup(() => {
    // code to run on server at startup
  });
}
```