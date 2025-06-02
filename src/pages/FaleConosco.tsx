import React, { useState } from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'

const FaleConosco: React.FC = () => {
  const [nome, setNome] = useState('')
  const [mensagem, setMensagem] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Obrigado, ${nome}! Mensagem enviada.`)
    setNome('')
    setMensagem('')
  }

  return (
    <Box maxWidth={400} mx="auto">
      <Typography variant="h4" gutterBottom>Fale Conosco</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Mensagem"
          value={mensagem}
          onChange={e => setMensagem(e.target.value)}
          fullWidth
          required
          margin="normal"
          multiline
          minRows={4}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Enviar</Button>
      </form>
    </Box>
  )
}

export default FaleConosco