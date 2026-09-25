import {
  QuestionPurposeDto,
  QuestionSourceDto,
  QuestionTypeDto,
  ScoringRuleDto,
} from '@/api/generated';
import { ChoiceQuestionType } from '@/views/questionForm/model/QuestionForm.model.ts';

export const SOURCE_LOCALE = 'pl';
export const MIN_ANSWERS = 2;
export const DEFAULT_MAX_POINTS = 1;

export const CHOICE_QUESTION_TYPES: ChoiceQuestionType[] = [
  QuestionTypeDto.SingleChoice,
  QuestionTypeDto.MultipleChoice,
];

export const QUESTION_PURPOSES: QuestionPurposeDto[] = Object.values(QuestionPurposeDto);
export const QUESTION_SOURCES: QuestionSourceDto[] = Object.values(QuestionSourceDto);
export const SCORING_RULES: ScoringRuleDto[] = Object.values(ScoringRuleDto);
