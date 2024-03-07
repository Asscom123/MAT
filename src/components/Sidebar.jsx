import { NavLink } from "react-router-dom";
import { FaBars} from "react-icons/fa";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import './Sidebar.css'
import {FaUserCircle} from 'react-icons/fa';
import {CiLogin} from 'react-icons/ci';
import {LuUsers2} from 'react-icons/lu';
import {IoIosMenu} from 'react-icons/io';
import {IoDocumentTextOutline, IoDocumentText} from 'react-icons/io5';
import 'bootstrap/dist/css/bootstrap.min.css'
const routes = [
  {
    path: "/perfil",
    name: "Perfil",
    icon: <FaUserCircle />,
  },
  {
    path: "/usuarios",
    name: "Usuarios",
    icon: <LuUsers2 />,
  },
  {
    path: "/RAD",
    name: "RAD",
    icon: <IoDocumentTextOutline />,
  },
  {
    path: "/RAM",
    name: "RAM",
    icon: <IoDocumentText />,
  },
  {
    path: "/",
    name: "Cerrar Sesión",
    icon: <CiLogin />,
  },
];

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  
  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <IoIosMenu onClick={toggle} />
            </div>
          </div>
        
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
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
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
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

export default Sidebar;