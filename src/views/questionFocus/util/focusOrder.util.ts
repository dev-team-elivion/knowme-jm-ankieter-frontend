export type FocusPosition = {
  activeId: string | undefined;
  index: number;
  isResolving: boolean;
  nextId: string | undefined;
  orderedIds: string[];
  previousId: string | undefined;
};

export const resolveFocusPosition = (
  ids: string[],
  requestedId: string | undefined,
  hasMore: boolean,
): FocusPosition => {
  const isMissing = requestedId !== undefined && !ids.includes(requestedId);
  const isResolving = isMissing && hasMore;
  const orderedIds = isMissing && !hasMore ? [requestedId, ...ids] : ids;
  const activeId = isResolving ? undefined : (requestedId ?? orderedIds.at(0));
  const index = activeId === undefined ? -1 : orderedIds.indexOf(activeId);

  return {
    activeId,
    index,
    isResolving,
    nextId: index >= 0 ? orderedIds.at(index + 1) : undefined,
    orderedIds,
    previousId: index > 0 ? orderedIds.at(index - 1) : undefined,
  };
};
