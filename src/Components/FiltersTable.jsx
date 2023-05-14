import { useContext, useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
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
    <div className="list-filters-order">
      <Select
        sx={ { m: 1, width: 160 } }
        size="small"
        className="inputs-colors "
        name="column"
        onChange={ handleChange }
        value={ sortTable.order.column }
        data-testid="column-sort"
      >
        <MenuItem value="population">population</MenuItem>
        <MenuItem value="orbital_period">orbital_period</MenuItem>
        <MenuItem value="diameter">diameter</MenuItem>
        <MenuItem value="rotation_period">rotation_period</MenuItem>
        <MenuItem value="surface_water">surface_water</MenuItem>
      </Select>
      <div className="radio-container">
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
      </div>
      <Button
        variant="contained"
        onClick={ orderTable }
        data-testid="column-sort-button"
      >
        Filtrar Tabela

      </Button>

    </div>
  );
}

export default FiltersTable;
