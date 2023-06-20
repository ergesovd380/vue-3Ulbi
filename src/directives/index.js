import VFocus from './VFocus';
import VIntersection from './VIntersection';

const directives = [
  {name: 'focus', directive: VFocus},
  {name: 'intersection', directive: VIntersection}
]

export default {
  install(app) {
    directives.forEach(({name, directive}) => {
      app.directive(name, directive)
    })
  }
}
