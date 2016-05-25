import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),

  actions: {
    authenticate() {
      let { identification, password } = this.get('currentModel');
      this.get('session').authenticate('authenticator:application', identification, password)
      .then(() => { this.transitionTo('todos') })
      .catch((reason) => {
        console.log(reason.message);
      });
    }
  },

  model() {
    return {
      identification: '',
      password: ''
    }
  }
});
