import { QuestionSourceDto, QuestionTypeDto } from '@/api/generated';
import {
  CHOICE_QUESTION_TYPES,
  QUESTION_FORM_TYPES,
  QUESTION_SOURCES,
} from '@/views/questionForm/model/QuestionForm.constants.ts';
import {
  ChoiceQuestionType,
  QuestionFormType,
} from '@/views/questionForm/model/QuestionForm.model.ts';

export const isChoiceQuestionType = (type: QuestionTypeDto): type is ChoiceQuestionType =>
  CHOICE_QUESTION_TYPES.some(candidate => candidate === type);

export const isQuestionFormType = (type: QuestionTypeDto): type is QuestionFormType =>
  QUESTION_FORM_TYPES.some(candidate => candidate === type);

export const isQuestionSource = (value: string): value is QuestionSourceDto =>
  QUESTION_SOURCES.some(candidate => candidate === value);
