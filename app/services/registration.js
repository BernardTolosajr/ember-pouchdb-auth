import Ember from 'ember';
import config from 'pouchdb-auth/config/environment';
import PouchDB from 'pouchdb';

export default Ember.Service.extend({
  init() {
    this._super(...arguments);

    let owner = Ember.getOwner(this);
    let remoteDb = new PouchDB(config.emberPouch.remoteDb, {skipSetup: true});

    this.db = remoteDb;
  },

  register(username, password) {
    return this.db.signup(username, password);
  },

  getUser(username) {
    return this.db.getUser(username);
  }
});
