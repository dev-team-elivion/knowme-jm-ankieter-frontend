import { JSX } from 'react';

import { QuestionTypeDto } from '@/api/generated';
import { ChoiceAnswers } from '@/components/questionPresentation/ChoiceAnswers.comp.tsx';
import { ExaminerPanel } from '@/components/questionPresentation/ExaminerPanel.comp.tsx';
import { QuestionPresentationModel } from '@/components/questionPresentation/model/QuestionPresentation.model.ts';
import { OrderingAnswers } from '@/components/questionPresentation/OrderingAnswers.comp.tsx';
import { TextAnswer } from '@/components/questionPresentation/TextAnswer.comp.tsx';

type Props = {
  model: QuestionPresentationModel;
  showCorrect: boolean;
};

export const PresentationAnswers = ({ model, showCorrect }: Props): JSX.Element => {
  switch (model.type) {
    case QuestionTypeDto.ExpectedAnswer:
    case QuestionTypeDto.OpenText:
      return (
        <TextAnswer
          answerKey={model.answerKey}
          expectedAnswers={model.expectedAnswers}
          isOpen={model.type === QuestionTypeDto.OpenText}
          showCorrect={showCorrect}
        />
      );
    case QuestionTypeDto.MultipleChoice:
    case QuestionTypeDto.SingleChoice:
      return (
        <ChoiceAnswers
          answers={model.answers}
          isMultiple={model.type === QuestionTypeDto.MultipleChoice}
          showCorrect={showCorrect}
        />
      );
    case QuestionTypeDto.Ordering:
      return (
        <OrderingAnswers
          answers={model.answers}
          key={model.answers.map(answer => answer.id).join()}
          showCorrect={showCorrect}
        />
      );
    case QuestionTypeDto.PassFail:
    case QuestionTypeDto.Practical:
      return (
        <ExaminerPanel
          answerKey={model.answerKey}
          isCommentRequired={model.examinerCommentRequired}
          isPassFail={model.type === QuestionTypeDto.PassFail}
          scaleMax={model.scaleMax ?? model.maxPoints}
          topics={model.topics}
          topicsToPick={model.topicsToPick}
        />
      );
  }
};
