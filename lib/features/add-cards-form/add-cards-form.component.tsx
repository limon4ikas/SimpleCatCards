import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from 'expo-router';
import { useFieldArray, useForm } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';
import { ScrollView, YStack } from 'tamagui';
import { z } from 'zod';

import { Button, Card, Text, TextInput } from '../../components';

type Card = { front: string; back: string };

export const AddCardsFormSchema = z.object({
  cards: z.array(
    z.object({
      front: z.string().min(1),
      back: z.string().min(1),
    }),
  ),
});

export type AddCardsFormT = z.infer<typeof AddCardsFormSchema>;

export type AddCardsFormProps = {
  onSubmit: (values: AddCardsFormT) => void;
};

export function AddCardsForm({ onSubmit }: AddCardsFormProps) {
  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCardsFormT>({
    defaultValues: { cards: [{ front: '', back: '' }] },
    resolver: zodResolver(AddCardsFormSchema),
  });

  const { fields, append } = useFieldArray({ control, name: 'cards' });

  function handleAddClick() {
    append({ front: '', back: '' });
  }

  function handleCardChange(idx: number) {
    return (updatedCard: Card) => {
      const cards = getValues().cards;
      setValue(
        'cards',
        cards.map((card, index) =>
          index === idx ? Object.assign(card, updatedCard) : card,
        ),
      );
    };
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: (props) => (
            <TouchableOpacity {...props} onPress={handleSubmit(onSubmit)}>
              <Text type="headline" color="$blue10">
                Done
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView>
        <YStack gap="$4" flex={1} justifyContent="flex-end">
          <YStack gap="$2">
            {fields.map((cardField, index) => (
              <CardInput
                key={index}
                onChange={handleCardChange(index)}
                value={cardField}
                frontError={errors.cards?.[index]?.front?.message}
                backError={errors.cards?.[index]?.back?.message}
              />
            ))}
          </YStack>
          <Button onPress={handleAddClick}>Add Card</Button>
        </YStack>
      </ScrollView>
    </>
  );
}

type CardInputProps = {
  value: Card;
  onChange: (updatedCard: Card) => void;
  frontError?: string;
  backError?: string;
};

function CardInput({ value, onChange, frontError, backError }: CardInputProps) {
  function handleTextChange(inputKey: keyof Card) {
    return (text: string) => onChange?.({ ...value, [inputKey]: text });
  }

  const error = frontError || backError;

  return (
    <Card gap="$4">
      <TextInput
        placeholder="Term"
        value={value.front}
        onChangeText={handleTextChange('front')}
      />
      <TextInput
        placeholder="Defenition"
        value={value.back}
        onChangeText={handleTextChange('back')}
      />
      {error ? (
        <Text type="footnote" color="$red10">
          {error}
        </Text>
      ) : null}
    </Card>
  );
}
