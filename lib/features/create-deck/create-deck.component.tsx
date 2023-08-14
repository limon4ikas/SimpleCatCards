import { zodResolver } from '@hookform/resolvers/zod';
import { ElementRef, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InteractionManager } from 'react-native';
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated';
import { Button, Input } from 'tamagui';
import z from 'zod';

const CreateDeckFormSchema = z.object({
  name: z.string().min(4),
  description: z.string().optional(),
});

export type CreateDeckFormT = z.infer<typeof CreateDeckFormSchema>;

export type CreateDeckFormProps = {
  onSubmit: (deck: CreateDeckFormT) => void;
};

export function CreateDeckForm({ onSubmit }: CreateDeckFormProps) {
  const { control, handleSubmit } = useForm<CreateDeckFormT>({
    defaultValues: {
      name: '',
      description: '',
    },
    resolver: zodResolver(CreateDeckFormSchema),
  });

  const ref = useRef<ElementRef<typeof Input>>(null);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => ref.current?.focus());
  }, []);

  return (
    <Animated.View layout={Layout} style={{ flex: 1, gap: 16 }}>
      <Controller<CreateDeckFormT>
        name="name"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Animated.View layout={Layout}>
            <Input
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              fontFamily="$rounded"
              fontWeight="600"
              fontSize={16}
              borderWidth={0}
              backgroundColor="$gray3"
              placeholderTextColor="$gray10"
              placeholder="Name"
              ref={ref}
            />
            {error && (
              <Animated.Text
                style={{
                  fontFamily: 'SFProRoundedMedium',
                  fontWeight: '500',
                  fontSize: 14,
                  paddingTop: 4,
                  color: 'red',
                }}
                entering={FadeIn}
                exiting={FadeOut}
                layout={Layout}
              >
                {error?.message}
              </Animated.Text>
            )}
          </Animated.View>
        )}
      />
      <Controller<CreateDeckFormT>
        name="description"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Animated.View layout={Layout}>
            <Input
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              fontFamily="$rounded"
              fontWeight="600"
              fontSize={16}
              borderWidth={0}
              backgroundColor="$gray3"
              placeholderTextColor="$gray10"
              placeholder="Description"
            />
            {error && (
              <Animated.Text
                style={{
                  fontFamily: 'SFProRoundedMedium',
                  fontWeight: '500',
                  fontSize: 24,
                }}
                entering={FadeIn}
                exiting={FadeOut}
                layout={Layout}
              >
                {error?.message}
              </Animated.Text>
            )}
          </Animated.View>
        )}
      />
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
