import { useState } from "react";

export const useTable = () => {
  //Table data
  const [tableList, setTableList] = useState([]);
  const [apiOriginal, setApiOriginal] = useState([]);
  
  const [index, setIndex] = useState(null);

  //Page Table
  const [limit, setLimit] = useState(10);
  const [end, setEnd] = useState(limit);

  const getOne = () => {
    return tableList.find(elem => elem.id == index);
  }

  const update = (id, json) => {
    const mapListInventario = apiOriginal.map((elem) => {
      if (elem.id == id) return { ...json };
      else return elem;
    });

    setApiOriginal(mapListInventario);
    setTableList(mapListInventario);
  };

  const deletet = (id) => {
    setTableList(tableList.filter((elem) => elem.id != id));
    setApiOriginal(apiOriginal.filter((elem) => elem.id != id));
  };

  const add = (json) => {
    setTableList([{ ...json }, ...tableList]);
    setApiOriginal([{ ...json }, ...apiOriginal]);
  };

  const showTable = (start) => {
    return tableList.slice(start, end);
  }

  const getPrevius = () => {
    setTableList(apiOriginal);
  };

  const setApi = (array) => {
    setApiOriginal(array);
    setTableList(array);
  }

  const getLengthTableList = () => {
    return tableList.length;
  }

  return {
    getLengthTableList,
    showTable,
    update,
    deletet,
    add,
    getPrevius,
    getOne,
    setApi,
    setIndex,
    limit,
    setEnd
  };
};
