import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import { Box, Stack } from '@mui/material';
import { JSX, useMemo } from 'react';
import { useWatch } from 'react-hook-form';

import { CategoryRefDto } from '@/api/generated';
import { SelectFormField } from '@/components/form/SelectFormField.comp.tsx';
import { SectionPanel } from '@/components/page/SectionPanel.comp.tsx';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { BusinessKeyField } from '@/views/questionForm/components/BusinessKeyField.comp.tsx';
import { PositionCodesField } from '@/views/questionForm/components/PositionCodesField.comp.tsx';
import { SourceNameField } from '@/views/questionForm/components/SourceNameField.comp.tsx';
import { TagsField } from '@/views/questionForm/components/TagsField.comp.tsx';
import { QUESTION_SOURCES } from '@/views/questionForm/model/QuestionForm.constants.ts';
import { QuestionFormModel } from '@/views/questionForm/model/QuestionForm.model.ts';
import { useGetCategories } from '@/views/questionForm/util/useGetCategories.util.ts';

const TWO_COLUMNS_SX = {
  columnGap: 2,
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  rowGap: 2.5,
} as const;

type Props = {
  currentCategory?: CategoryRefDto;
  revealIndex: number;
  showBusinessKey: boolean;
};

export const QuestionClassificationSection = ({
  currentCategory,
  revealIndex,
  showBusinessKey,
}: Props): JSX.Element => {
  const { t } = useTranslationWithPrefix('views.questionForm.classification');
  const { t: tDictionary } = useTranslationWithPrefix('views.dictionaries');
  const { categories, isError: isCategoriesError } = useGetCategories();
  const categoryId = useWatch<QuestionFormModel, 'categoryId'>({ name: 'categoryId' });

  const categoryOptions = useMemo(() => {
    const options = categories.map(({ codePrefix, id, name }) => ({ codePrefix, id, name }));
    const isCurrentMissing =
      currentCategory !== undefined && !options.some(option => option.id === currentCategory.id);
    return isCurrentMissing ? [currentCategory, ...options] : options;
  }, [categories, currentCategory]);

  const sourceOptions = useMemo(
    () => QUESTION_SOURCES.map(value => ({ label: tDictionary(`questionSource.${value}`), value })),
    [tDictionary],
  );

  const selectedPrefix = categoryOptions.find(option => option.id === categoryId)?.codePrefix;

  return (
    <SectionPanel
      description={t('description')}
      icon={CategoryOutlinedIcon}
      revealIndex={revealIndex}
      title={t('title')}
    >
      <Stack spacing={2.5}>
        <Box sx={TWO_COLUMNS_SX}>
          <SelectFormField<QuestionFormModel, 'categoryId'>
            disabled={isCategoriesError}
            helperText={isCategoriesError ? t('categoriesUnavailable') : undefined}
            label={t('category')}
            name="categoryId"
            options={categoryOptions.map(({ id, name }) => ({ label: name, value: id }))}
            placeholder={t('categoryPlaceholder')}
          />
          <SelectFormField<QuestionFormModel, 'source'>
            label={t('source')}
            name="source"
            options={sourceOptions}
            placeholder={t('sourcePlaceholder')}
          />
        </Box>
        <SourceNameField />
        <Box sx={TWO_COLUMNS_SX}>
          <TagsField />
          <PositionCodesField />
        </Box>
        {showBusinessKey && (
          <BusinessKeyField keyExample={selectedPrefix && `${selectedPrefix}-1`} />
        )}
      </Stack>
    </SectionPanel>
  );
};
