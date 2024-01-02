import Env from '@ioc:Adonis/Core/Env'
import Route from '@ioc:Adonis/Core/Route'
import { VersionsController } from 'App/Controllers/Http/VersionsController'

Route.group(() => {
  Route.post('/', VersionsController.create)
  Route.get('/', VersionsController.list)
})
  .prefix('versions')
  .prefix(Env.get('PREFIX'))
