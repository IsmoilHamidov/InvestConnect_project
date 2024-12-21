import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router/Router';
import { Toaster } from "@/components/ui/toaster"


function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <Toaster/>
    </div>
  );
}

export default App;
