import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { JSX, useDeferredValue, useId, useState } from 'react';

import { TagDto } from '@/api/generated';
import { FormFieldLabel } from '@/components/form/FormFieldLabel.comp.tsx';
import { useNotifications } from '@/components/notifications/Notification.context.ts';
import { InfoCallout } from '@/components/state/InfoCallout.comp.tsx';
import { microLabelSx } from '@/config/theme/uiTokens.ts';
import { useGetTags } from '@/hooks/useGetTags.util.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { useMergeTags } from '@/views/dictionaryManagement/util/useMergeTags.util.ts';

type Props = {
  onClose: () => void;
  source: TagDto;
};

export const TagMergeDialog = ({ onClose, source }: Props): JSX.Element => {
  const theme = useTheme();
  const titleId = useId();
  const targetInputId = useId();
  const { t } = useTranslationWithPrefix('views.dictionaryManagement');
  const { notifyError, notifySuccess } = useNotifications();
  const [target, setTarget] = useState<null | TagDto>(null);
  const [input, setInput] = useState('');
  const search = useDeferredValue(input);
  const { isFetching, tags } = useGetTags({ search });
  const { isPending, mergeTags } = useMergeTags();
  const options = tags.filter(tag => tag.id !== source.id);

  const handleConfirm = async (): Promise<void> => {
    if (target === null) {
      return;
    }
    try {
      await mergeTags({ sourceTagId: source.id, targetTagId: target.id });
      notifySuccess(t('tags.merged', { source: source.label, target: target.label }));
      onClose();
    } catch {
      notifyError(t('tags.mergeFailed'));
    }
  };

  return (
    <Dialog aria-labelledby={titleId} fullWidth maxWidth="sm" onClose={onClose} open>
      <DialogTitle id={titleId}>{t('tags.merge.title', { label: source.label })}</DialogTitle>
      <DialogContent>
        <Stack spacing={2.5} sx={{ pt: 1 }}>
          <Stack spacing={0.5}>
            <Box sx={microLabelSx(theme.colors.textSecondary)}>{t('tags.merge.source')}</Box>
            <Typography sx={{ color: theme.colors.textPrimary, fontWeight: 600 }} variant="body1">
              {source.label}
              <Typography
                component="span"
                sx={{ color: theme.colors.textSecondary, ml: 1 }}
                variant="body2"
              >
                {t('questionCount', { count: source.questionCount })}
              </Typography>
            </Typography>
          </Stack>
          <FormControl fullWidth>
            <FormFieldLabel htmlFor={targetInputId} isRequired label={t('tags.merge.target')} />
            <Autocomplete<TagDto>
              filterOptions={items => items}
              getOptionKey={tag => tag.id}
              getOptionLabel={tag => tag.label}
              id={targetInputId}
              inputValue={input}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              loading={isFetching}
              noOptionsText={t('tags.merge.noOptions')}
              onChange={(_event, tag) => setTarget(tag)}
              onInputChange={(_event, value) => setInput(value)}
              options={options}
              renderInput={params => (
                <TextField {...params} placeholder={t('tags.merge.targetPlaceholder')} />
              )}
              renderOption={({ key, ...props }, tag) => (
                <li key={key} {...props}>
                  {tag.label}
                  <Typography
                    component="span"
                    sx={{ color: theme.colors.textSecondary, ml: 1 }}
                    variant="body2"
                  >
                    {t('questionCount', { count: tag.questionCount })}
                  </Typography>
                </li>
              )}
              value={target}
            />
          </FormControl>
          {target && (
            <InfoCallout tone="warning">
              {t('tags.merge.preview', {
                count: source.questionCount,
                source: source.label,
                target: target.label,
              })}
            </InfoCallout>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="text">
          {t('tags.merge.cancel')}
        </Button>
        <Button disabled={target === null || isPending} onClick={() => void handleConfirm()}>
          {t('tags.merge.confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
