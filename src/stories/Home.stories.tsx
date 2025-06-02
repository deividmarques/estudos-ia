import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within } from '@storybook/testing-library';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Home from '../pages/Home';
import { lightTheme, darkTheme } from '../themes';

import type { Decorator } from '@storybook/react-vite';

const withMuiTheme: Decorator = (Story, context) => {
  const theme = context.args.mode === 'dark' ? darkTheme : lightTheme;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  );
};

const meta: Meta<typeof Home> = {
  title: 'Pages/Home',
  component: Home,
  decorators: [withMuiTheme],
  parameters: {
    docs: {
      description: {
        component:
          'Página Home de exemplo, exibindo componentes MUI e o ColorText. Inclui alternância de tema (dark/light) e exemplos de uso de vários componentes.',
      },
    },
  },
  argTypes: {
    toggleMode: { action: 'toggleMode', description: 'Alterna entre dark e light mode' },
    mode: {
      control: { type: 'radio' },
      options: ['light', 'dark'],
      description: 'Modo do tema (light ou dark)',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Home>;

export const LightMode: Story = {
  render: (args, { globals, updateGlobals }) => {
    // O estado inicial deve ser controlado pelo global, se existir, senão pelo arg
    const initialMode = globals?.mode ?? args.mode ?? 'light';
    const [mode, setMode] = React.useState<'light' | 'dark'>(initialMode);
    React.useEffect(() => {
      if (updateGlobals) {
        updateGlobals({ mode });
      }
    }, [mode, updateGlobals]);
    return (
      <Home
        {...args}
        mode={mode}
        toggleMode={() => setMode(mode === 'light' ? 'dark' : 'light')}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Verifica que o modo inicial é light
    await canvas.findByText('Light Mode');
    // Simula a alternância de tema para dark
    const label = await canvas.getByText('Light Mode');
    await userEvent.click(label);
    await canvas.findByText('Dark Mode');
    // Alterna de volta para light
    const labelDark = await canvas.getByText('Dark Mode');
    await userEvent.click(labelDark);
    await canvas.findByText('Light Mode');
  },
};

export const DarkMode: Story = {
  args: {
    toggleMode: () => {},
    mode: 'dark',
  },
};
