import React, { useEffect, useState } from 'react'
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom'
import {NavbarLinks} from '../../data/navbar-links';
import { ACCOUNT_TYPE } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { RxCross2 } from "react-icons/rx"
import { APIConnector } from '../../services/APIConnector';
import { categories } from '../../services/APIS';
import { logout } from '../../services/operations/authAPI';
import { VscSignOut } from 'react-icons/vsc';




const NavbarModal = ({setNavbarModal}) => {

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const {totalItems} = useSelector((state) => state.cart);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false);
  


    const fetchSubLinks = async() => {
      setLoading(true);
      try{
        const result = await APIConnector("GET", categories.CATEGORIES_API);
        console.log("Printing SubLinks result : ", result);
        setSubLinks(result.data.data);
  
      }
      catch(err){
        console.log("Could not fetch the category list ",err);
      }
      setLoading(false);
    }
  
  
  
    useEffect(()=>{
      fetchSubLinks();
    },[]);

    

    const matchRoute = (route)=>{
        return matchPath({path:route}, location.pathname);
    }


  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-richblack-900 bg-opacity-10 backdrop-blur-sm md:hidden'>   
        <div className='w-11/12 h-[98%] flex flex-col gap-10  rounded-lg border border-richblack-400 bg-richblack-800 p-6'>


            <div className='flex justify-end items-center'>
                <button onClick={()=> setNavbarModal(false)}
                    className="bg-richblack-700 px-[20px] py-[8px] rounded-md font-semibold text-richblack-5 hover:bg-pink-300"
                >
                    <RxCross2 size={20}/>
                </button>
            </div>


            <div className='w-[100%] h-full flex flex-col justify-between'>
              {/* Nav Links */}
              <nav className='block md:hidden'>
                <ul className='flex flex-col gap-5 text-richblack-25'>
                  {
                    NavbarLinks.map((element, index)=>{
                      return (
                        <li key={index}>
                          {
                            element.title === 'Catalog' ?
                            (<div className={`relative flex flex-row items-center font-semibold gap-1 group
                              ${matchRoute("/catalog/:catalogName") ? "text-yellow-25" : "text-richblack-25"}
                            `}>
                              <p>{element.title}</p>
                              <IoIosArrowDropdownCircle/>

                              <div className='invisible absolute left-[30%] top-[50%] translate-x-[-50%]
                              translate-y-[3em] flex flex-col rounded-lg bg-richblack-5 p-4
                              text-richblack-900 opacity-0 transition-all duration-150
                              group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 w-[200px] lg:w-[300px] z-[1000]'>
                              
                                <div className='absolute left-[10%] top-0 h-6 w-6 rotate-45 rounded
                                bg-richblack-5 translate-x-[80%] translate-y-[-40%] select-none'>
                                </div>

                                { 
                                  loading ? 
                                  (<p className='text-center'>Loading...</p>) :
                                  subLinks.length ? 
                                    (
                                      subLinks
                                        ?.map((subLink, index)=> (
                                          <Link to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                                            key={index}
                                            onClick={()=> setNavbarModal(false)}
                                            className='rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50'
                                          >
                                            <p>{subLink.name}</p>
                                          </Link>
                                        )) 
                                    ) : 
                                    (
                                      <p className='text-center'>No courses Found</p>
                                    )

                                }
                              </div>

                            </div>) : 
                            (
                              <Link to={element?.path}>
                                <p className={`${matchRoute(element?.path) ? "text-yellow-25" : "text-richblack-25"} font-semibold`}
                                  onClick={()=> setNavbarModal(false)}
                                >
                                  {element.title}
                                </p>
                              </Link>
                            ) 
                          }
                        </li>
                      )
                    })
                  }
                </ul>
              </nav>


              {/* Login / SingUp / Dashboard */}
              <div className='flex flex-col items-center gap-y-4 md:hidden'>
                  {
                    user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                      <Link to="/dashboard/cart" 
                        className='relative mb-10'
                        onClick={()=> setNavbarModal(false)}
                      >
                        <AiOutlineShoppingCart size={30} fill="#00FF00"/>
                        {
                          totalItems > 0 && (
                            <span className='absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center
                            overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold 
                            text-yellow-100'>
                              {totalItems}
                            </span>
                          )
                        }
                      </Link>
                    )
                  }

                  {
                    token === null && (
                      <Link to="/login" onClick={()=> setNavbarModal(false)}>
                        <button className='w-[220px] border border-richblack-700 bg-richblack-700 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                          Log in
                        </button>
                      </Link>
                    )
                  }
                  {
                    token === null && (
                      <Link to="/signup" onClick={()=> setNavbarModal(false)}>
                        <button className='w-[220px] border border-richblack-700 bg-richblack-700 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                          Sign up
                        </button>
                      </Link>
                    )
                  }

                  {
                    token !== null && (
                      <Link to="/dashboard/my-profile" onClick={()=> setNavbarModal(false)}>
                        <button className='w-[220px] font-semibold border border-yellow-100 bg-yellow-50 px-[12px] py-[8px] text-richblack-900 rounded-md'>
                            Go to Dashboard
                        </button>
                      </Link>
                    )
                  }
                  {
                    token !== null && (
                      <div onClick={()=>{
                        dispatch(logout(navigate))
                        setNavbarModal(false)
                      }}
                      className='w-[220px] font-semibold border border-pink-300 bg-pink-300 flex justify-center items-center gap-x-4 px-[10px] py-[12px] rounded-md'
                      >
                        <VscSignOut className='text-lg'/>
                        Logout
                      </div>
                    )
                  }


              </div>
              

            </div>




        </div>




    </div>
  )
}

export default NavbarModal