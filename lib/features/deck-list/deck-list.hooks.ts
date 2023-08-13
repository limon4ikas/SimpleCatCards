import { useMemo, useState } from "react";

import { DeckModel } from "../../types";

type UseDeckListConfig = {
  decks: DeckModel[];
};

export const useDeckList = (config: UseDeckListConfig) => {
  const [filterName, setFilterName] = useState("");

  const filteredDecks = useMemo(
    () =>
      filterName.length
        ? config.decks.filter((deck) => deck.name.includes(filterName))
        : config.decks,
    [filterName, config]
  );

  return { filterName, setFilterName, filteredDecks };
};
