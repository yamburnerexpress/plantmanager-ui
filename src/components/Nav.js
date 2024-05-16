import React, {useState, useEffect, useRef} from 'react';
import { useAuth } from '../hooks/AuthProvider';
import { LuMenu } from "react-icons/lu";
import { trapFocus } from '../helpers/trapFocus';
import { Link } from 'react-router-dom';

// const SlideOutMenu = () => {
//   return (
//     <div className='bg-slate-700 bg-opacity-70 z-40 fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto'>
//       <div className='bg-white w-64 h-full fixed z-50'>
//       </div>
//     </div>
//   )
// }

export const Nav = (props) => {
  const {logOut} = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleClose = () => setMenuOpen(false);

  useEffect(() => {
    if (menuOpen) {
      trapFocus(menuRef, handleClose);
    }
  }, [menuOpen]);

  return (
    <nav>
      <div className='flex gap-x-5 items-center h-16 shadow-md p-2 pb-2 bg-white fixed top-0 w-full z-10'>
        <button onClick={() => setMenuOpen(true)}>
          <LuMenu />
        </button>
        <h1 className='text-2xl font-bold'>{props.title}</h1>
        {/* <Button variant='square' className='ms-auto h-fit' onClick={() => logOut()}>Logout</Button> */}
      </div>
      {menuOpen && 
        <div onClick={handleClose} className='bg-slate-700 bg-opacity-70 z-40 fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto'>
          <div ref={menuRef} autoFocus onClick={(e) => e.stopPropagation()} className='relative bg-white w-fit h-full fixed z-50'>
            <span className='p-3 flex justify-end w-full h-fit'>
              <button onClick={handleClose} className=''>X</button>
            </span>
            
            <ul className='w-64 pl-3'>
              <li>
                <Link to='/myplants'>My Plants</Link>
              </li>
              <li>
                <Link to='/changepassword'>Change Password</Link>
              </li>
              <li>
                <button className='ms-auto h-fit' onClick={() => logOut()}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      }
    </nav>
  )
}

