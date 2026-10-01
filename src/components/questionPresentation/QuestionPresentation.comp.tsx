import { FormControlLabel, Stack, Switch, Typography, useTheme } from '@mui/material';
import { JSX, ReactNode } from 'react';

import { QuestionTypeDto } from '@/api/generated';
import { QUESTION_MEDIA_MAX_HEIGHT } from '@/components/questionPresentation/model/questionPresentation.constants.ts';
import { QuestionPresentationModel } from '@/components/questionPresentation/model/QuestionPresentation.model.ts';
import { PresentationAnswers } from '@/components/questionPresentation/PresentationAnswers.comp.tsx';
import { PresentationMedia } from '@/components/questionPresentation/PresentationMedia.comp.tsx';
import { PresentationSolution } from '@/components/questionPresentation/PresentationSolution.comp.tsx';
import { InfoCallout } from '@/components/state/InfoCallout.comp.tsx';
import { microLabelSx } from '@/config/theme/uiTokens.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

type Props = {
  actions?: ReactNode;
  adornment?: ReactNode;
  model: null | QuestionPresentationModel;
  onShowCorrectChange: (showCorrect: boolean) => void;
  showCorrect: boolean;
  type: QuestionTypeDto;
};

export const QuestionPresentation = ({
  actions,
  adornment,
  model,
  onShowCorrectChange,
  showCorrect,
  type,
}: Props): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('components.questionPresentation');
  const { t: tDictionary } = useTranslationWithPrefix('views.dictionaries');

  return (
    <Stack spacing={2.5}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: 'center', justifyContent: 'space-between', minHeight: 38 }}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', minWidth: 0 }}>
          <Typography sx={microLabelSx(theme.colors.textSecondary)}>
            {tDictionary(`questionType.${type}`)}
          </Typography>
          {adornment}
        </Stack>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexShrink: 0 }}>
          {model !== null && (
            <FormControlLabel
              control={
                <Switch
                  checked={showCorrect}
                  onChange={event => onShowCorrectChange(event.target.checked)}
                  size="small"
                />
              }
              label={t('showCorrect')}
              slotProps={{
                typography: { sx: { color: theme.colors.textSecondary }, variant: 'body2' },
              }}
              sx={{ mr: 0 }}
            />
          )}
          {actions}
        </Stack>
      </Stack>
      {model === null ? (
        <InfoCallout tone="warning">{t('missingTranslation')}</InfoCallout>
      ) : (
        <>
          <Typography
            sx={{
              color: model.body ? theme.colors.textPrimary : theme.colors.textSecondary,
              fontStyle: model.body ? 'normal' : 'italic',
              textWrap: 'pretty',
              whiteSpace: 'pre-wrap',
            }}
            variant="h4"
          >
            {model.body || t('emptyBody')}
          </Typography>
          <PresentationMedia
            assets={model.media}
            label={t('questionMediaLabel')}
            maxHeight={QUESTION_MEDIA_MAX_HEIGHT}
          />
          <PresentationAnswers model={model} showCorrect={showCorrect} />
          {showCorrect && (
            <PresentationSolution explanation={model.explanation} maxPoints={model.maxPoints} />
          )}
        </>
      )}
    </Stack>
  );
};
