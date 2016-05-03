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
