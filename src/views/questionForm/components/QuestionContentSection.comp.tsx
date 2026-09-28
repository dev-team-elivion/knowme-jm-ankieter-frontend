import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import { Box, Stack } from '@mui/material';
import { JSX, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { QuestionTypeDto } from '@/api/generated';
import { SelectFormField } from '@/components/form/SelectFormField.comp.tsx';
import { TextFormField } from '@/components/form/TextFormField.comp.tsx';
import { SectionPanel } from '@/components/page/SectionPanel.comp.tsx';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { QUESTION_FORM_TYPES } from '@/views/questionForm/model/QuestionForm.constants.ts';
import { QuestionFormModel } from '@/views/questionForm/model/QuestionForm.model.ts';

type Props = {
  isTypeLocked: boolean;
  revealIndex: number;
};

export const QuestionContentSection = ({ isTypeLocked, revealIndex }: Props): JSX.Element => {
  const { t } = useTranslationWithPrefix('views.questionForm.content');
  const { t: tDictionary } = useTranslationWithPrefix('views.dictionaries');
  const { getValues, setValue } = useFormContext<QuestionFormModel>();

  const handleTypeChange = (type: string): void => {
    if (type !== QuestionTypeDto.SingleChoice) {
      return;
    }
    const answers = getValues('answers');
    const firstCorrect = answers.findIndex(answer => answer.isCorrect);
    answers.forEach((answer, index) => {
      if (answer.isCorrect && index !== firstCorrect) {
        setValue(`answers.${index}.isCorrect`, false, { shouldDirty: true });
      }
    });
  };

  const typeOptions = useMemo(
    () =>
      QUESTION_FORM_TYPES.map(value => ({
        label: tDictionary(`questionType.${value}`),
        value,
      })),
    [tDictionary],
  );

  return (
    <SectionPanel
      description={t('description')}
      icon={QuizOutlinedIcon}
      revealIndex={revealIndex}
      title={t('title')}
    >
      <Stack spacing={2.5}>
        <Box sx={{ maxWidth: 360 }}>
          <SelectFormField<QuestionFormModel, 'type'>
            disabled={isTypeLocked}
            helperText={isTypeLocked ? t('typeLocked') : undefined}
            label={t('type')}
            name="type"
            onChange={handleTypeChange}
            options={typeOptions}
          />
        </Box>
        <TextFormField<QuestionFormModel, 'body'>
          label={t('body')}
          minRows={3}
          multiline
          name="body"
          placeholder={t('bodyPlaceholder')}
        />
        <TextFormField<QuestionFormModel, 'explanation'>
          helperText={t('explanationHelper')}
          label={t('explanation')}
          minRows={2}
          multiline
          name="explanation"
        />
      </Stack>
    </SectionPanel>
  );
};
