import { NavLink } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import './SidebarPersonal.css'
import {CiLogin, CiShoppingBasket} from 'react-icons/ci';
import {IoIosMenu} from 'react-icons/io';
import{MdOutlinePayment} from 'react-icons/md';
import {IoDocumentOutline} from 'react-icons/io5';
import { MdApartment } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";
import 'bootstrap/dist/css/bootstrap.min.css'
import SidebarMenuPersonal from "./SidebarMenuPersonal";
const routes = [
  {
    path: "/tareas",
    name: "Tareas asignadas",
    icon: <IoDocumentOutline />,
  },
  {
    path: "/mayoristas",
    name: "Mayoristas",
    icon: <MdApartment />,
  },
  {
    path: "/clientes",
    name: "Clientes",
    icon: <HiOutlineUserGroup />,
  },
  {
    path: "/ordenes-de-pago",
    name: "Orden de Pago",
    icon: <MdOutlinePayment />,
  },
  
  {
    path: "/",
    name: "Cerrar Sesión",
    icon: <CiLogin />,
  },
];

const SidebarPersonal = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  
  return (
    <>
      <div className="personal-main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",
          }}
          className={` personal-sidebar `}
        >
          <div className="personal-top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="personal-logo"
                >
                  
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="personal-bars">
              <IoIosMenu onClick={toggle} />
            </div>
          </div>
        
          <section className="personal-routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenuPersonal
                    setIsOpen={setIsOpen}
                    route={route}
                    
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="personal-link"
                  activeClassName="personal-active"
                >
                  <div className="personal-icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="personal-link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SidebarPersonal;