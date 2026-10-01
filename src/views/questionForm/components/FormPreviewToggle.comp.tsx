import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Button } from '@mui/material';
import { JSX } from 'react';

import { pressableSx } from '@/config/theme/uiTokens.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

type Props = {
  isOpen: boolean;
  onToggle: () => void;
};

export const FormPreviewToggle = ({ isOpen, onToggle }: Props): JSX.Element => {
  const { t } = useTranslationWithPrefix('views.questionForm.formPreview');

  return (
    <Button
      aria-expanded={isOpen}
      onClick={onToggle}
      startIcon={isOpen ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
      sx={pressableSx}
      variant="outlined"
    >
      {isOpen ? t('hide') : t('show')}
    </Button>
  );
};
