

import './App.css';
import { SnackbarProvider } from 'notistack';
import Home from './Components/Home/Home';

function App() {


  return (
    
      <SnackbarProvider>  
        <Home/>
        
        </SnackbarProvider>
        
    
  )
}

export default App
