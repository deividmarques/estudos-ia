import { render, screen } from '@testing-library/react';
import ColorText from '../components/ColorText';

describe('ColorText', () => {
  it('renderiza texto com cor primária', () => {
    render(<ColorText text="Texto com cor primária" colorToken="primary.main" />);
    expect(screen.getByText('Texto com cor primária')).toBeInTheDocument();
  });

  it('renderiza texto com cor secundária', () => {
    render(<ColorText text="Texto com cor secundária" colorToken="secondary.main" />);
    expect(screen.getByText('Texto com cor secundária')).toBeInTheDocument();
  });

  it('renderiza texto com cor de sucesso', () => {
    render(<ColorText text="Texto com cor de sucesso" colorToken="success.main" />);
    expect(screen.getByText('Texto com cor de sucesso')).toBeInTheDocument();
  });

  it('renderiza texto padrão (text.primary)', () => {
    render(<ColorText text="Texto padrão (text.primary)" colorToken="text.primary" />);
    expect(screen.getByText('Texto padrão (text.primary)')).toBeInTheDocument();
  });

  it('renderiza texto grande e negrito', () => {
    render(
      <ColorText
        text="Texto grande e negrito"
        colorToken="primary.main"
        sx={{ fontSize: 32, fontWeight: 'bold' }}
      />
    );
    expect(screen.getByText('Texto grande e negrito')).toBeInTheDocument();
  });

  it('chama onClick ao clicar no botão', () => {
    const handleClick = vi.fn();
    render(<ColorText text="Clique aqui" colorToken="primary.main" onClick={handleClick} />);
    screen.getByText('Clique aqui').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
