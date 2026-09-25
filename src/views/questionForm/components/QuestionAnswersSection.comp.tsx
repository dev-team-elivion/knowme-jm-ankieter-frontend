import AddRoundedIcon from '@mui/icons-material/AddRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import { JSX, useId } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import { QuestionPurposeDto, QuestionTypeDto } from '@/api/generated';
import { SectionPanel } from '@/components/page/SectionPanel.comp.tsx';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { AnswerOptionRow } from '@/views/questionForm/components/AnswerOptionRow.comp.tsx';
import { MIN_ANSWERS } from '@/views/questionForm/model/QuestionForm.constants.ts';
import { QuestionFormModel } from '@/views/questionForm/model/QuestionForm.model.ts';
import { createEmptyAnswer } from '@/views/questionForm/util/questionFormMapping.util.ts';

type Props = {
  revealIndex: number;
};

export const QuestionAnswersSection = ({ revealIndex }: Props): JSX.Element => {
  const theme = useTheme();
  const markerGroupId = useId();
  const { t } = useTranslationWithPrefix('views.questionForm.answers');
  const {
    control,
    formState: { errors, isSubmitted },
    setValue,
    trigger,
  } = useFormContext<QuestionFormModel>();
  const { append, fields, move, remove } = useFieldArray({ control, name: 'answers' });
  const [type, purpose] = useWatch({ control, name: ['type', 'purpose'] });
  const isScored = purpose === QuestionPurposeDto.Test;
  const isSingleChoice = type === QuestionTypeDto.SingleChoice;
  const listError = errors.answers?.root?.message ?? errors.answers?.message;

  const description = !isScored
    ? t('descriptionSurvey')
    : isSingleChoice
      ? t('descriptionSingle')
      : t('descriptionMultiple');

  const revalidate = (): void => {
    if (isSubmitted) {
      void trigger('answers');
    }
  };

  const handleMarkCorrect = (index: number, isCorrect: boolean): void => {
    fields.forEach((_field, position) => {
      if (position === index) {
        setValue(`answers.${position}.isCorrect`, isCorrect, { shouldDirty: true });
      } else if (isSingleChoice && isCorrect) {
        setValue(`answers.${position}.isCorrect`, false, { shouldDirty: true });
      }
    });
    revalidate();
  };

  const handleMove = (from: number, to: number): void => {
    move(from, to);
  };

  const handleRemove = (index: number): void => {
    remove(index);
    revalidate();
  };

  return (
    <SectionPanel
      description={description}
      icon={FormatListBulletedRoundedIcon}
      revealIndex={revealIndex}
      title={t('title')}
    >
      <Stack spacing={1.5}>
        <Stack
          aria-label={isScored && isSingleChoice ? description : undefined}
          role={isScored && isSingleChoice ? 'radiogroup' : undefined}
          spacing={1.5}
        >
          {fields.map((field, index) => (
            <AnswerOptionRow
              canRemove={fields.length > MIN_ANSWERS}
              index={index}
              isLast={index === fields.length - 1}
              isScored={isScored}
              isSingleChoice={isSingleChoice}
              key={field.id}
              markerName={markerGroupId}
              onMarkCorrect={handleMarkCorrect}
              onMove={handleMove}
              onRemove={handleRemove}
            />
          ))}
        </Stack>
        {listError && (
          <Typography role="alert" sx={{ color: theme.colors.red }} variant="caption">
            {listError}
          </Typography>
        )}
        <Box>
          <Button
            onClick={() => append(createEmptyAnswer())}
            startIcon={<AddRoundedIcon />}
            variant="outlined"
          >
            {t('add')}
          </Button>
        </Box>
      </Stack>
    </SectionPanel>
  );
};
