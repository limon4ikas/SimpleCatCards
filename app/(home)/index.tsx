import { ScrollView, Spacer } from "tamagui";

import { DeckListContainer } from "../../lib/features";

export default function TabOneScreen() {
  return (
    <ScrollView>
      <Spacer height={25} />
      <DeckListContainer />
    </ScrollView>
  );
}
