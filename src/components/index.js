import UPosts from './UPosts.vue';
import UForm from './UForm.vue';
import UInput from './UInput.vue';
import UButton from './UButton.vue';

const components = [
  {name: 'UPosts', component: UPosts},
  {name: 'UForm', component: UForm},
  {name: 'UInput', component: UInput},
  {name: 'UButton', component: UButton}
]

export default {
  install(app) {
    components.forEach(({name, component}) => {
      app.component(name, component)
    })
  }
}
