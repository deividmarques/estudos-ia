import { useState, useEffect } from 'react';

export interface Endereco {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export function useBuscaCep(cep: string) {
  const [endereco, setEndereco] = useState<Endereco | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onlyDigits = cep.replace(/\D/g, '');
    if (onlyDigits.length !== 8) {
      setEndereco(null);
      setError(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    setEndereco(null);
    fetch(`https://viacep.com.br/ws/${onlyDigits}/json/`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Erro de conexão com o serviço de CEP');
        }
        return res.json();
      })
      .then((data: Endereco) => {
        if (data.erro) {
          setError('CEP não encontrado. Verifique e tente novamente.');
          setEndereco(null);
        } else {
          setEndereco(data);
        }
      })
      .catch(() => {
        setError('Erro ao buscar CEP. Tente novamente mais tarde.');
        setEndereco(null);
      })
      .finally(() => setLoading(false));
  }, [cep]);

  return { endereco, loading, error };
}
