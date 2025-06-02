import type { Meta, StoryObj } from '@storybook/react';
import ColorText from '../components/ColorText';
import { userEvent, within } from '@storybook/testing-library';

const meta: Meta<typeof ColorText> = {
  title: 'Components/ColorText',
  component: ColorText,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Componente que exibe um texto com a cor definida por um token do tema MUI. Props: `text` (string), `colorToken` (token de cor do theme, ex: "primary.main"), `sx` (opcional, estilos adicionais).',
      },
    },
  },
  argTypes: {
    text: { control: 'text', description: 'Texto a ser exibido' },
    colorToken: {
      control: 'text',
      description: 'Token de cor do tema (ex: "primary.main", "secondary.main", "text.primary")',
    },
    sx: { control: 'object', description: 'Estilos adicionais (sx)' },
  },
};

export default meta;

type Story = StoryObj<typeof ColorText>;

export const Primary: Story = {
  args: {
    text: 'Texto com cor primária',
    colorToken: 'primary.main',
  },
};

export const Secondary: Story = {
  args: {
    text: 'Texto com cor secundária',
    colorToken: 'secondary.main',
  },
};

export const Success: Story = {
  args: {
    text: 'Texto com cor de sucesso',
    colorToken: 'success.main',
  },
};

export const TextPrimary: Story = {
  args: {
    text: 'Texto padrão (text.primary)',
    colorToken: 'text.primary',
  },
};

export const CustomStyle: Story = {
  args: {
    text: 'Texto grande e negrito',
    colorToken: 'primary.main',
    sx: { fontSize: 32, fontWeight: 'bold' },
  },
};

export const Clickable: Story = {
  args: {
    text: 'Clique em mim',
    colorToken: 'primary.main',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByText(args.text);
    await userEvent.click(button);
    // Aqui você pode adicionar expect usando @storybook/jest se desejar
  },
};
