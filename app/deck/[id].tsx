import { useGlobalSearchParams } from "expo-router";

import { DeckContainer } from "../../lib/features/deck";
import { DeckScreenParams } from "../../lib/types";

export default function DeckScreen() {
  const params = useGlobalSearchParams<DeckScreenParams>();

  return <DeckContainer id={params.id} />;
}
