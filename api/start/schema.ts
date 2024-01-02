import Env from '@ioc:Adonis/Core/Env'
import Route from '@ioc:Adonis/Core/Route'
import { SchemasController } from 'App/Controllers/Http/SchemasController'

Route.group(() => {
  Route.post('/mapping', SchemasController.mapping)
  Route.post('/generate', SchemasController.generate)
  Route.post('/builk', SchemasController.bulk)
})
  .prefix('schemas')
  .prefix(Env.get('PREFIX'))
