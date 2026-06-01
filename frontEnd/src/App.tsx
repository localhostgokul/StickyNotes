import { isMobile, MobileView } from 'react-device-detect'
import NotesProvider from './context/NotesProvider'
import NotePage from './pages/NotePage'
import './App.css'

function App() {

  return (
    isMobile ? <MobileView style={{ margin: 10, textAlign: 'center' }}>
      <h2>Not Compatible with mobile screens..</h2>
    </MobileView> :
    <div id='app'>
      <NotesProvider>
        <NotePage/>
      </NotesProvider>
    </div>
  )
}

export default App;