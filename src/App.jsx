import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './routes/MainPage'
import LoginPage from './routes/LoginPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/login' element={<LoginPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
