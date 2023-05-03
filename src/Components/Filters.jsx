import React, { useContext, useState } from 'react';
import AppContext from '../contexts/AppContext';

function Filters() {
  const { saveData,
    setTable, table, columnFilter, setColumnFilter } = useContext(AppContext);
  const [filtersInfo, setFiltersInfo] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const filterName = ({ target }) => {
    const newTable = saveData.filter((planet) => planet.name.includes(target.value));
    setTable(newTable);
  };

  const handleChange = ({ target }) => {
    const { value, name } = target;

    setFiltersInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const filterOnClick = () => {
    const { column, comparison, value } = filtersInfo;
    const numberValue = Number(value);

    if (comparison === 'maior que') {
      const filterColumn = table.filter((planet) => (
        Number(planet[column]) > numberValue));
      setTable(filterColumn);
    } else if (comparison === 'menor que') {
      const filterColumn = table.filter((planet) => (
        Number(planet[column]) < numberValue));
      setTable(filterColumn);
    } else {
      const filterColumn = table.filter((planet) => (
        Number(planet[column]) === numberValue));
      setTable(filterColumn);
    }

    const newColumn = columnFilter.filter((element) => element !== column);

    setColumnFilter(newColumn);
    setFiltersInfo((prevState) => ({
      ...prevState,
      column: newColumn[0],
    }));
  };

  return (
    <div>
      <input
        placeholder="Name..."
        onChange={ filterName }
        name="inputChange"
        type="text"
        data-testid="name-filter"
      />
      <select
        value={ filtersInfo.column }
        onChange={ handleChange }
        name="column"
        data-testid="column-filter"
      >
        {columnFilter.map((element) => (
          <option key={ element } value={ element }>{element}</option>))}

      </select>
      <select
        value={ filtersInfo.comparison }
        name="comparison"
        onChange={ handleChange }
        data-testid="comparison-filter"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        onChange={ handleChange }
        name="value"
        value={ filtersInfo.value }
        type="number"
        data-testid="value-filter"
      />
      <button
        onClick={ filterOnClick }
        data-testid="button-filter"
      >
        Filtrar

      </button>
    </div>
  );
}

export default Filters;
