import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Animated, { Layout } from 'react-native-reanimated';
import { Button } from 'tamagui';
import z from 'zod';

import config from '../../../tamagui.config';
import { TextField } from '../../components';

const tokenColors = config.tokens.color;

const colors = [
  tokenColors.blue10Light,
  tokenColors.red10Light,
  tokenColors.yellow10Light,
  tokenColors.orange10Light,
];

const CreateDeckFormSchema = z.object({
  name: z.string().min(4),
  description: z.string().optional(),
  color: z.string(),
});

export type CreateDeckFormT = z.infer<typeof CreateDeckFormSchema>;

export type CreateDeckFormProps = {
  onSubmit: (deck: CreateDeckFormT) => void;
};

export function CreateDeckForm({ onSubmit }: CreateDeckFormProps) {
  const { control, handleSubmit, setValue } = useForm<CreateDeckFormT>({
    defaultValues: { name: '', description: '', color: '' },
    resolver: zodResolver(CreateDeckFormSchema),
  });

  return (
    <Animated.View layout={Layout} style={{ flex: 1, gap: 16 }}>
      <TextField control={control} name="name" placeholder="Name" />
      <TextField
        control={control}
        name="description"
        placeholder="Description"
      />
      {colors.map(({ name, val }) => (
        <Button
          key={name}
          bg={val}
          color="white"
          onPress={() => setValue('color', val)}
        >
          {name}
        </Button>
      ))}
      <Animated.View layout={Layout} style={{ paddingTop: 14 }}>
        <Button
          fontFamily="$rounded"
          fontSize={18}
          backgroundColor="$blue10"
          color="white"
          fontWeight="500"
          animation="lazy"
          pressStyle={{ scale: 0.95 }}
          onPress={handleSubmit(onSubmit)}
        >
          Create
        </Button>
      </Animated.View>
    </Animated.View>
  );
}
