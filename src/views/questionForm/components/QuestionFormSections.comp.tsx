import { JSX } from 'react';
import { useWatch } from 'react-hook-form';

import { CategoryRefDto, QuestionTypeDto } from '@/api/generated';
import { ExpectedAnswersSection } from '@/views/questionForm/components/ExpectedAnswersSection.comp.tsx';
import { QuestionAnswersSection } from '@/views/questionForm/components/QuestionAnswersSection.comp.tsx';
import { QuestionClassificationSection } from '@/views/questionForm/components/QuestionClassificationSection.comp.tsx';
import { QuestionContentSection } from '@/views/questionForm/components/QuestionContentSection.comp.tsx';
import { QuestionScoringSection } from '@/views/questionForm/components/QuestionScoringSection.comp.tsx';
import { QuestionFormModel } from '@/views/questionForm/model/QuestionForm.model.ts';

type Props = {
  currentCategory?: CategoryRefDto;
  isEditing: boolean;
};

export const QuestionFormSections = ({ currentCategory, isEditing }: Props): JSX.Element => {
  const type = useWatch<QuestionFormModel, 'type'>({ name: 'type' });

  return (
    <>
      <QuestionContentSection isTypeLocked={isEditing} revealIndex={1} />
      {type === QuestionTypeDto.ExpectedAnswer ? (
        <ExpectedAnswersSection revealIndex={2} />
      ) : (
        <QuestionAnswersSection revealIndex={2} />
      )}
      <QuestionScoringSection revealIndex={3} />
      <QuestionClassificationSection
        currentCategory={currentCategory}
        revealIndex={4}
        showBusinessKey={!isEditing}
      />
    </>
  );
};
