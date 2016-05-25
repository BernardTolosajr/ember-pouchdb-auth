import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    save() {
      let todo = this.get('currentModel');

      todo.save().then(() => {
        this.transitionTo('todos');
      });
    }
  },

  model() {
    return this.store.createRecord('todo');
  }
});
