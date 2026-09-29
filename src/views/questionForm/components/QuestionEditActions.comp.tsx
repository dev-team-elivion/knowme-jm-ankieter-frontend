import { Button, Stack, Tooltip } from '@mui/material';
import { JSX } from 'react';

import { pressableSx } from '@/config/theme/uiTokens.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { QuestionEditStatus } from '@/views/questionForm/components/QuestionEditStatus.comp.tsx';

type Props = {
  canFixTypo: boolean;
  isDirty: boolean;
  isDraft: boolean;
  isSaving: boolean;
  onFixTypo: () => void;
  onNewVersion: () => void;
};

export const QuestionEditActions = ({
  canFixTypo,
  isDirty,
  isDraft,
  isSaving,
  onFixTypo,
  onNewVersion,
}: Props): JSX.Element => {
  const { t } = useTranslationWithPrefix('views.questionForm.actions');
  const canSave = isDirty || !canFixTypo;
  const state = canFixTypo ? (isDirty ? 'dirty' : 'clean') : 'locked';

  return (
    <>
      <QuestionEditStatus isDraft={isDraft} state={state} />
      <Stack direction="row" spacing={1.5} sx={{ flexShrink: 0 }}>
        <Tooltip title={t('newVersionHint')}>
          <span>
            <Button
              disabled={!canSave || isSaving}
              onClick={onNewVersion}
              sx={pressableSx}
              variant="outlined"
            >
              {t('newVersion')}
            </Button>
          </span>
        </Tooltip>
        {canFixTypo && (
          <Tooltip title={isDraft ? t('saveDraftHint') : t('fixTypoHint')}>
            <span>
              <Button
                disabled={!isDirty || isSaving}
                loading={isSaving}
                onClick={onFixTypo}
                sx={pressableSx}
              >
                {isDraft ? t('saveDraft') : t('fixTypo')}
              </Button>
            </span>
          </Tooltip>
        )}
      </Stack>
    </>
  );
};
