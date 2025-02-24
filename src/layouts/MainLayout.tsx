import { useState } from 'react';
import Header from './Header';
import SideBar from './SideBar';
import Content from './Content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserGraduate, 
  faChalkboardTeacher, 
  faUserTie, 
  faBook, 
  faCog, 
  faUser,
  faLock,
    faCalendar
} from '@fortawesome/free-solid-svg-icons';
import { HomeIcon } from '@heroicons/react/24/outline';
function MainLayout() {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  return (
    <div className='bg-layoutBgColor dark:bg-layoutBgDarkColor min-h-screen'>
      <Header isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <SideBar 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
        menu={[ 
          {
            label: "Tableau de bord",
            icon: <HomeIcon className="h-5 w-5" />, 
            path: "/dashboard"
          },
          {
            label: "Etudiants",
            icon: <FontAwesomeIcon icon={faUserGraduate} className="h-5 w-5" />, 
            path: "/students"
          },
          {
            label: "Classes",
            icon: <FontAwesomeIcon icon={faChalkboardTeacher} className="h-5 w-5" />, 
            path: "/classes"
          },
          {
            label: "Professeurs",
            icon: <FontAwesomeIcon icon={faUserTie} className="h-5 w-5" />, 
            path: "/professors"
          },
          {
            label: "Cours",
            icon: <FontAwesomeIcon icon={faBook} className="h-5 w-5" />, 
            path: "/matieres"
          },
            {
                label: "Année Académique",
                icon: <FontAwesomeIcon icon={faCalendar} className="h-5 w-5" />,
                path: "/matieres"
            },
          {
            label: "Paramètres",
            icon: <FontAwesomeIcon icon={faCog} className="h-5 w-5" />, 
            path: "/settings",
            children: [
              {
                label: "Mon profil",
                icon: <FontAwesomeIcon icon={faUser} className="h-5 w-5" />, 
                path: "/settings/profile"
              },
              {
                label: "Mot de passe",
                icon: <FontAwesomeIcon icon={faLock} className="h-5 w-5" />, 
                path: "/settings/manage-password"
              },
            ]
          },
        ]}
      />
      <Content isCollapsed={isCollapsed} />
    </div>
  );
}

export default MainLayout;
