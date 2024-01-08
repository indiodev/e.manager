import Env from '@ioc:Adonis/Core/Env'
import Route from '@ioc:Adonis/Core/Route'
import { SchemaController } from 'App/Controllers/Http/SchemaController'

Route.group(() => {
  Route.post('/build', SchemaController.build)
  Route.post('/mapping', SchemaController.mapping)
  Route.get('/paginate', SchemaController.paginate)
  Route.get('/:e_social_id/report', SchemaController.report)
  Route.get('/:e_social_id', SchemaController.show)
})
  .prefix('schemas')
  .prefix(Env.get('PREFIX'))
