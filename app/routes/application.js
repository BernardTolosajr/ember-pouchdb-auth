import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  session: Ember.inject.service(),
  beforeModel() {
    if(this.get('session').get('isAuthenticated')) {
      this.transitionTo('todos');
    }
  }
});
