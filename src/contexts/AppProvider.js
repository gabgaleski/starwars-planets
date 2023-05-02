import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [saveData, setSaveData] = useState([]);
  const [table, setTable] = useState([]);

  const fetchApi = async () => {
    const response = await fetch('https://swapi.dev/api/planets');
    const data = await response.json();
    setSaveData(data.results);
  };

  useEffect(() => {
    setTable(saveData);
  }, [saveData]);

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <AppContext.Provider value={ { saveData, setSaveData, table, setTable } }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
