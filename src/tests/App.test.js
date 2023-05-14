import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import mockData from '../helper/mockData';
import AppProvider from '../contexts/AppProvider';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe('Testando o App', () => {
    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
          json: async () => (mockData),
        });
      });

  it('Testando se tudo é renderizado', async () => {
      render(
        <AppProvider>
            <App />
        </AppProvider>
      )
      
      expect(global.fetch).toBeCalled()
      expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets')
      expect(screen.getByTestId('column-sort')).toBeInTheDocument()
      expect(screen.getByTestId('column-sort-input-asc')).toBeInTheDocument()
      expect(screen.getByTestId('name-filter')).toBeInTheDocument()
      expect(screen.getByTestId('name-filter')).toBeInTheDocument()
      expect(screen.getByTestId('column-filter')).toBeInTheDocument()
      expect(screen.getByTestId('comparison-filter')).toBeInTheDocument()
      expect(screen.getByTestId('value-filter')).toBeInTheDocument()
      expect(screen.getByTestId('button-filter')).toBeInTheDocument()
      expect(screen.getByTestId('button-remove-filters')).toBeInTheDocument()
      expect(screen.getByTestId('column-sort-input-asc')).toBeInTheDocument()
      expect(screen.getByTestId('column-sort-input-desc')).toBeInTheDocument()
      expect(screen.getByTestId('column-sort-button')).toBeInTheDocument()
      expect(await screen.findByRole('cell', {
        name: /tatooine/i
      })).toBeInTheDocument()
      
 })


 it('Testando o componente "Filter"', async () => {
  render(
    <AppProvider>
        <App />
    </AppProvider>
  )

    const filterName = screen.getByTestId('name-filter')
    const selectColumn = screen.getByTestId('column-filter')
    const comparisonFilter = screen.getByTestId('comparison-filter')
    const valueFilter = screen.getByTestId('value-filter')
    const filterButton = screen.getByTestId('button-filter')

    userEvent.type(filterName, 'Tatooine')

    expect(await screen.findByRole('cell', {
      name: /tatooine/i
    })).toBeInTheDocument()


    userEvent.clear(filterName)
    userEvent.selectOptions(selectColumn, 'rotation_period')
    userEvent.selectOptions(comparisonFilter, 'igual a')
    userEvent.type(valueFilter, '24')

    act(() => {
      userEvent.click(filterButton)
    })


    const deletButton = screen.getByRole('button', {
      name: /excluir/i
    })

    expect(screen.getAllByTestId('planet-name')).toHaveLength(3)
    expect(screen.getByTestId('filter'))
    expect(deletButton).toBeInTheDocument()

    userEvent.click(deletButton)

    expect(screen.getAllByTestId('planet-name')).toHaveLength(10)

    userEvent.selectOptions(selectColumn, 'rotation_period')
    userEvent.selectOptions(comparisonFilter, 'maior que')
    userEvent.type(valueFilter, '24')

    act(() => {
      userEvent.click(filterButton)
    })

    userEvent.click(deletButton)

    userEvent.selectOptions(selectColumn, 'diameter')
    userEvent.selectOptions(comparisonFilter, 'menor que')
    userEvent.type(valueFilter, '10000')

    act(() => {
      userEvent.click(filterButton)
    })

    userEvent.click(deletButton)


    userEvent.selectOptions(selectColumn, 'surface_water')
    userEvent.selectOptions(comparisonFilter, 'menor que')
    userEvent.type(valueFilter, '10000')
    userEvent.selectOptions(selectColumn, 'population')
    userEvent.selectOptions(comparisonFilter, 'igual a')
    userEvent.type(valueFilter, '30000000')

    expect(screen.getAllByTestId('filter').length).toBe(2)

    const deletAllFilters = screen.getByTestId('button-remove-filters')

    userEvent.click(deletAllFilters)
 })

 it('Testes no componente "FiltersTable"', async () => {
  render(
    <AppProvider>
        <App />
    </AppProvider>
  )

  const filterTable = screen.getByTestId('column-sort')
  const radioAsc = screen.getByTestId('column-sort-input-asc')
  const radioDec = screen.getByTestId('column-sort-input-desc')
  const filterTableBtn = screen.getByTestId('column-sort-button')

    userEvent.selectOptions(filterTable, 'population')
    userEvent.click(radioAsc)

    act(() => {
      userEvent.click(filterTableBtn)
    })


  expect(await screen.findByRole('cell', {
    name: /yavin iv/i
  })).toBeInTheDocument()

  userEvent.click(radioDec)
  userEvent.click(filterTableBtn)

 })

 it('Testando os deletes dos filtros', async () => {
  render(
    <AppProvider>
        <App />
    </AppProvider>
  )

  const selectColumn = screen.getByTestId('column-filter')
  const comparisonFilter = screen.getByTestId('comparison-filter')
  const valueFilter = screen.getByTestId('value-filter')
  const filterButton = screen.getByTestId('button-filter')


  await waitFor(() => {
    expect(screen.getAllByTestId('planet-name').length).toBe(10)
})

  userEvent.selectOptions(selectColumn, 'rotation_period')
  userEvent.selectOptions(comparisonFilter, 'maior que')
  userEvent.clear(valueFilter)
  userEvent.type(valueFilter, '23')
  
  act(() => {
    userEvent.click(filterButton)
  })

    expect(screen.getAllByTestId('planet-name').length).toBe(5)


  userEvent.selectOptions(selectColumn, 'orbital_period')
  userEvent.selectOptions(comparisonFilter, 'menor que')
  userEvent.clear(valueFilter)
  userEvent.type(valueFilter, '400')

  act(() => {
    userEvent.click(filterButton)
  })

  expect(screen.getAllByTestId('planet-name').length).toBe(3)

  userEvent.selectOptions(selectColumn, 'diameter')
  userEvent.selectOptions(comparisonFilter, 'igual a')
  userEvent.clear(valueFilter)
  userEvent.type(valueFilter, '12500')

  act(() => {
    userEvent.click(filterButton)
  })

  expect(screen.getAllByTestId('planet-name').length).toBe(1)


  const deletButton = screen.getAllByRole('button', {
    name: /excluir/i
  })

  expect(deletButton.length).toBe(3)

  act(() => {
    userEvent.click(deletButton[2])
  })

  expect(screen.getAllByTestId('planet-name').length).toBe(3)

  act(() => {
    userEvent.click(deletButton[1])
  })

  expect(screen.getAllByTestId('planet-name').length).toBe(5)


  act(() => {
    userEvent.click(deletButton[0])
  })

  expect(screen.getAllByTestId('planet-name').length).toBe(10)



 })

});
