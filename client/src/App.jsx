import './App.css'
import {Routes, Route, Navigate} from "react-router-dom"
import UserForms from './views/UserForms'
import GameDevCatalog from './components/GameDevCatalog'
import { Header } from './components/Header'
import GameEngineEntryForm from './components/GameEngineEntryForm'
import ProtectRoutes from './util/ProtectRoutes'
import GameDevViewById from './components/GameDevViewById'

function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Navigate to="/gamedev/register/login"/>}/>
        <Route path='/gamedev/register/login' element={<UserForms/>}/>
        <Route path='/gamedev/catalog' element={
          <ProtectRoutes>
            <GameDevCatalog/>
          </ProtectRoutes>
          }/>
        <Route path='/gamedev/create' element={
          <ProtectRoutes>
            <GameEngineEntryForm/>
          </ProtectRoutes>
          }/>
        <Route path='/:id/details' element={
          <ProtectRoutes>
            <GameDevViewById/>
          </ProtectRoutes>
          }/>
        <Route path='/:id/edit' element={
          <ProtectRoutes>
            <GameEngineEntryForm/>
          </ProtectRoutes>
          }/>
      </Routes>
    </>
  )
}

export default App
