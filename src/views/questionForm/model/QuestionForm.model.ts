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

export type ExpectedAnswerFormModel = {
  value: string;
};

export type QuestionFormModel = {
  answers: AnswerFormModel[];
  body: string;
  businessKey: string;
  categoryId: string;
  expectedAnswers: ExpectedAnswerFormModel[];
  explanation: string;
  hasManualKey: boolean;
  maxPoints: number;
  positionCodes: string[];
  purpose: QuestionPurposeDto;
  scoringRule: ScoringRuleDto;
  source: '' | QuestionSourceDto;
  sourceName: string;
  tags: TagRefDto[];
  type: QuestionFormType;
};

export type QuestionFormType = ChoiceQuestionType | typeof QuestionTypeDto.ExpectedAnswer;
