import Ember from 'ember';


export default Ember.Route.extend({
  registration: Ember.inject.service(),

  actions: {
    register() {
      let { identification, password } = this.get('currentModel');

      this.get('registration').register(identification, password)
      .then(() => { this.transitionTo('login') })
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
