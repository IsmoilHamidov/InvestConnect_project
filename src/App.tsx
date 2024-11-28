import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Router/Router'


function App() {
  return (
      <div>
          <h1>App</h1>
          <RouterProvider router={router}/>
      </div>
  )
}

export default App
