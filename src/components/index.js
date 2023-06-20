import UPosts from './UPosts.vue';
import UForm from './UForm.vue';
import UInput from './UI/UInput.vue';
import UButton from './UI/UButton.vue';
import UDialog from './UDialog.vue';
import Home from './Home.vue';
import Users from './users/Users.vue';
import About from './About.vue';
import Navbar from './UI/Navbar.vue';
import USelect from './UI/USelect.vue';

const components = [
  {name: 'UPosts', component: UPosts},
  {name: 'UForm', component: UForm},
  {name: 'UInput', component: UInput},
  {name: 'UButton', component: UButton},
  {name: 'UDialog', component: UDialog},
  {name: 'Home', component: Home},
  {name: 'Users', component: Users},
  {name: 'About', component: About},
  {name: 'Navbar', component: Navbar},
  {name: 'USelect', component: USelect}
]

export default {
  install(app) {
    components.forEach(({name, component}) => {
      app.component(name, component)
    })
  }
}
