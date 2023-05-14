import React, { useContext } from 'react';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import AppContext from '../contexts/AppContext';

function TableList() {
  const { table } = useContext(AppContext);
  return (
    <div className="table-container">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={ { color: 'white', fontSize: 18 } }>Name</TableCell>
            <TableCell sx={ { color: 'white', fontSize: 18 } }>Rotation Period</TableCell>
            <TableCell sx={ { color: 'white', fontSize: 18 } }>Orbital Period</TableCell>
            <TableCell sx={ { color: 'white', fontSize: 18 } }>Diameter</TableCell>
            <TableCell sx={ { color: 'white', fontSize: 18 } }>Climate</TableCell>
            <TableCell sx={ { color: 'white', fontSize: 18 } }>Gavity</TableCell>
            <TableCell sx={ { color: 'white', fontSize: 18 } }>Terrain</TableCell>
            <TableCell sx={ { color: 'white', fontSize: 18 } }>Surface Water</TableCell>
            <TableCell sx={ { color: 'white', fontSize: 18 } }>Population</TableCell>
            <TableCell sx={ { color: 'white', fontSize: 18 } }>Films</TableCell>
            <TableCell sx={ { color: 'white', fontSize: 18 } }>Created</TableCell>
            <TableCell sx={ { color: 'white', fontSize: 18 } }>Edited</TableCell>
            <TableCell sx={ { color: 'white', fontSize: 18 } }>URL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {table.map((planet) => (
            <TableRow key={ planet.name }>
              <TableCell
                sx={ { color: 'white' } }
                data-testid="planet-name"
              >
                {planet.name}

              </TableCell>
              <TableCell sx={ { color: 'white' } }>{planet.rotation_period}</TableCell>
              <TableCell sx={ { color: 'white' } }>{planet.orbital_period}</TableCell>
              <TableCell sx={ { color: 'white' } }>{planet.diameter}</TableCell>
              <TableCell sx={ { color: 'white' } }>{planet.climate}</TableCell>
              <TableCell sx={ { color: 'white' } }>{planet.gravity}</TableCell>
              <TableCell sx={ { color: 'white' } }>{planet.terrain}</TableCell>
              <TableCell sx={ { color: 'white' } }>{planet.surface_water}</TableCell>
              <TableCell sx={ { color: 'white' } }>{planet.population}</TableCell>
              <TableCell sx={ { color: 'white' } }>
                {planet.films.map((film, index) => <p key={ index }>{film}</p>)}
              </TableCell>
              <TableCell sx={ { color: 'white' } }>{planet.created}</TableCell>
              <TableCell sx={ { color: 'white' } }>{planet.edited}</TableCell>
              <TableCell sx={ { color: 'white' } }>{planet.url}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TableList;
