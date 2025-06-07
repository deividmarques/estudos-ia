import React from 'react';
import { Box, Typography, TextField, Button, Stack, CircularProgress } from '@mui/material';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useBuscaCep } from '../components/useBuscaCep';

// Tipagem explícita dos valores do formulário
interface EnderecoFormValues {
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
}

const validationSchema = Yup.object({
  cep: Yup.string()
    .matches(/^\d{8}$/, 'CEP deve ter 8 dígitos numéricos')
    .required('CEP obrigatório'),
  rua: Yup.string().required('Rua obrigatória'),
  numero: Yup.string().required('Número obrigatório'),
  complemento: Yup.string(),
  bairro: Yup.string().required('Bairro obrigatório'),
  cidade: Yup.string().required('Cidade obrigatória'),
  estado: Yup.string().required('Estado obrigatório'),
});

const NovoEndereco: React.FC = () => {
  return (
    <Box maxWidth={500} mx="auto" mt={4}>
      <Typography variant="h4" gutterBottom>Cadastrar Novo Endereço</Typography>
      <Formik<EnderecoFormValues>
        initialValues={{
          cep: '', rua: '', numero: '', complemento: '', bairro: '', cidade: '', estado: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }: FormikHelpers<EnderecoFormValues>) => {
          console.log('Endereço cadastrado com sucesso!', values);
          resetForm();
        }}
      >
        {({ errors, touched, setFieldValue, values }) => {
          const { endereco, loading, error: cepError } = useBuscaCep(values.cep);

          React.useEffect(() => {
            if (endereco) {
              setFieldValue('rua', endereco.logradouro || '');
              setFieldValue('bairro', endereco.bairro || '');
              setFieldValue('cidade', endereco.localidade || '');
              setFieldValue('estado', endereco.uf || '');
              setFieldValue('complemento', endereco.complemento || '');
            }
          }, [endereco, setFieldValue]);

          return (
            <Form autoComplete="off">
              <Stack spacing={2}>
                <Field
                  as={TextField}
                  label="CEP"
                  name="cep"
                  fullWidth
                  type="text"
                  inputProps={{ maxLength: 8, inputMode: 'numeric', pattern: '[0-9]*' }}
                  error={Boolean((touched.cep && errors.cep) || cepError)}
                  aria-invalid={Boolean((touched.cep && errors.cep) || cepError)}
                  aria-describedby="cep-helper-text"
                  helperText={<ErrorMessage name="cep" />}
                />
                {cepError && (
                  <Typography
                    id="cep-helper-text"
                    color="error"
                    variant="body2"
                    role="alert"
                    tabIndex={0}
                    sx={{ mt: -1, mb: 1 }}
                  >
                    {cepError}
                  </Typography>
                )}
                {/* Loading visual para busca de CEP */}
                {loading && values.cep.replace(/\D/g, '').length === 8 && !cepError && (
                  <Box display="flex" alignItems="center" gap={1}>
                    <CircularProgress size={20} color="primary" aria-label="Carregando" />
                    <Typography variant="body2" color="text.secondary" role="status" aria-live="polite">
                      Buscando endereço pelo CEP...
                    </Typography>
                  </Box>
                )}
                {/* Exibe os demais campos SOMENTE se o endereço foi retornado com sucesso */}
                {endereco && !cepError && !loading && (
                  <>
                    <Field
                      as={TextField}
                      label="Rua"
                      name="rua"
                      fullWidth
                      error={touched.rua && !!errors.rua}
                      helperText={<ErrorMessage name="rua" />}
                    />
                    <Box display="flex" gap={2}>
                      <Field
                        as={TextField}
                        label="Número"
                        name="numero"
                        fullWidth
                        error={touched.numero && !!errors.numero}
                        helperText={<ErrorMessage name="numero" />}
                      />
                      <Field
                        as={TextField}
                        label="Complemento"
                        name="complemento"
                        fullWidth
                        error={touched.complemento && !!errors.complemento}
                        helperText={<ErrorMessage name="complemento" />}
                      />
                    </Box>
                    <Box display="flex" gap={2}>
                      <Field
                        as={TextField}
                        label="Bairro"
                        name="bairro"
                        fullWidth
                        error={touched.bairro && !!errors.bairro}
                        helperText={<ErrorMessage name="bairro" />}
                      />
                      <Field
                        as={TextField}
                        label="Cidade"
                        name="cidade"
                        fullWidth
                        error={touched.cidade && !!errors.cidade}
                        helperText={<ErrorMessage name="cidade" />}
                      />
                      <Field
                        as={TextField}
                        label="Estado"
                        name="estado"
                        fullWidth
                        error={touched.estado && !!errors.estado}
                        helperText={<ErrorMessage name="estado" />}
                      />
                    </Box>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                      Cadastrar
                    </Button>
                  </>
                )}
              </Stack>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default NovoEndereco;
