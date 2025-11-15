import { cn } from "@rallly/ui";
import * as React from "react";

import type { ModelTypes } from "@rallly/database";
import VoteIcon from "./vote-icon";

export interface VoteSelectorProps {
  value?: ModelTypes.VoteType;
  onChange?: (value: ModelTypes.VoteType) => void;
  onFocus?: React.FocusEventHandler<HTMLButtonElement>;
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
  className?: string;
}

const orderedVoteTypes: ModelTypes.VoteType[] = ["yes", "ifNeedBe", "no"];

export const toggleVote = (value?: ModelTypes.VoteType) => {
  if (!value) return orderedVoteTypes[0];
  return orderedVoteTypes[
    (orderedVoteTypes.indexOf(value) + 1) % orderedVoteTypes.length
  ];
};

export const VoteSelector = React.forwardRef<
  HTMLButtonElement,
  VoteSelectorProps
>(function VoteSelector(
  { value, onChange, onFocus, onBlur, onKeyDown, className },
  ref,
) {
  return (
    <button
      data-testid="vote-selector"
      type="button"
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      className={cn(
        "flex size-7 items-center justify-center rounded-md border bg-white ring-gray-200 focus:ring-2",
        className,
      )}
      onClick={() => {
        onChange?.(value ? toggleVote(value) : orderedVoteTypes[0]);
      }}
      ref={ref}
    >
      <VoteIcon type={value} />
    </button>
  );
});
