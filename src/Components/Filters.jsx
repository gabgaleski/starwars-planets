import React, { useContext } from 'react';
import AppContext from '../contexts/AppContext';

function Filters() {
  const { saveData, setTable } = useContext(AppContext);

  const handleChange = ({ target }) => {
    const newTable = saveData.filter((planet) => planet.name.includes(target.value));
    setTable(newTable);
  };

  return (
    <div>
      <input
        onChange={ handleChange }
        name="inputChange"
        type="text"
        data-testid="name-filter"
      />
    </div>
  );
}

export default Filters;
