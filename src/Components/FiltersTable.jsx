import { useContext, useState } from 'react';
import AppContext from '../contexts/AppContext';

function FiltersTable() {
  const { table, setTable } = useContext(AppContext);
  const [sortTable, setSortTable] = useState(
    { order: { column: 'population', sort: '' } },
  );

  const handleChange = ({ target }) => {
    const { value, name } = target;

    setSortTable((prevState) => ({
      order: { ...prevState.order, [name]: value },
    }));
  };

  const orderTable = () => {
    const { column, sort } = sortTable.order;

    const getUnknown = table.filter((planet) => planet[column] === 'unknown');
    const getAllTable = table.filter((planet) => planet[column] !== 'unknown');

    if (sort === 'ASC') {
      const sortTableNumbers = getAllTable.sort((a, b) => (
        Number(a[column] - Number(b[column]))));

      setTable([...sortTableNumbers, ...getUnknown]);
    } else {
      const sortTableNumbers = getAllTable.sort((a, b) => (
        Number(b[column] - Number(a[column]))));

      setTable([...sortTableNumbers, ...getUnknown]);
    }
  };

  return (
    <div>
      <select
        name="column"
        onChange={ handleChange }
        value={ sortTable.order.column }
        data-testid="column-sort"
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <label>
        Ascendente
        <input
          onChange={ handleChange }
          name="sort"
          value="ASC"
          data-testid="column-sort-input-asc"
          type="radio"
        />
      </label>
      <label>
        Decrescente
        <input
          onChange={ handleChange }
          name="sort"
          value="DESC"
          data-testid="column-sort-input-desc"
          type="radio"
        />
      </label>
      <button
        onClick={ orderTable }
        data-testid="column-sort-button"
      >
        Filtrar Tabela

      </button>

    </div>
  );
}

export default FiltersTable;
