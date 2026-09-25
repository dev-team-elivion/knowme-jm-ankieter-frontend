import {
  QuestionPurposeDto,
  QuestionSourceDto,
  QuestionTypeDto,
  ScoringRuleDto,
  TagRefDto,
} from '@/api/generated';

export type AnswerFormModel = {
  body: string;
  isCorrect: boolean;
  optionId: null | string;
};

export type ChoiceQuestionType = Extract<
  QuestionTypeDto,
  typeof QuestionTypeDto.MultipleChoice | typeof QuestionTypeDto.SingleChoice
>;

export type QuestionFormModel = {
  answers: AnswerFormModel[];
  body: string;
  businessKey: string;
  categoryId: string;
  explanation: string;
  hasManualKey: boolean;
  maxPoints: number;
  positionCodes: string[];
  purpose: QuestionPurposeDto;
  scoringRule: ScoringRuleDto;
  source: '' | QuestionSourceDto;
  sourceName: string;
  tags: TagRefDto[];
  type: ChoiceQuestionType;
};
