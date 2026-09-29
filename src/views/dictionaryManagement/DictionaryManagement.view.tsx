import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import { Box, Stack, Tab, Tabs } from '@mui/material';
import { JSX } from 'react';

import { PageHeader } from '@/components/page/PageHeader.comp.tsx';
import { revealSx } from '@/config/theme/uiTokens.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { CategoriesSection } from '@/views/dictionaryManagement/components/categories/CategoriesSection.comp.tsx';
import { ProcedureNamesSection } from '@/views/dictionaryManagement/components/procedureNames/ProcedureNamesSection.comp.tsx';
import { TagsSection } from '@/views/dictionaryManagement/components/tags/TagsSection.comp.tsx';
import { DICTIONARY_SECTIONS } from '@/views/dictionaryManagement/model/dictionaryManagement.constants.ts';
import { DictionarySectionEnum } from '@/views/dictionaryManagement/model/DictionaryManagement.enum.ts';
import { useDictionarySection } from '@/views/dictionaryManagement/util/useDictionarySection.util.ts';

export const DictionaryManagementView = (): JSX.Element => {
  const { t } = useTranslationWithPrefix('views.dictionaryManagement');
  const { section, setSection } = useDictionarySection();

  return (
    <Stack spacing={3}>
      <Box sx={{ ...revealSx(0), pb: 1 }}>
        <PageHeader
          description={t('description')}
          icon={BookmarksOutlinedIcon}
          title={t('title')}
        />
      </Box>
      <Box sx={revealSx(1)}>
        <Tabs
          onChange={(_event, value: DictionarySectionEnum) => setSection(value)}
          value={section}
        >
          {DICTIONARY_SECTIONS.map(item => (
            <Tab key={item} label={t(`sections.${item}`)} value={item} />
          ))}
        </Tabs>
      </Box>
      <Box sx={revealSx(2)}>
        {section === DictionarySectionEnum.CATEGORIES && <CategoriesSection />}
        {section === DictionarySectionEnum.TAGS && <TagsSection />}
        {section === DictionarySectionEnum.PROCEDURE_NAMES && <ProcedureNamesSection />}
      </Box>
    </Stack>
  );
};
