<!-- devLog same as resolutions_wMeteorTutorial -->

##Testing:


######Console Output:  

```Console  

@mint64 ~/Monthly_Resolutions/resolutions_wMeteorTutorialwTesting/resolutions 
$ meteor add practicalmeteor:mocha
                                                                                   
Changes to your project's package version selections:
                                              
coffeescript                    added, version 1.0.17
practicalmeteor:chai            added, version 2.1.0_1
practicalmeteor:loglevel        added, version 1.2.0_2
practicalmeteor:mocha           added, version 2.4.5_2
practicalmeteor:mocha-core      added, version 0.1.4
practicalmeteor:sinon           added, version 1.14.1_2
tmeasday:test-reporter-helpers  added, version 0.2.1
                                           
practicalmeteor:mocha: Write package tests with mocha and run them in the browser or
from the command line with spacejam.

@mint64 ~/Monthly_Resolutions/resolutions_wMeteorTutorialwTesting/resolutions 
$ meteor list

accounts-password      1.1.8  Password support for accounts
accounts-ui            1.1.9  Simple templates to add login widgets to an app
blaze-html-templates   1.0.4  Compile HTML templates into reactive UI with Meteor Blaze
ecmascript             0.4.3  Compiler plugin that supports ES2015+ in all .js files
es5-shim               4.5.10  Shims and polyfills to improve ECMAScript 5 support
jquery                 1.11.8  Manipulate the DOM using CSS selectors
meteor-base            1.0.4  Packages that every Meteor app needs
mobile-experience      1.0.4  Packages for a great mobile user experience
mongo                  1.1.7  Adaptor for using MongoDB and Minimongo over DDP
practicalmeteor:mocha  2.4.5_2  Write package tests with mocha and run them in the br...
reactive-dict          1.1.7  Reactive dictionary
reactive-var           1.0.9  Reactive variable
standard-minifier-css  1.0.6  Standard css minifier used with Meteor apps by default.
standard-minifier-js   1.0.6  Standard javascript minifiers used with Meteor apps by ...
tracker                1.0.13  Dependency tracker to allow reactive callbacks

@mint64 ~/Monthly_Resolutions/resolutions_wMeteorTutorialwTesting/resolutions 
$ meteor test --driver-package practicalmeteor:mocha

[[[[[ Tests ]]]]]                             

=> Started proxy.                             
=> Started MongoDB.                           
=> Started your app.                          

=> App running at: http://localhost:3000/
I20160503-15:49:59.140(-4)? MochaRunner.runServerTests: Starting server side tests
with run id J4wkE4dTRu6KeLQ3m
W20160503-15:49:59.142(-4)? (STDERR) MochaRunner.runServerTests: failures: 0

```

######imports/api/resolutions.test.js  


```JavaScript  

/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';
import { Resolutions } from './resolutions.js';

if (Meteor.isServer) {
    describe('Resolutions', () => {
        describe('methods', () => {
            const userId = 'testUserId';
            let resolutionId;
            beforeEach(() => {
                Resolutions.remove({}); // end of Resolutions.remove
                resolutionId = Resolutions.insert({
                    text: 'test resolution',
                    createdAt: new Date(),
                    owner: userId,
                    username: 'tmeasday',
                }); // end of Resolutions.insert
            }); // end of beforeEach
            it('can delete owned resolution', () => {
                const deleteResolution = Meteor.server.method_handlers['resolution.delete'];
                const invocation = { userId };
                deleteResolution.apply(invocation, [resolutionId]);
                assert.equal(Resolutions.find().count(), 0);
            }); // end of it('can delete owned resolution'
        }); // end of describe('methods'
    }); // end of describe('Resolutions'
} // end of if

```















