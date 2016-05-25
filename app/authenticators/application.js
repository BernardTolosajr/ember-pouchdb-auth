import Ember from 'ember';
import PouchDB from 'pouchdb';
import config from 'pouchdb-auth/config/environment';
import Base from 'ember-simple-auth/authenticators/base';

export default Base.extend({
  init() {
    this._super(...arguments);

    let owner = Ember.getOwner(this);
    let remoteDb = new PouchDB(config.emberPouch.remoteDb, {skipSetup: true});

    this.db = remoteDb;
  },
  restore(properties) {
    const propertiesObject = Ember.Object.create(properties);

    return new Ember.RSVP.Promise((resolve, reject) => {
      if (!Ember.isEmpty(propertiesObject.get('name'))) {
        resolve(properties);
      } else {
        reject();
      }
    });
  },

  authenticate(username, password) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      this.db.login(username, password).then((response) => {
        Ember.run(function() {
          resolve({
              name: response.name
          });
        });
      }).catch((e) => {
        Ember.run(function() {
          reject(e);
        });
      })
    });
  },

  invalidate(data) {
    return this.db.logout();
  }
});
