import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NovoEndereco from '../pages/NovoEndereco';
import * as useBuscaCepHook from '../components/useBuscaCep';

// Mock do hook useBuscaCep
const mockBuscaCep = (data: useBuscaCepHook.Endereco | null = null, loading = false, error: string | null = null) => {
  vi.spyOn(useBuscaCepHook, 'useBuscaCep').mockReturnValue({
    endereco: data,
    loading,
    error,
  });
};

describe('NovoEndereco page', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('exibe apenas o campo CEP inicialmente', () => {
    mockBuscaCep();
    render(<NovoEndereco />);
    expect(screen.getByLabelText(/cep/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/rua/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /cadastrar/i })).not.toBeInTheDocument();
  });

  it('exibe loading ao buscar CEP', () => {
    mockBuscaCep(null, true);
    render(<NovoEndereco />);
    fireEvent.change(screen.getByLabelText(/cep/i), { target: { value: '01001000' } });
    expect(screen.getByText(/buscando endereço/i)).toBeInTheDocument();
  });

  it('exibe erro de CEP não encontrado', async () => {
    mockBuscaCep(null, false, 'CEP não encontrado');
    render(<NovoEndereco />);
    fireEvent.change(screen.getByLabelText(/cep/i), { target: { value: '99999999' } });
    expect(await screen.findByText(/cep não encontrado/i)).toBeInTheDocument();
  });

  it('exibe os campos de endereço quando o CEP é válido', async () => {
    mockBuscaCep({
      cep: '01001000',
      logradouro: 'Praça da Sé',
      bairro: 'Sé',
      localidade: 'São Paulo',
      uf: 'SP',
      complemento: 'lado ímpar',
    });
    render(<NovoEndereco />);
    fireEvent.change(screen.getByLabelText(/cep/i), { target: { value: '01001000' } });
    await waitFor(() => {
      expect(screen.getByLabelText(/rua/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/bairro/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/cidade/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/estado/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /cadastrar/i })).toBeInTheDocument();
    });
  });

  it('exibe mensagens de erro de validação dos campos obrigatórios após submit', async () => {
    mockBuscaCep({
      cep: '01001000',
      logradouro: 'Praça da Sé',
      bairro: '',
      localidade: '',
      uf: '',
      complemento: '',
    });
    render(<NovoEndereco />);
    fireEvent.change(screen.getByLabelText(/cep/i), { target: { value: '01001000' } });
    await waitFor(() => expect(screen.getByLabelText(/rua/i)).toBeInTheDocument());
    // Simula blur nos campos obrigatórios para ativar touched
    fireEvent.blur(screen.getByLabelText(/número/i));
    fireEvent.blur(screen.getByLabelText(/bairro/i));
    fireEvent.blur(screen.getByLabelText(/cidade/i));
    fireEvent.blur(screen.getByLabelText(/estado/i));
    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }));
    expect(await screen.findByText(/número obrigatório/i)).toBeInTheDocument();
    expect(screen.getByText(/bairro obrigatório/i)).toBeInTheDocument();
    expect(screen.getByText(/cidade obrigatória/i)).toBeInTheDocument();
    expect(screen.getByText(/estado obrigatório/i)).toBeInTheDocument();
  });

  it('submete o formulário com sucesso e reseta os campos', async () => {
    mockBuscaCep({
      cep: '01001000',
      logradouro: 'Praça da Sé',
      bairro: 'Sé',
      localidade: 'São Paulo',
      uf: 'SP',
      complemento: '',
    });
    render(<NovoEndereco />);
    fireEvent.change(screen.getByLabelText(/cep/i), { target: { value: '01001000' } });
    await waitFor(() => expect(screen.getByLabelText(/rua/i)).toBeInTheDocument());
    fireEvent.change(screen.getByLabelText(/número/i), { target: { value: '123' } });
    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }));
    await waitFor(() => expect(screen.getByLabelText(/cep/i)).toHaveValue(''));
  });

  it('mantém o valor do campo complemento após busca do CEP', async () => {
    mockBuscaCep({
      cep: '01001000',
      logradouro: 'Praça da Sé',
      bairro: 'Sé',
      localidade: 'São Paulo',
      uf: 'SP',
      complemento: '',
    });
    render(<NovoEndereco />);
    fireEvent.change(screen.getByLabelText(/cep/i), { target: { value: '01001000' } });
    await waitFor(() => expect(screen.getByLabelText(/complemento/i)).toBeInTheDocument());
    fireEvent.change(screen.getByLabelText(/complemento/i), { target: { value: 'Apto 101' } });
    expect(screen.getByLabelText(/complemento/i)).toHaveValue('Apto 101');
  });

  it('mensagem de erro possui atributos de acessibilidade', async () => {
    mockBuscaCep(null, false, 'CEP não encontrado');
    render(<NovoEndereco />);
    fireEvent.change(screen.getByLabelText(/cep/i), { target: { value: '99999999' } });
    const error = await screen.findByRole('alert');
    expect(error).toHaveAttribute('tabindex', '0');
  });

  it('mensagem de loading possui atributos de acessibilidade', async () => {
    mockBuscaCep(null, true);
    render(<NovoEndereco />);
    fireEvent.change(screen.getByLabelText(/cep/i), { target: { value: '01001000' } });
    const loading = await screen.findByRole('status');
    expect(loading).toHaveAttribute('aria-live', 'polite');
  });

  it('chama o hook useBuscaCep ao renderizar', () => {
    const spy = vi.spyOn(useBuscaCepHook, 'useBuscaCep').mockReturnValue({ endereco: null, loading: false, error: null });
    render(<NovoEndereco />);
    expect(spy).toHaveBeenCalledWith('');
  });
});
