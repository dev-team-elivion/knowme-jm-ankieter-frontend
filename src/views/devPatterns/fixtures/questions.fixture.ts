import {
  QuestionCategoryEnum,
  QuestionStatusEnum,
} from '@/views/devPatterns/model/Question.enum.ts';
import { QuestionRow } from '@/views/devPatterns/model/Question.model.ts';

const FIXTURE_SIZE = 240;

const QUESTION_STEMS: ReadonlyArray<[QuestionCategoryEnum, string]> = [
  [QuestionCategoryEnum.FOOD_SAFETY, 'W jakiej temperaturze przechowuje się nabiał?'],
  [QuestionCategoryEnum.FOOD_SAFETY, 'Co zrobić z produktem po upływie daty przydatności?'],
  [QuestionCategoryEnum.FOOD_SAFETY, 'Jak często sprawdza się temperaturę w ladzie chłodniczej?'],
  [QuestionCategoryEnum.CUSTOMER_SERVICE, 'Jak przyjąć reklamację produktu bez paragonu?'],
  [
    QuestionCategoryEnum.CUSTOMER_SERVICE,
    'Co zrobić, gdy klient prosi o produkt, którego brakuje?',
  ],
  [QuestionCategoryEnum.CUSTOMER_SERVICE, 'Jak otworzyć dodatkową kasę przy kolejce?'],
  [QuestionCategoryEnum.OCCUPATIONAL_SAFETY, 'Jak bezpiecznie podnosić ciężkie kartony?'],
  [QuestionCategoryEnum.OCCUPATIONAL_SAFETY, 'Gdzie znajduje się apteczka na zapleczu?'],
  [QuestionCategoryEnum.OCCUPATIONAL_SAFETY, 'Kiedy wymagane są rękawice ochronne?'],
  [QuestionCategoryEnum.COMMUNICATION, 'Jak przekazać informacje na koniec zmiany?'],
  [QuestionCategoryEnum.COMMUNICATION, 'Komu zgłosić awarię urządzenia na sali sprzedaży?'],
  [QuestionCategoryEnum.COMMUNICATION, 'Jak poinformować kierownika o brakach w dostawie?'],
];

const STATUSES = [QuestionStatusEnum.ACTIVE, QuestionStatusEnum.DRAFT, QuestionStatusEnum.ARCHIVED];

const toIsoDate = (daysAgo: number): string => {
  const base = Date.UTC(2026, 8, 1);
  return new Date(base - daysAgo * 86_400_000).toISOString().slice(0, 10);
};

export const QUESTIONS_FIXTURE: readonly QuestionRow[] = Array.from(
  { length: FIXTURE_SIZE },
  (_, index) => {
    const [category, stem] = QUESTION_STEMS[index % QUESTION_STEMS.length];
    return {
      category,
      code: `PYT-${String(index + 1).padStart(4, '0')}`,
      content: stem,
      id: index + 1,
      status: STATUSES[(index * 7) % STATUSES.length],
      updatedAt: toIsoDate((index * 13) % 365),
    };
  },
);
