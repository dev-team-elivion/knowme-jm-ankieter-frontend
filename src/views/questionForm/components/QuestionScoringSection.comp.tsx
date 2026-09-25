import ScoreboardOutlinedIcon from '@mui/icons-material/ScoreboardOutlined';
import { Box, Stack } from '@mui/material';
import { JSX } from 'react';
import { useWatch } from 'react-hook-form';

import { QuestionTypeDto } from '@/api/generated';
import { TextFormField } from '@/components/form/TextFormField.comp.tsx';
import { SectionPanel } from '@/components/page/SectionPanel.comp.tsx';
import { InfoCallout } from '@/components/state/InfoCallout.comp.tsx';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { ScoringRuleField } from '@/views/questionForm/components/ScoringRuleField.comp.tsx';
import { QuestionFormModel } from '@/views/questionForm/model/QuestionForm.model.ts';

type Props = {
  revealIndex: number;
};

export const QuestionScoringSection = ({ revealIndex }: Props): JSX.Element => {
  const { t } = useTranslationWithPrefix('views.questionForm.scoring');
  const type = useWatch<QuestionFormModel, 'type'>({ name: 'type' });

  return (
    <SectionPanel
      description={t('description')}
      icon={ScoreboardOutlinedIcon}
      revealIndex={revealIndex}
      title={t('title')}
    >
      <Stack spacing={2.5}>
        <Box sx={{ maxWidth: 200 }}>
          <TextFormField<QuestionFormModel, 'maxPoints'>
            label={t('maxPoints')}
            name="maxPoints"
            type="number"
          />
        </Box>
        {type === QuestionTypeDto.MultipleChoice ? (
          <ScoringRuleField label={t('scoringRule')} />
        ) : (
          <InfoCallout>{t('singleChoiceRule')}</InfoCallout>
        )}
      </Stack>
    </SectionPanel>
  );
};
