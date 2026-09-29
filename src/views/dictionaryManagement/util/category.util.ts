import { CategoryDto, CategoryRequestDto } from '@/api/generated';
import { MoveDirection } from '@/views/dictionaryManagement/model/DictionaryManagement.model.ts';

export const toCategoryRequest = ({
  active,
  codePrefix,
  displayOrder,
  name,
}: CategoryDto): CategoryRequestDto => ({ active, codePrefix, displayOrder, name });

export const getNextDisplayOrder = (categories: CategoryDto[]): number =>
  categories.reduce((highest, category) => Math.max(highest, category.displayOrder), 0) + 1;

export const moveCategory = (
  categories: CategoryDto[],
  categoryId: string,
  direction: MoveDirection,
): CategoryDto[] => {
  const from = categories.findIndex(category => category.id === categoryId);
  const to = from + direction;
  const moved = categories.at(from);
  const displaced = categories.at(to);
  if (from === -1 || to < 0 || moved === undefined || displaced === undefined) {
    return categories;
  }
  return categories.map((category, index) => {
    if (index === from) {
      return displaced;
    }
    return index === to ? moved : category;
  });
};

export const withSequentialDisplayOrder = (categories: CategoryDto[]): CategoryDto[] =>
  categories.map((category, index) => ({ ...category, displayOrder: index + 1 }));

export const getChangedDisplayOrders = (
  previous: CategoryDto[],
  next: CategoryDto[],
): CategoryDto[] =>
  next.filter(
    category =>
      previous.find(candidate => candidate.id === category.id)?.displayOrder !==
      category.displayOrder,
  );
