import { createStore } from 'vuex';
import postStore from '@/store/postStore';
import userId from '@/store/userId';

export default createStore({
  modules: {
    post: postStore,
    user: userId
  }
})
