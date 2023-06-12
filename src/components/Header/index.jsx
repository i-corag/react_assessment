import { useLocation } from 'react-router-dom';
import NavBar from '../NavBar'
import './header.css'

const Header = () => {

    let curLoc = useLocation();

    return (
        <header>
            <div className='mask'></div>
            <div className='logo'></div>
            <NavBar className='navbar' />
            {curLoc.pathname == '/blog' && <h1>Blog</h1>}
        </header>
    )
}

export default Header