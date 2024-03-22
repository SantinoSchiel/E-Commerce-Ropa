import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home/homeTest/homeTest'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route>
          <Route path="/" element={<Home/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
