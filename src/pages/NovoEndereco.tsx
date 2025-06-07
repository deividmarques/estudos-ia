import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  cep: Yup.string().required('CEP obrigatório'),
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
      <Formik
        initialValues={{
          cep: '', rua: '', numero: '', complemento: '', bairro: '', cidade: '', estado: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log('Endereço cadastrado com sucesso!', values);
          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Field
                  as={TextField}
                  label="CEP"
                  name="cep"
                  fullWidth
                  error={touched.cep && !!errors.cep}
                  helperText={<ErrorMessage name="cep" />}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Field
                  as={TextField}
                  label="Rua"
                  name="rua"
                  fullWidth
                  error={touched.rua && !!errors.rua}
                  helperText={<ErrorMessage name="rua" />}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Field
                  as={TextField}
                  label="Número"
                  name="numero"
                  fullWidth
                  error={touched.numero && !!errors.numero}
                  helperText={<ErrorMessage name="numero" />}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Field
                  as={TextField}
                  label="Complemento"
                  name="complemento"
                  fullWidth
                  error={touched.complemento && !!errors.complemento}
                  helperText={<ErrorMessage name="complemento" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  label="Bairro"
                  name="bairro"
                  fullWidth
                  error={touched.bairro && !!errors.bairro}
                  helperText={<ErrorMessage name="bairro" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  label="Cidade"
                  name="cidade"
                  fullWidth
                  error={touched.cidade && !!errors.cidade}
                  helperText={<ErrorMessage name="cidade" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  label="Estado"
                  name="estado"
                  fullWidth
                  error={touched.estado && !!errors.estado}
                  helperText={<ErrorMessage name="estado" />}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>Cadastrar</Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default NovoEndereco;
