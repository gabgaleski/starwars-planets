import React from 'react';
import { render, screen } from '@testing-library/react';
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
        name: /filtrar/i
      })).toBeInTheDocument()
      expect(global.fetch).toBeCalledTimes(1)
      expect(screen.getByRole('option', { name: 'population' }).selected).toBe(true)
      expect(screen.getByRole('option', { name: 'maior que' }).selected).toBe(true)
      expect(screen.getAllByRole('option').length).toBe(8)
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
        name: /filtrar/i
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
        name: /filtrar/i
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
        name: /filtrar/i
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
        name: /filtrar/i
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
  })
});
