import {
  MediaAssetDto,
  QuestionDetailsDto,
  QuestionTypeDto,
  QuestionVersionDto,
  VersionStatusDto,
} from '@/api/generated';
import { QuestionPresentationModel } from '@/components/questionPresentation/model/QuestionPresentation.model.ts';

export const findPresentedVersion = (
  question: QuestionDetailsDto,
): QuestionVersionDto | undefined =>
  question.versions.find(version => version.status === VersionStatusDto.Active) ??
  question.versions.at(0);

export const isMediaForLocale = (asset: MediaAssetDto, locale: string): boolean =>
  asset.locale === undefined || asset.locale === locale;

export const toVersionPresentation = (
  type: QuestionTypeDto,
  version: QuestionVersionDto,
  locale: string,
): null | QuestionPresentationModel => {
  const translation = version.translations.find(item => item.locale === locale && item.body);
  if (translation === undefined) {
    return null;
  }

  return {
    answerKey: translation.answerKey,
    answers: [...version.answers]
      .sort((first, second) => first.displayOrder - second.displayOrder)
      .map(answer => ({
        body: answer.translations.find(item => item.locale === locale)?.body ?? '',
        correctOrder: answer.correctOrder,
        id: answer.id,
        isCorrect: answer.isCorrect,
        media: answer.media.filter(asset => isMediaForLocale(asset, locale)),
        points: answer.points,
      })),
    body: translation.body,
    examinerCommentRequired: version.examinerCommentRequired === true,
    expectedAnswers: translation.expectedAnswers ?? [],
    explanation: translation.explanation,
    maxPoints: version.maxPoints,
    media: version.media.filter(asset => isMediaForLocale(asset, locale)),
    scaleMax: version.scaleMax,
    topics: translation.topics ?? [],
    topicsToPick: version.topicsToPick,
    type,
  };
};

export const moveItem = <T>(items: T[], from: number, to: number): T[] => {
  const item = items.at(from);
  if (item === undefined || to < 0 || to >= items.length) {
    return items;
  }
  const moved = items.filter((_, index) => index !== from);
  return [...moved.slice(0, to), item, ...moved.slice(to)];
};
