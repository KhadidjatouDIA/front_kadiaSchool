import { UserIcon } from "@heroicons/react/24/outline";
import React from "react";

interface DashboardCardProps {
  title?: string;
  icon?: React.ReactNode;
  value?: string;
}
function DashboardCard({
  title,
  icon,
  value,
}: DashboardCardProps) {
  return (
    <div className="w-full h-auto border border-dividergray rounded-lg p-4 bg-white dark:bg-sideBarBgColorDark">
      <div className="flex flex-1 justify-start items-center space-x-2">
        {icon ? icon : <UserIcon className="size-5 text-black dark:text-white" />}
        <p className="text"> {title} </p>
      </div>
      <p className="text-successColor text-xl mt-2"> {value} </p>
    </div>
  );
}

export default DashboardCard;
