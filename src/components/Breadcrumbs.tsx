import { SlashIcon } from "@heroicons/react/24/outline";
import { Link, useMatches, useParams } from "react-router-dom";

function Breadcrumbs() {
  const matches = useMatches();
  const params = useParams();
  const breadcrumbs = matches
    .filter((match: any) => match.handle?.breadcrumb)
    .map((match: any) => {
      const breadcrumb =
        typeof match.handle.breadcrumb === "function"
          ? match.handle.breadcrumb(params)
          : match.handle.breadcrumb;

      return {
        label: breadcrumb,
        to: match.pathname,
      };
    });
  return (
    breadcrumbs.length > 1 && (
      <nav className="flex text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1">
          {breadcrumbs.map((crumb, index) => (
            <li key={index} className="inline-flex items-center">
              {index === breadcrumbs.length - 1 ? (
                <span className="inline-flex items-center text-gray-500">
                  {crumb.label}
                </span>
              ) : (
                <div className="flex items-center">
                  <Link
                    to={crumb.to}
                    className="inline-flex items-center text-gray-600 hover:text-blue-600"
                  >
                    {crumb.label}
                  </Link>
                  <SlashIcon className="w-4 h-4" />
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>
    )
  );
}

export default Breadcrumbs;
