import { ComponentProps } from 'react';
import {
  Control,
  FieldValues,
  Path,
  UseControllerProps,
  useController,
} from 'react-hook-form';

import { TextInput } from './text-input';

export type TextFieldProps<FormValues extends FieldValues> = Omit<
  UseControllerProps<FormValues>,
  'name' | 'control'
> & {
  name: Path<FormValues>;
  control: Control<FormValues, unknown>;
} & ComponentProps<typeof TextInput>;

export function TextField<FormValues extends FieldValues>(
  props: TextFieldProps<FormValues>,
) {
  const { field, fieldState } = useController(props);

  return (
    <TextInput
      value={field.value}
      onChangeText={field.onChange}
      error={fieldState.error?.message}
      {...props}
    />
  );
}
