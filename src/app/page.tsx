"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import Main from './views/main';
import SideVar from './views/sidevar';
import BoarderVar from './views/boardervar';

export default function Home() {
  const [connection, setConnection] = useState<string>('');

  const connectionString = () => {
    axios.get('http://localhost:6974/').then((resp)=>{
      setConnection(resp.data);
    }).catch((error) => {
      setConnection(error.message);
    })
  };

  useEffect(() => {
    connectionString();
  }, []);

  return (
    <Main>
        <SideVar></SideVar>
        <BoarderVar></BoarderVar>
      {connection}
    </Main>
  )
}
