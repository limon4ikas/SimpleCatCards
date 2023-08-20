import { Flame, Plus, Layers, Trash, Check } from 'lucide-react-native';
import { ComponentProps } from 'react';

const icons = {
  Flame,
  Plus,
  Layers,
  Trash,
  Check,
} as const;

type IconName = keyof typeof icons;

export type IconProps = ComponentProps<(typeof icons)[IconName]> & {
  name: IconName;
};

export function Icon(props: IconProps) {
  const { name, ...restProps } = props;
  const GetIcon = icons[name];

  return <GetIcon {...restProps} />;
}
