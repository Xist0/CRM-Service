import React from 'react'
import Header from '../Header'
import Messenger from './messenger/Messenger'

function Employees() {
  return (
    <div>
      <Header />
      <div className="container-box">

        Работники
      </div>
      <Messenger />
    </div>
  )
}

export default Employees