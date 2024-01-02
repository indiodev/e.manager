import Env from '@ioc:Adonis/Core/Env'
import Route from '@ioc:Adonis/Core/Route'
import { LeiautesController } from 'App/Controllers/Http/LeiautesController'

Route.group(() => {
  Route.get('/active-list', LeiautesController.active_list)
  Route.post('/', LeiautesController.create)
  Route.get('/', LeiautesController.paginate)
  Route.get('/:id', LeiautesController.show)
  Route.patch('/:id/toggle-active', LeiautesController.toggle_active)
})
  .prefix('leiautes')
  .prefix(Env.get('PREFIX'))
