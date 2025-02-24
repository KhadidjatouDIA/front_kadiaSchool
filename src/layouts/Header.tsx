import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../utils/hooks/useTheme";
import { confirmPopup } from "@/utils/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header({ isCollapsed }: HeaderProps) {
  const navigate = useNavigate();
  const { theme, handleLightMode, handleDarkMode, handleSystemMode } =
    useTheme();

  return (
    <div
      className={`${
        isCollapsed ? "ml-16" : "ml-64"
      } transition-all duration-300 ease-in-out h-[56px] fixed top-0 right-0 ${
        isCollapsed ? "w-[calc(100%-5rem)]" : "w-[calc(100%-16rem)]"
      }  flex items-center justify-between px-6 border-b border-dividergray backdrop-blur-lg bg-transparent z-10`}
    >
      <div className="flex items-center space-x-2">
        <button onClick={() => navigate(-1)} className="btn btn-text">
          <ArrowLeftIcon className="size-5 text-black dark:text-white" />
        </button>
        <button onClick={() => navigate(1)} className="btn btn-text">
          <ArrowRightIcon className="size-5 text-black dark:text-white" />
        </button>
      </div>

      <div className="flex items-center justify-end space-x-4">
        <Menu>
          <MenuButton className="btn btn-text">
            {theme === "dark" ? (
              <MoonIcon className="size-6 text-black dark:text-white" />
            ) : (
              <SunIcon className="size-6 text-black dark:text-white" />
            )}
          </MenuButton>
          <MenuItems
            anchor="bottom"
            className="min-w-28 p-2 rounded-lg bg-white border shadow-xl border-dividergray dark:bg-relevantDark z-50"
          >
            <MenuItem>
              <span
                className="block  cursor-pointer data-[focus]:bg-dividergray px-2 py-1 rounded-md text-black dark:text-white"
                onClick={() => handleLightMode()}
              >
                Clair
              </span>
            </MenuItem>
            <MenuItem>
              <span
                className="block cursor-pointer data-[focus]:bg-dividergray px-2 py-1 rounded-md text-black dark:text-white"
                onClick={() => handleDarkMode()}
              >
                Sombre
              </span>
            </MenuItem>
            <MenuItem>
              <span
                className="block cursor-pointer data-[focus]:bg-dividergray px-2 py-1 rounded-md text-black dark:text-white"
                onClick={() => {
                  handleSystemMode();
                }}
              >
                Système
              </span>
            </MenuItem>
          </MenuItems>
        </Menu>

        <Menu>
          <MenuButton className="flex items-center hover:cursor-pointer hover:bg-dividergray p-1 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="flex justify-center items-center rounded-full w-7 h-7 bg-dividergray text-gray-500">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <span className="text-sm text-black dark:text-white">Admin</span>
            </div>
            <ChevronDownIcon className="size-4 text-black dark:text-white" />
          </MenuButton>
          <MenuItems
            anchor="bottom"
            className="min-w-28 p-2 rounded-lg bg-white border border-dividergray dark:bg-relevantDark z-50"
          >
            <MenuItem>
              <span
                className=" text block cursor-pointer data-[focus]:bg-dividergray px-2 py-1 rounded-md"
                onClick={() => navigate("/myspace/profile")}
              >
                Mon profil
              </span>
            </MenuItem>
            <MenuItem>
              <span
                className="text block cursor-pointer data-[focus]:bg-dividergray px-2 py-1 rounded-md"
                onClick={() => navigate("/myspace/settings")}
              >
                Paramètres
              </span>
            </MenuItem>
            <MenuItem>
              <span
                className="text block cursor-pointer data-[focus]:bg-dividergray px-2 py-1 rounded-md"
                onClick={() => {
                  confirmPopup().then((response) => {
                    if (response.isConfirmed) {
                      navigate("/login");
                    }
                  });
                }}
              >
                Déconnexion
              </span>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
}

export default Header;
