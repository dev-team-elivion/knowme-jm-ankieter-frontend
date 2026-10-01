import { MediaAssetDto, QuestionTypeDto } from '@/api/generated';

export type PresentationAnswer = {
  body: string;
  correctOrder?: number;
  id: string;
  isCorrect: boolean;
  media: MediaAssetDto[];
  points?: number;
};

export type QuestionPresentationModel = {
  answerKey?: string;
  answers: PresentationAnswer[];
  body: string;
  examinerCommentRequired: boolean;
  expectedAnswers: string[];
  explanation?: string;
  maxPoints: number;
  media: MediaAssetDto[];
  scaleMax?: number;
  topics: string[];
  topicsToPick?: number;
  type: QuestionTypeDto;
};
