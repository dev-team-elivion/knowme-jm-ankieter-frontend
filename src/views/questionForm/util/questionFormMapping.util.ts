import { DeepPartial } from 'react-hook-form';

import {
  CreateQuestionRequestDto,
  NewAnswerOptionDto,
  QuestionDetailsDto,
  QuestionPurposeDto,
  QuestionSourceDto,
  QuestionTypeDto,
  QuestionVersionContentDto,
  QuestionVersionDto,
  ScoringRuleDto,
  TranslationStatusDto,
  UpdateClassificationRequestDto,
  VersionStatusDto,
} from '@/api/generated';
import {
  DEFAULT_MAX_POINTS,
  SOURCE_LOCALE,
} from '@/views/questionForm/model/QuestionForm.constants.ts';
import {
  AnswerFormModel,
  ChoiceQuestionType,
  QuestionFormModel,
} from '@/views/questionForm/model/QuestionForm.model.ts';
import { isQuestionSource } from '@/views/questionForm/util/questionEnums.guard.ts';

type Localized = {
  locale: string;
};

const findLocale = <T extends Localized>(items: T[], locale: string): T | undefined =>
  items.find(item => item.locale === locale);

const withoutLocale = <T extends Localized>(items: T[], locale: string): T[] =>
  items.filter(item => item.locale !== locale);

const toOptionalText = (value: string): string | undefined => value.trim() || undefined;

const requireSource = (source: QuestionFormModel['source']): QuestionSourceDto => {
  if (!isQuestionSource(source)) {
    throw new Error('Question source is missing after validation.');
  }
  return source;
};

export const createEmptyAnswer = (): AnswerFormModel => ({
  body: '',
  isCorrect: false,
  optionId: null,
});

export const createEmptyQuestionForm = (): QuestionFormModel => ({
  answers: [createEmptyAnswer(), createEmptyAnswer()],
  body: '',
  businessKey: '',
  categoryId: '',
  explanation: '',
  hasManualKey: false,
  maxPoints: DEFAULT_MAX_POINTS,
  positionCodes: [],
  purpose: QuestionPurposeDto.Test,
  scoringRule: ScoringRuleDto.AllOrNothing,
  source: '',
  sourceName: '',
  tags: [],
  type: QuestionTypeDto.SingleChoice,
});

export const findDisplayVersion = (question: QuestionDetailsDto): QuestionVersionDto | undefined =>
  question.versions.find(version => version.status === VersionStatusDto.Active) ??
  question.versions.at(0);

export const toDuplicateQuestionForm = (
  question: QuestionDetailsDto,
  type: ChoiceQuestionType,
): QuestionFormModel => {
  const form = toQuestionForm(question, findDisplayVersion(question), type);
  return {
    ...form,
    answers: form.answers.map(answer => ({ ...answer, optionId: null })),
    businessKey: '',
    hasManualKey: false,
  };
};

export const findEditableVersion = (question: QuestionDetailsDto): QuestionVersionDto | undefined =>
  question.versions.find(version => version.status !== VersionStatusDto.Retired);

export const getSourceLocale = (version: QuestionVersionDto | undefined): string =>
  version?.sourceLocale ?? SOURCE_LOCALE;

export const toQuestionForm = (
  question: QuestionDetailsDto,
  version: QuestionVersionDto | undefined,
  type: ChoiceQuestionType,
): QuestionFormModel => {
  const sourceLocale = getSourceLocale(version);
  const sourceTranslation = version && findLocale(version.translations, sourceLocale);
  const answers = [...(version?.answers ?? [])].sort(
    (first, second) => first.displayOrder - second.displayOrder,
  );

  return {
    answers: answers.map(answer => ({
      body: findLocale(answer.translations, sourceLocale)?.body ?? '',
      isCorrect: answer.isCorrect,
      optionId: answer.id,
    })),
    body: sourceTranslation?.body ?? '',
    businessKey: question.businessKey,
    categoryId: question.category.id,
    explanation: sourceTranslation?.explanation ?? '',
    hasManualKey: false,
    maxPoints: version?.maxPoints ?? DEFAULT_MAX_POINTS,
    positionCodes: question.positionCodes,
    purpose: question.purpose,
    scoringRule: version?.scoringRule ?? ScoringRuleDto.AllOrNothing,
    source: question.source,
    sourceName: question.sourceName ?? '',
    tags: question.tags,
    type,
  };
};

const toAnswerOption = (
  answer: AnswerFormModel,
  index: number,
  form: QuestionFormModel,
  base: QuestionVersionDto | undefined,
): NewAnswerOptionDto => {
  const sourceLocale = getSourceLocale(base);
  const original = base?.answers.find(option => option.id === answer.optionId);

  return {
    correctOrder: original?.correctOrder,
    displayOrder: index + 1,
    id: original?.id,
    isCorrect: form.purpose === QuestionPurposeDto.Test && answer.isCorrect,
    points: original?.points,
    translations: [
      { body: answer.body.trim(), locale: sourceLocale },
      ...withoutLocale(original?.translations ?? [], sourceLocale),
    ],
  };
};

export const toVersionContent = (
  form: QuestionFormModel,
  base?: QuestionVersionDto,
): QuestionVersionContentDto => {
  const sourceLocale = getSourceLocale(base);
  const baseTranslations = base?.translations ?? [];
  const baseSource = findLocale(baseTranslations, sourceLocale);

  return {
    answers: form.answers.map((answer, index) => toAnswerOption(answer, index, form, base)),
    maxPoints: form.maxPoints,
    scaleMax: base?.scaleMax,
    scoringRule:
      form.type === QuestionTypeDto.SingleChoice ? ScoringRuleDto.AllOrNothing : form.scoringRule,
    sourceLocale,
    translations: [
      {
        answerKey: baseSource?.answerKey,
        body: form.body.trim(),
        explanation: toOptionalText(form.explanation),
        locale: sourceLocale,
        status: baseSource?.status ?? TranslationStatusDto.Draft,
      },
      ...withoutLocale(baseTranslations, sourceLocale),
    ],
  };
};

export const toClassificationRequest = (
  form: QuestionFormModel,
): UpdateClassificationRequestDto => ({
  categoryId: form.categoryId,
  positionCodes: form.positionCodes,
  source: requireSource(form.source),
  sourceName: toOptionalText(form.sourceName),
  tagIds: form.tags.map(tag => tag.id),
});

export const toCreateQuestionRequest = (form: QuestionFormModel): CreateQuestionRequestDto => ({
  ...toClassificationRequest(form),
  businessKey: form.hasManualKey ? toOptionalText(form.businessKey) : undefined,
  purpose: form.purpose,
  type: form.type,
  version: toVersionContent(form),
});

const toClassificationSnapshot = (form: DeepPartial<QuestionFormModel> | undefined): string =>
  JSON.stringify([
    form?.categoryId,
    form?.positionCodes,
    form?.source,
    form?.sourceName?.trim(),
    form?.tags?.map(tag => tag?.id),
  ]);

export const hasClassificationChanges = (
  values: QuestionFormModel,
  savedValues: DeepPartial<QuestionFormModel> | undefined,
): boolean => toClassificationSnapshot(values) !== toClassificationSnapshot(savedValues);
