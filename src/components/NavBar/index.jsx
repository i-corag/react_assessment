import { NavLink } from "react-router-dom"
import './navbar.css'

const NavBar = ({ className }) => {

    return (
        <ul className={className}>
            <li className='navbar_link'>
                <NavLink to='/' className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Home</NavLink>
            </li>
            <li className='navbar_link'>
                <NavLink to='/blog' className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Blog</NavLink>
            </li>
        </ul>
    )
}

export default NavBar