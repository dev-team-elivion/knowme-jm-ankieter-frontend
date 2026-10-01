import { MediaAssetDto } from '@/api/generated';
import { QuestionPresentationModel } from '@/components/questionPresentation/model/QuestionPresentation.model.ts';
import { QuestionFormModel } from '@/views/questionForm/model/QuestionForm.model.ts';

type FormMedia = {
  answerMedia: Map<string, MediaAssetDto[]>;
  versionMedia: MediaAssetDto[];
};

export const toFormPresentation = (
  values: QuestionFormModel,
  { answerMedia, versionMedia }: FormMedia,
): QuestionPresentationModel => ({
  answers: values.answers.map((answer, index) => ({
    body: answer.body.trim(),
    id: answer.optionId ?? `unsaved-${index}`,
    isCorrect: answer.isCorrect,
    media: (answer.optionId === null ? undefined : answerMedia.get(answer.optionId)) ?? [],
  })),
  body: values.body.trim(),
  examinerCommentRequired: false,
  expectedAnswers: values.expectedAnswers
    .map(expected => expected.value.trim())
    .filter(value => value.length > 0),
  explanation: values.explanation.trim() || undefined,
  maxPoints: values.maxPoints,
  media: versionMedia,
  topics: [],
  type: values.type,
});
