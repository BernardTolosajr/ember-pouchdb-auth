import Ember from 'ember';
import ESASession from "ember-simple-auth/services/session";

const { inject, computed} = Ember;

export default ESASession.extend({
  registration: inject.service(),

  currentUser: computed('isAuthenticated', function() {
     if (this.get('isAuthenticated')) {
        const name = this.get('session.authenticated.name');
        return new Ember.RSVP.Promise((resolve, reject) => {
          return this.get('registration')
          .getUser(name).then((user) => {
            this.set('user', user);
          });
        });
     }
  })
});
