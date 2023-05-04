import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
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

  it('Testando a aplicação pelo app', async () => {
      render(
        <AppProvider>
            <App />
        </AppProvider>
      )

      expect(screen.getByRole('textbox')).toBeInTheDocument()
      expect(screen.getByRole('spinbutton')).toBeInTheDocument()
      expect(screen.getByRole('button', {
        name: 'Filtrar'
      })).toBeInTheDocument()
      expect(global.fetch).toBeCalledTimes(1)
      expect(screen.getByTestId('column-filter')).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'maior que' }).selected).toBe(true)
      expect(screen.getAllByRole('option').length).toBe(13)
      expect(screen.getAllByRole('columnheader').length).toBe(13)

      const getTatooName = await screen.findByRole('cell', {
        name: /tatooine/i
      })

      expect(getTatooName).toBeInTheDocument()

      const getKaminoName = await screen.getByRole('cell', {
        name: /kamino/i
      })

      expect(getKaminoName).toBeInTheDocument()

      const inputName = screen.getByRole('textbox');

      userEvent.type(inputName, 'Alderaan')

      expect(getTatooName).not.toBeInTheDocument()
      expect(screen.getByRole('cell', {
        name: /alderaan/i
      })).toBeInTheDocument()
  })

  it('Testes no componente Filter', async () => {
    render(
        <AppProvider>
            <App />
        </AppProvider>
      )

      const getValue = screen.getByRole("spinbutton");
      const getButton = screen.getByRole('button', {
        name: 'Filtrar'
      })
      const column = screen.getByTestId('column-filter')
      const comparison = screen.getByTestId('comparison-filter')

      userEvent.selectOptions(column, 'rotation_period')
      userEvent.selectOptions(comparison, 'igual a')
      userEvent.type(getValue, '24')
      userEvent.click(getButton)

      expect(await screen.findByRole('cell', {
        name: /alderaan/i
      })).toBeInTheDocument()

      expect(await screen.findByRole('cell', {
        name: /coruscant/i
      })).toBeInTheDocument()
  })

  it('Testando filtros "menor que" ', async () => {
    render(
        <AppProvider>
            <App />
        </AppProvider>
      )

      const getValue = screen.getByRole("spinbutton");
      const getButton = screen.getByRole('button', {
        name: 'Filtrar'
      })
      const column = screen.getByTestId('column-filter')
      const comparison = screen.getByTestId('comparison-filter')

      userEvent.selectOptions(column, 'rotation_period')
      userEvent.selectOptions(comparison, 'menor que')
      userEvent.type(getValue, '20')
      userEvent.click(getButton)

      expect(await screen.findByRole('cell', {
        name: /bespin/i
      })).toBeInTheDocument()
  })

  it('Testando filtro "maior que"', async () => {
    render(
        <AppProvider>
            <App />
        </AppProvider>
      )

      const getValue = screen.getByRole("spinbutton");
      const getButton = screen.getByRole('button', {
        name: 'Filtrar'
      })
      const column = screen.getByTestId('column-filter')
      const comparison = screen.getByTestId('comparison-filter')

      userEvent.selectOptions(column, 'diameter')
      userEvent.selectOptions(comparison, 'maior que')
      userEvent.type(getValue, '10465')
      userEvent.click(getButton)
  })

  it('Testando filtro "igual a"', async () => {
    render(
        <AppProvider>
            <App />
        </AppProvider>
      )

      const getValue = screen.getByRole("spinbutton");
      const getButton = screen.getByRole('button', {
        name: 'Filtrar'
      })
      const column = screen.getByTestId('column-filter')
      const comparison = screen.getByTestId('comparison-filter')

      userEvent.selectOptions(column, 'surface_water')
      userEvent.selectOptions(comparison, 'igual a')
      userEvent.type(getValue, '1')
      userEvent.click(getButton)

      expect(await screen.findByRole('cell', {
        name: /tatooine/i
      })).toBeInTheDocument()

      const getDeletBtn = screen.getByRole('button', {
        name: /excluir/i
      })

      const surface = screen.getByTestId('column-filter')

      expect(surface).toBeInTheDocument()

      userEvent.click(getDeletBtn)

  })

  it('Testando botao de limpar filtros e excluir filtros', async () => {
    render(
      <AppProvider>
          <App />
      </AppProvider>
    )

    const getValue = screen.getByRole("spinbutton");
    const getButton = screen.getByRole('button', {
      name: 'Filtrar'
    })
    const column = screen.getByTestId('column-filter')
    const comparison = screen.getByTestId('comparison-filter')


    userEvent.type(getValue, '1')
    userEvent.click(getButton)

    const deletBtn = screen.getByRole('button', {
      name: /excluir/i
    })

    userEvent.click(deletBtn)

    expect(deletBtn).not.toBeInTheDocument()

    userEvent.type(getValue, '100')
    userEvent.click(getButton)

    const clearFilters = screen.getByRole('button', {
      name: /remover filtros/i
    })

    userEvent.click(clearFilters)

    expect(deletBtn).not.toBeInTheDocument()

    userEvent.selectOptions(column, 'surface_water')
    userEvent.selectOptions(comparison, 'menor que')
    userEvent.type(getValue, '40')
    userEvent.click(getButton)

    userEvent.selectOptions(column, 'rotation_period')
    userEvent.selectOptions(comparison, 'maior que')
    userEvent.type(getValue, '23')
    userEvent.click(getButton)

    expect(await screen.findByRole('cell', {
      name: /naboo/i
    })).toBeInTheDocument()

    userEvent.click(clearFilters)

    userEvent.selectOptions(column, 'rotation_period')
    userEvent.selectOptions(comparison, 'igual a')
    userEvent.type(getValue, '23')
    userEvent.click(getButton)

    const getDelet = screen.getByRole('button', {  name: /excluir/i})

    userEvent.click(getDelet)

    userEvent.selectOptions(column, 'rotation_period')
    userEvent.selectOptions(comparison, 'maior que')
    userEvent.type(getValue, '23')
    userEvent.click(getButton)

    userEvent.click(getDelet)
    userEvent.click(clearFilters)

    userEvent.selectOptions(column, 'rotation_period')
    userEvent.selectOptions(comparison, 'menor que')
    userEvent.type(getValue, '23')
    userEvent.click(getButton)

    userEvent.click(getDelet)
  })

  it('Testes no componente "filterTable"', async () => {
    render(
      <AppProvider>
          <App />
      </AppProvider>
    )

      const radioBtnAsc = screen.getByRole('radio', {
        name: /ascendente/i
      })

      const radioBtnDsc = screen.getByRole('radio', {
        name: /decrescente/i
      })

      const filterBtn = screen.getByTestId('column-sort-button')

      expect(screen.getByTestId('column-sort')).toBeInTheDocument()
      expect(radioBtnAsc).toBeInTheDocument()
      expect(radioBtnDsc).toBeInTheDocument()
      expect(filterBtn).toBeInTheDocument()
      expect(screen.getByText(/ascendente/i)).toBeInTheDocument()
      expect(screen.getByText(/decrescente/i)).toBeInTheDocument()


      userEvent.click(radioBtnAsc)
      userEvent.click(filterBtn)

      userEvent.click(radioBtnDsc)
      userEvent.click(filterBtn)

  })
});
