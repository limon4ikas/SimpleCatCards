import { useMemo, useState } from "react";

import { Deck } from "../../types";

type UseDeckListConfig = {
  decks: Deck[];
};

export const useDeckList = (config: UseDeckListConfig) => {
  const { decks } = config;
  const [filterName, setFilterName] = useState("");

  const filteredDecks = useMemo(
    () => decks.filter((deck) => deck.name.startsWith(filterName)),
    []
  );

  return { filterName, setFilterName, filteredDecks };
};
