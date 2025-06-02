import React from 'react'
import {
  Box, Typography, Button, TextField, Checkbox, FormControlLabel, Slider,
  Switch, Radio, RadioGroup, FormLabel, IconButton, Chip, Card, CardContent
} from '@mui/material'
// import FavoriteIcon from '@mui/icons-material/Favorite'

const Home: React.FC = () => (
  <Box>
    <Typography variant="h4" gutterBottom>
      Exemplos de Componentes MUI
    </Typography>
    <Box display="flex" flexWrap="wrap" gap={2}>
      <Button variant="contained" color="primary">Botão</Button>
      <TextField label="Campo de Texto" variant="outlined" />
      <FormControlLabel control={<Checkbox defaultChecked />} label="Checkbox" />
      <Slider defaultValue={30} aria-label="Slider" sx={{ width: 200 }} />
      <FormControlLabel control={<Switch />} label="Switch" />
      <RadioGroup row defaultValue="a">
        <FormLabel sx={{ mr: 2 }}>Radio</FormLabel>
        <FormControlLabel value="a" control={<Radio />} label="A" />
        <FormControlLabel value="b" control={<Radio />} label="B" />
      </RadioGroup>
      <IconButton color="secondary">
        DvD
      </IconButton>
      <Chip label="Chip" color="primary" />
      <Card sx={{ minWidth: 180 }}>
        <CardContent>
          <Typography variant="h6">Card</Typography>
          <Typography variant="body2">Conteúdo do card</Typography>
        </CardContent>
      </Card>
      <Box sx={{ bgcolor: 'secondary.main', color: 'white', p: 2, borderRadius: 1 }}>
        Box customizado (MUI)
      </Box>
    </Box>
  </Box>
)

export default Home