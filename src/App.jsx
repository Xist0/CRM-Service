import { useState } from 'react'
import './App.css'
import './index.css'
import Header from './components/Header'
import AppMedia from './components/AppMedia'
import Messenger from './components/pages/messenger/Messenger'

function App() {


  return (
    <>
      <Header />
      <AppMedia/>
      <Messenger/>
    </>
  )
}

export default App
