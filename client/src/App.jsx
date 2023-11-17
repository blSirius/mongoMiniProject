import './App.css'
import './index.css'

import Sidenav from './Sidenav';
import Content from './Content';

function App() {
  return (
    <>
      <div className='bg-gray-800 min-h-screen'>
        <Sidenav />
        <Content />
      </div>
    </>
  )
}

export default App