import { JSX } from 'react';

import { CategoryRefDto } from '@/api/generated';
import { QuestionAnswersSection } from '@/views/questionForm/components/QuestionAnswersSection.comp.tsx';
import { QuestionClassificationSection } from '@/views/questionForm/components/QuestionClassificationSection.comp.tsx';
import { QuestionContentSection } from '@/views/questionForm/components/QuestionContentSection.comp.tsx';
import { QuestionScoringSection } from '@/views/questionForm/components/QuestionScoringSection.comp.tsx';

type Props = {
  currentCategory?: CategoryRefDto;
  isEditing: boolean;
};

export const QuestionFormSections = ({ currentCategory, isEditing }: Props): JSX.Element => (
  <>
    <QuestionContentSection isTypeLocked={isEditing} revealIndex={1} />
    <QuestionAnswersSection revealIndex={2} />
    <QuestionScoringSection revealIndex={3} />
    <QuestionClassificationSection
      currentCategory={currentCategory}
      revealIndex={4}
      showBusinessKey={!isEditing}
    />
  </>
);
