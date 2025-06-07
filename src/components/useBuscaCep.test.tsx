import { describe, it, expect, vi, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useBuscaCep } from './useBuscaCep';

// Mock global fetch
const mockFetch = (data: unknown, ok = true) => {
  global.fetch = vi.fn().mockResolvedValue({
    ok,
    json: async () => data,
  }) as unknown as typeof fetch;
};

describe('useBuscaCep', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('não faz busca se o CEP for incompleto', async () => {
    global.fetch = vi.fn(); // Garante que é um spy
    const { result, rerender } = renderHook(({ cep }) => useBuscaCep(cep), {
      initialProps: { cep: '12345' },
    });
    expect(result.current.endereco).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(global.fetch).not.toHaveBeenCalled();

    rerender({ cep: '1234567' });
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('busca e retorna endereço corretamente', async () => {
    const endereco = {
      cep: '01001000',
      logradouro: 'Praça da Sé',
      complemento: 'lado ímpar',
      bairro: 'Sé',
      localidade: 'São Paulo',
      uf: 'SP',
    };
    mockFetch(endereco);
    const { result, rerender } = renderHook(({ cep }) => useBuscaCep(cep), {
      initialProps: { cep: '01001000' },
    });
    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.endereco).toEqual(endereco);
    expect(result.current.error).toBeNull();

    // Mudando para outro CEP válido
    const endereco2 = { ...endereco, cep: '12345678', logradouro: 'Rua Teste' };
    mockFetch(endereco2);
    rerender({ cep: '12345678' });
    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.endereco).toEqual(endereco2);
  });

  it('retorna erro se o CEP não for encontrado', async () => {
    mockFetch({ erro: true });
    const { result } = renderHook(() => useBuscaCep('99999999'));
    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.endereco).toBeNull();
    expect(result.current.error).toMatch(/não encontrado/i);
  });

  it('retorna erro se a API falhar', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('API down')) as unknown as typeof fetch;
    const { result } = renderHook(() => useBuscaCep('01001000'));
    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.endereco).toBeNull();
    expect(result.current.error).toMatch(/erro ao buscar/i);
  });

  it('retorna erro se a resposta HTTP não for ok', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false }) as unknown as typeof fetch;
    const { result } = renderHook(() => useBuscaCep('01001000'));
    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.endereco).toBeNull();
    expect(result.current.error).toMatch(/erro ao buscar/i);
  });
});
