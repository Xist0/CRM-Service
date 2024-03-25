import React from 'react'
import Header from '../Header'
import Messenger from './messenger/Messenger'
import { useSelector } from 'react-redux';
import Reg from './UserAutorizechions/Reg'

function Employees() {
  const role = useSelector((state) => state.auth.role);

  return (
    <div>
      <Header />
      <div className="container-box">

        {(role === 'Директор' || role === 'Бухгалтер') && (<Reg />)}
      </div>
      <Messenger />
    </div>
  )
}

export default Employees