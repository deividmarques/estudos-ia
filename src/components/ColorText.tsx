import React from 'react';
import { Button } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

// Função utilitária para acessar propriedades aninhadas via string (ex: 'primary.main')
function getPaletteColor(theme: Theme, token: string): string | undefined {
  return token
    .split('.')
    .reduce<unknown>((acc, key) => (acc && typeof acc === 'object' && key in acc ? (acc as Record<string, unknown>)[key] : undefined), theme.palette) as string | undefined;
}

interface ColorTextProps {
  text: string;
  colorToken: string; // Aceita qualquer token de cor
  sx?: SxProps<Theme>;
  onClick?: () => void;
}

const ColorText: React.FC<ColorTextProps> = ({ text, colorToken, sx, onClick }) => (
  <Button
    sx={{
      color: theme => getPaletteColor(theme, colorToken),
      ...sx,
    }}
    onClick={onClick}
  >
    {text}
  </Button>
);

export default ColorText;
