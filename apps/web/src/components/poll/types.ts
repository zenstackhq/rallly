import type { ModelTypes } from '@rallly/database';

export interface ParticipantForm {
    votes: Array<
        | {
              optionId: string;
              type?: ModelTypes.VoteType;
          }
        | undefined
    >;
}

export interface ParticipantFormSubmitted {
    votes: Array<{ optionId: string; type: ModelTypes.VoteType }>;
}
