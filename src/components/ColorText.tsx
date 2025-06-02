import React from 'react';
import { Typography } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

// Função utilitária para acessar propriedades aninhadas via string (ex: 'primary.main')
function getPaletteColor(theme: Theme, token: string): string | undefined {
  return token
    .split('.')
    .reduce((acc: any, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), theme.palette);
}

interface ColorTextProps {
  text: string;
  colorToken: string; // Aceita qualquer token de cor
  sx?: SxProps<Theme>;
}

const ColorText: React.FC<ColorTextProps> = ({ text, colorToken, sx }) => (
  <Typography
    sx={{
      color: theme => getPaletteColor(theme, colorToken),
      ...sx,
    }}
  >
    {text}
  </Typography>
);

export default ColorText;
