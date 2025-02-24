import Breadcrumbs from "@/components/Breadcrumbs";
import { Outlet } from "react-router-dom";
interface ContentProps {
  isCollapsed: boolean;
}
function Content({ isCollapsed }: ContentProps) {
  return (
    <div
      className={`${
        isCollapsed ? "ml-20" : "ml-64"
      } transition-all duration-300 ease-in-out w-auto px-6 pb-4 pt-20`}
    >
      <Breadcrumbs />
      <Outlet />
    </div>
  );
}

export default Content;
