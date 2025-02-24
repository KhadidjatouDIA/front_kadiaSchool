import React from "react";
import Empty from "./Empty";
import Spinner from "./Spinner";
interface DataTableProps {
  columns: ColumnProps[];
  onAdd?: () => void;
  isLoading?: boolean;
  dataSource: any;
  dataSourceCopy: any;
  searchInputs?: string[];
  setDataSource?: React.Dispatch<React.SetStateAction<any[]>>;
  setDataSourceCopy?: React.Dispatch<React.SetStateAction<any[]>>;
}

export interface ColumnProps {
  key?: string;
  label?: string;
  dataIndex?: string;
  renderCell: (record: any) => React.ReactNode | any;
}

function DataTable({
  columns,
  dataSource = [],
  dataSourceCopy = [],
  setDataSourceCopy,
  onAdd,
  searchInputs,
  isLoading,
}: DataTableProps) {
  const [search, setSearch] = React.useState("");

  const handleSearch = (event: any) => {
    setSearch(event.target.value);
    const inputValue = event.target.value;
    const foundData = [];
    for (let index = 0; index < dataSource.length; index++) {
      const element = dataSource[index];
      if (deepSearch(element, inputValue)) {
        foundData.push(element);
      }
    }
    setDataSourceCopy?.(foundData);
  };

  const deepSearch = (object: any, searchedValue: string) => {
    if (searchInputs) {
      const keys = searchInputs;
      for (let index = 0; index < keys.length; index++) {
        const key = keys?.[index];
        if (
          String(object[key])
            .toLowerCase()
            .indexOf(searchedValue.toLowerCase()) !== -1
        ) {
          return true;
        }
      }
    }
    return false;
  };

  return (
    <div>
      <div className="flex justify-between items-end mb-4">
        <input
          className="input w-[300px]"
          placeholder="Entrer votre recherche..."
          id="search"
          type="text"
          value={search}
          onChange={handleSearch}
        />
        <button className="btn btn-primary" onClick={onAdd}>
          Nouveau
        </button>
      </div>

      <div className="rounded-md bg-white dark:bg-sideBarBgColorDark dark:text-white">
        {isLoading ? (
          <Spinner />
        ) : (
          <table className="w-full  ">
            <thead className="rounded-lg">
              <tr className="border-b border-b-dividergray ">
                {columns.map((column, index) => (
                  <td key={index} className="px-4 py-2">
                    <strong>{column.label}</strong>
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataSourceCopy.map((item: any, index: number) => (
                <tr
                  key={index}
                  className="border-b border-b-dividergray hover:bg-dividergray hover:cursor-pointer"
                >
                  {columns.map((elt, index1) => (
                    <td key={index1} className="px-4 py-4">
                      {elt.renderCell(item)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {dataSourceCopy.length === 0 && <Empty />}
      </div>
    </div>
  );
}

export default DataTable;
