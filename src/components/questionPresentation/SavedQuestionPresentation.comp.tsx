import { JSX, ReactNode } from 'react';

import { QuestionDetailsDto, VersionStatusDto } from '@/api/generated';
import { QuestionPresentation } from '@/components/questionPresentation/QuestionPresentation.comp.tsx';
import {
  findPresentedVersion,
  toVersionPresentation,
} from '@/components/questionPresentation/util/questionPresentation.util.ts';
import { InfoCallout } from '@/components/state/InfoCallout.comp.tsx';
import { StatusPill } from '@/components/state/StatusPill.comp.tsx';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

type Props = {
  actions?: ReactNode;
  locale?: string;
  onShowCorrectChange: (showCorrect: boolean) => void;
  question: QuestionDetailsDto;
  showCorrect: boolean;
};

export const SavedQuestionPresentation = ({
  actions,
  locale,
  onShowCorrectChange,
  question,
  showCorrect,
}: Props): JSX.Element => {
  const { t } = useTranslationWithPrefix('components.questionPresentation');
  const version = findPresentedVersion(question);

  if (version === undefined) {
    return <InfoCallout>{t('noVersion')}</InfoCallout>;
  }

  return (
    <QuestionPresentation
      actions={actions}
      adornment={
        version.status !== VersionStatusDto.Active && (
          <StatusPill label={t(`hiddenMarker.${version.status}`)} tone="warning" />
        )
      }
      key={version.id}
      model={toVersionPresentation(question.type, version, locale ?? version.sourceLocale)}
      onShowCorrectChange={onShowCorrectChange}
      showCorrect={showCorrect}
      type={question.type}
    />
  );
};
