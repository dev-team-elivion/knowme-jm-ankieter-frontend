import { JSX } from 'react';

import { CategoryRefDto, QuestionVersionDto } from '@/api/generated';
import { QuestionAnswersSection } from '@/views/questionForm/components/QuestionAnswersSection.comp.tsx';
import { QuestionClassificationSection } from '@/views/questionForm/components/QuestionClassificationSection.comp.tsx';
import { QuestionContentSection } from '@/views/questionForm/components/QuestionContentSection.comp.tsx';
import { QuestionScoringSection } from '@/views/questionForm/components/QuestionScoringSection.comp.tsx';
import { QuestionTranslationsSection } from '@/views/questionForm/components/QuestionTranslationsSection.comp.tsx';

type Props = {
  currentCategory?: CategoryRefDto;
  isEditing: boolean;
  version?: QuestionVersionDto;
};

export const QuestionFormSections = ({
  currentCategory,
  isEditing,
  version,
}: Props): JSX.Element => (
  <>
    <QuestionContentSection isTypeLocked={isEditing} revealIndex={1} />
    <QuestionAnswersSection revealIndex={2} />
    <QuestionScoringSection revealIndex={3} />
    <QuestionClassificationSection
      currentCategory={currentCategory}
      revealIndex={4}
      showBusinessKey={!isEditing}
    />
    <QuestionTranslationsSection revealIndex={5} version={version} />
  </>
);
