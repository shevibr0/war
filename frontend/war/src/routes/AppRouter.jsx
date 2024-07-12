import React from 'react'
import Login from '../components/Login'
import HomePage from '../components/HomePage'
import { Route, Routes } from 'react-router'
import Soldiers from '../components/Soldiers'
import SoldierInfo from '../components/SoldierInfo'
import Recepies from '../components/Recepies'
import AddRecipe from '../components/AddRecipe'
import Remembers from '../components/Remembers'
import AddRemember from '../components/AddRemember'
import AddPicture from '../components/AddPicture'
import Pictures from '../components/Pictures'
import Register from '../components/Register'
import Contact from '../components/Contact'
import AddVolunteer from '../components/AddVolunteer'
import Theilim from '../components/Theilim'
import Voleenteerings from '../components/Voleenteerings'
import LogOut from '../components/LogOut'


export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logOut" element={<LogOut />} />
            <Route path="/register" element={<Register />} />
            <Route path="/homePage" element={<HomePage />} />
            <Route path="/soldiers" element={<Soldiers />} />
            <Route path="/soldierInfo/:id/recepies" element={<Recepies />} />
            <Route path="/soldierInfo/:id/memories" element={<Remembers />} />
            <Route path="soldierInfo/:id/memories/:memoryId/editMemory" element={<AddRemember />} />
            <Route path="/soldierInfo/:id/pictures" element={<Pictures />} />
            <Route path="/soldierInfo/:id/theilim" element={<Theilim />} />
            <Route path="/soldierInfo/:id/volunteering" element={<Voleenteerings />} />
            <Route path="/soldierInfo/:id/volunteering/:optionId/editVolunteering" element={<AddVolunteer />} />
            <Route path="soldierInfo/:id/addRecepy" element={<AddRecipe />} />
            <Route path="soldierInfo/:id/recepies/:recipeId/editRecipe" element={<AddRecipe />} />
            <Route path="soldierInfo/:id/addMemory" element={<AddRemember />} />
            <Route path="soldierInfo/:id/addPicture" element={<AddPicture />} />
            <Route path="soldierInfo/:id/addVolunteer" element={<AddVolunteer />} />
            <Route path="/soldierInfo/:id" element={<SoldierInfo />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<h1>404</h1>} />
        </Routes >
    )
}
