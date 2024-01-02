import Env from '@ioc:Adonis/Core/Env'
import Route from '@ioc:Adonis/Core/Route'
import { AuthController } from 'App/Controllers/Http/AuthController'

Route.group(() => {
  Route.post('/login', AuthController.login)
  Route.post('/register', AuthController.register)
  Route.post('/logout', AuthController.logout)
})
  .prefix('auth')
  .prefix(Env.get('PREFIX'))
