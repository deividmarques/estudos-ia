import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Home from '../pages/Home'

describe('Home', () => {
  it('renders MUI components examples', () => {
    render(<Home />)
    expect(screen.getByText('Exemplos de Componentes MUI')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Botão/i })).toBeInTheDocument()
  })
})