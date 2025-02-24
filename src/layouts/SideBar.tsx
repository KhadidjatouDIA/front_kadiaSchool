import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronDownIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/logo.png"; // Assure-toi que le chemin est correct

interface SideBarProps {
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  isCollapsed: boolean;
  menu?: MenuItemProps[];
}

interface MenuItemProps {
  label: string;
  icon: React.ReactNode;
  path?: string;
  children?: MenuItemProps[];
}

function SideBar({ isCollapsed, setIsCollapsed, menu }: SideBarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isPathActive = (path: string) => {
    return location.pathname === path || location.pathname.includes(path);
  };

  return (
      <div
          className={`fixed z-10 h-full top-0 left-0 ${
              isCollapsed ? "w-20" : "w-64"
          } transition-all duration-300 ease-in-out bg-white dark:bg-sideBarBgColorDark`}
      >
        <div className="w-full h-[56px] flex flex-row items-center px-2">
          <img
              src={logo}
              alt="Logo"
              className={`h-10 transition-all duration-300 ${
                  isCollapsed ? "mx-auto" : "ml-4"
              }`}
          />
          {!isCollapsed && (
              <span className="ml-2 text-[#f18710] font-bold text-black dark:text-white">
                KhadijAcademy
            </span>
          )}
          <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="btn btn-text absolute -right-2 top-4 rounded-full border border-dividergray bg-white dark:bg-relevantDark"
          >
            {isCollapsed ? (
                <ChevronDoubleRightIcon className="size-3 text-black dark:text-white" />
            ) : (
                <ChevronDoubleLeftIcon className="size-3 text-black dark:text-white" />
            )}
          </button>
        </div>
        <ul className="py-4 px-2 overflow-x-hidden overflow-y-auto h-[80vh] space-y-2">
          {menu?.map((item: MenuItemProps, index: number) =>
              item.children && item.children.length ? (
                  isCollapsed ? (
                      <Popover key={index} className="relative">
                        <PopoverButton as="ul">
                          <div
                              key={index}
                              className={`w-full h-10 rounded-lg px-2 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-dividergray hover:cursor-pointer space-x-2 ${
                                  isPathActive(item.path as string) ? "bg-dividergray" : ""
                              }`}
                          >
                    <span
                        className={`${
                            isPathActive(item.path as string)
                                ? "text-[#f18710]"
                                : ""
                        }`}
                    >
                      {item.icon}
                    </span>
                          </div>
                        </PopoverButton>
                        <PopoverPanel
                            as="ul"
                            anchor="right"
                            className="flex flex-col p-2 rounded-md bg-white border border-dividergray dark:bg-relevantDark"
                        >
                          {item.children.map((child: MenuItemProps, index2: number) => (
                              <li
                                  key={index2}
                                  onClick={() => navigate(child.path as string)}
                                  className={`w-full h-8 rounded-md px-2 flex items-center text-gray-700 dark:text-gray-200 hover:bg-dividergray hover:cursor-pointer space-x-2 ${
                                      isPathActive(child.path as string) ? "bg-dividergray" : ""
                                  } ${isCollapsed ? "justify-center" : ""}`}
                              >
                      <span
                          className={`${
                              isPathActive(child.path as string)
                                  ? "text-[#f18710]"
                                  : ""
                          }`}
                      >
                        {child.icon}
                      </span>
                                <span
                                    className={`${
                                        isPathActive(child.path as string)
                                            ? "text-[#f18710]"
                                            : ""
                                    }`}
                                >
                        {child.label}
                      </span>
                              </li>
                          ))}
                        </PopoverPanel>
                      </Popover>
                  ) : (
                      <Disclosure
                          key={index}
                          as="div"
                          defaultOpen={false}
                          className="transition-all duration-300 ease-in-out"
                      >
                        <DisclosureButton className="group flex w-full items-center justify-between">
                          <div
                              className={`w-full h-10 rounded-lg px-2 flex items-center justify-between text-gray-700 dark:text-gray-200 hover:bg-dividergray hover:cursor-pointer space-x-2 `}
                          >
                            <div className="flex items-center space-x-2">
                      <span
                          className={`${
                              isPathActive(item.path as string)
                                  ? "text-primaryColor-500"
                                  : ""
                          }`}
                      >
                        {item.icon}
                      </span>
                              <span
                                  className={`${
                                      isPathActive(item.path as string)
                                          ? "text-[#f18710]"
                                          : ""
                                  }`}
                              >
                        {item.label}
                      </span>
                            </div>

                            <ChevronDownIcon
                                className={`size-4 ${
                                    isPathActive(item.path as string)
                                        ? "text-primaryColor-500"
                                        : "text-black dark:text-white"
                                }`}
                            />
                          </div>
                        </DisclosureButton>
                        <DisclosurePanel
                            as="ul"
                            className="ml-4 my-2 space-y-2 border-l border-dividergray pl-2 origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0"
                            transition
                        >
                          {item.children.map((child: MenuItemProps, index3: number) => (
                              <li
                                  key={index3}
                                  onClick={() => navigate(child.path as string)}
                                  className={`w-full h-8 rounded-md px-2 flex items-center text-gray-700 dark:text-gray-200 hover:bg-dividergray hover:cursor-pointer space-x-2 ${
                                      isPathActive(child.path as string)
                                          ? "bg-dividergray"
                                          : ""
                                  } ${isCollapsed ? "justify-center" : ""}`}
                              >
                      <span
                          className={`${
                              isPathActive(child.path as string)
                                  ? "text-[#f18710]"
                                  : ""
                          }`}
                      >
                        {child.icon}
                      </span>
                                <span
                                    className={`${
                                        isPathActive(child.path as string)
                                            ? "text-[#f18710]"
                                            : ""
                                    }`}
                                >
                        {child.label}
                      </span>
                              </li>
                          ))}
                        </DisclosurePanel>
                      </Disclosure>
                  )
              ) : (
                  <li
                      key={index}
                      onClick={() => navigate(item.path || "")}
                      className={`w-full h-10 rounded-lg px-2 flex items-center text-gray-700 dark:text-gray-200 hover:bg-dividergray hover:cursor-pointer space-x-2 ${
                          isPathActive(item.path as string) ? "bg-dividergray" : ""
                      } ${isCollapsed ? "justify-center" : ""}`}
                  >
              <span
                  className={`${
                      isPathActive(item.path as string)
                          ? "text-[#f18710]"
                          : ""
                  }`}
              >
                {item.icon}
              </span>
                    {!isCollapsed && (
                        <span
                            className={`${
                                isPathActive(item.path as string)
                                    ? "text-[#f18710]"
                                    : ""
                            }`}
                        >
                  {item.label}
                </span>
                    )}
                  </li>
              )
          )}
        </ul>
        <div className="h-auto py-1 px-2">
          <Menu>
            <MenuButton
                className={`flex items-center ${
                    isCollapsed ? "justify-center" : "justify-between"
                } w-full hover:cursor-pointer hover:bg-dividergray py-1 px-2 rounded-lg`}
            >
              <div className="flex justify-center items-center space-x-2">
                <div className="flex justify-center items-center rounded-full w-7 h-7 bg-dividergray text-gray-500">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                {!isCollapsed && (
                    <div className="flex flex-col items-start justify-center">
                  <span className="text-sm text-black dark:text-white">
                    Admin
                  </span>
                      <span className="text-xs text-gray-500">admin@admin.com</span>
                    </div>
                )}
              </div>
              {!isCollapsed && (
                  <ChevronUpDownIcon className="size-5 text-black dark:text-white" />
              )}
            </MenuButton>
            <MenuItems
                anchor="top"
                className="z-50 min-w-28 p-2 rounded-lg bg-white border shadow-xl border-dividergray dark:bg-relevantDark backdrop-blur-sm"
            >
              <MenuItem>
                <span className="hover:cursor-pointer">Profile</span>
              </MenuItem>
              <MenuItem>
                <span className="hover:cursor-pointer">Logout</span>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>
  );
}

export default SideBar;
