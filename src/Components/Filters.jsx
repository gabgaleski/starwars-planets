import React, { useCallback, useContext, useEffect, useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { TextField, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AppContext from '../contexts/AppContext';

function Filters() {
  const {
    saveData,
    setTable,
    table,
    columnFilter,
    setColumnFilter,
  } = useContext(AppContext);

  const [filtersInfo, setFiltersInfo] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const [usedFilter, setUsedFilter] = useState([]);
  const [deletedFilter, setDeletedFilter] = useState(false);

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

  const updateTable = useCallback((column, comparison, value) => {
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
  }, [setTable, table]);

  const filterOnClick = () => {
    const { column, comparison, value } = filtersInfo;

    updateTable(column, comparison, value);

    const newColumn = columnFilter.filter((element) => element !== column);

    setColumnFilter(newColumn);
    setFiltersInfo((prevState) => ({
      ...prevState,
      column: newColumn[0],
    }));

    setUsedFilter((prevState) => [...prevState, { column, comparison, value }]);
  };

  useEffect(() => {
    if (deletedFilter) {
      let updateFilterTable = saveData;
      usedFilter.forEach(({ column, comparison, value }) => {
        const numberValue = Number(value);
        if (comparison === 'maior que') {
          const filterColumn = updateFilterTable.filter((planet) => (
            Number(planet[column]) > numberValue));
          updateFilterTable = filterColumn;
        } else if (comparison === 'menor que') {
          const filterColumn = updateFilterTable.filter((planet) => (
            Number(planet[column]) < numberValue));
          updateFilterTable = filterColumn;
        } else {
          const filterColumn = updateFilterTable.filter((planet) => (
            Number(planet[column]) === numberValue));
          updateFilterTable = filterColumn;
        }
      });
      setTable(updateFilterTable);
    }
    setDeletedFilter(false);
  }, [saveData, deletedFilter, setTable, usedFilter]);

  const deletColumn = (name) => {
    const newColumn = [...columnFilter, name];
    const newFilterUsed = usedFilter.filter((element) => element.column !== name);

    setUsedFilter(newFilterUsed);
    setColumnFilter(newColumn);
    setDeletedFilter(true);
  };

  const removeAllFilters = () => {
    setTable(saveData);
    setColumnFilter([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
    setUsedFilter([]);
  };

  return (
    <div className="filters-conainer">
      <input
        className="name-input"
        placeholder="Name..."
        onChange={ filterName }
        name="inputChange"
        type="text"
        data-testid="name-filter"
      />
      <div className="filters-inputs">
        <Select
          sx={ { m: 1, width: 160 } }
          size="small"
          className="inputs-colors "
          value={ filtersInfo.column }
          onChange={ handleChange }
          name="column"
          data-testid="column-filter"
        >
          {columnFilter.map((element) => (
            <MenuItem key={ element } value={ element }>{element}</MenuItem>))}

        </Select>
        <Select
          sx={ { m: 1, width: 130 } }
          size="small"
          className="inputs-colors "
          value={ filtersInfo.comparison }
          name="comparison"
          onChange={ handleChange }
          data-testid="comparison-filter"
        >
          <MenuItem value="maior que">maior que</MenuItem>
          <MenuItem value="menor que">menor que</MenuItem>
          <MenuItem value="igual a">igual a</MenuItem>
        </Select>
        <TextField
          className="inputs-colors"
          size="small"
          onChange={ handleChange }
          name="value"
          value={ filtersInfo.value }
          type="number"
          data-testid="value-filter"
        />
        <Button
          variant="contained"
          onClick={ filterOnClick }
          data-testid="button-filter"
        >
          Filtrar

        </Button>
        <Button
          variant="contained"
          onClick={ removeAllFilters }
          data-testid="button-remove-filters"
        >
          Remover filtros

        </Button>
      </div>
      <div className="span-container">
        {usedFilter.map((element, index) => (
          <div className="span-div" key={ index }>
            <span data-testid="filter" className="span-filter">
              {element.column}
              <IconButton
                color="error"
                aria-label="delete"
                size="small"
                onClick={ () => deletColumn(element.column) }
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filters;
