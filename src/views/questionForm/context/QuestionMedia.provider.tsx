import { JSX, ReactNode, useMemo } from 'react';

import { QuestionVersionDto, VersionStatusDto } from '@/api/generated';
import {
  QuestionMediaContext,
  QuestionMediaContextValue,
  QuestionMediaTarget,
} from '@/views/questionForm/context/QuestionMedia.context.ts';

type Props = {
  children: ReactNode;
  questionId: string;
  version: QuestionVersionDto | undefined;
};

const toTarget = (
  questionId: string,
  version: QuestionVersionDto | undefined,
): QuestionMediaTarget => {
  if (version === undefined) {
    return { kind: 'unsaved' };
  }
  return version.status === VersionStatusDto.Draft
    ? { kind: 'editable', questionId, versionId: version.id }
    : { kind: 'readOnly' };
};

export const QuestionMediaProvider = ({ children, questionId, version }: Props): JSX.Element => {
  const value = useMemo<QuestionMediaContextValue>(
    () => ({
      answerMedia: new Map((version?.answers ?? []).map(answer => [answer.id, answer.media])),
      target: toTarget(questionId, version),
      versionMedia: version?.media ?? [],
    }),
    [questionId, version],
  );

  return <QuestionMediaContext value={value}>{children}</QuestionMediaContext>;
};
