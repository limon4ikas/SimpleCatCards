import { Stack, Text } from "tamagui";

export default function TabOneScreen() {
  return (
    <Stack flex={1} alignItems="center" justifyContent="center">
      <Text fontSize={20} fontWeight="bold" color="$red10">
        Home!
      </Text>
    </Stack>
  );
}
