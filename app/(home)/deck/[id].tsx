import { ScrollView } from "tamagui";
import { useGlobalSearchParams } from "expo-router";

import { DeckScreenParams } from "../../../lib/types";
import { DeckContainer } from "../../../lib/features";

export default function DeckScreen() {
  const params = useGlobalSearchParams<DeckScreenParams>();

  return (
    <ScrollView>
      <DeckContainer id={params.id} />
    </ScrollView>
  );
}
