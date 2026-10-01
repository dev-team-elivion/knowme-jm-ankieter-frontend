import { Autocomplete, Box, MenuItem, Stack, TextField, useTheme } from '@mui/material';
import { JSX } from 'react';

import { BulkOperationDto, TagDto } from '@/api/generated';
import { FilterOption } from '@/components/dataTable/model/DataTable.model.ts';
import { fieldLabelSx } from '@/config/theme/uiTokens.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { REVIEW_REASON_MAX_LENGTH } from '@/views/questionBank/model/bulkOperation.constants.ts';
import { BulkOperationParams } from '@/views/questionBank/model/BulkOperation.model.ts';

const REASON_ROWS = 3;

type Props = {
  categories: FilterOption[];
  onChange: (params: BulkOperationParams) => void;
  operation: BulkOperationDto;
  params: BulkOperationParams;
  tags: TagDto[];
};

export const BulkParamsStep = ({
  categories,
  onChange,
  operation,
  params,
  tags,
}: Props): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('views.questionBank.bulk.params');
  const isTagOperation =
    operation === BulkOperationDto.AddTags || operation === BulkOperationDto.RemoveTags;

  return (
    <Stack spacing={2}>
      {isTagOperation && (
        <Box>
          <Box component="label" htmlFor="bulk-tags" sx={fieldLabelSx(theme.colors)}>
            {t('tags')}
          </Box>
          <Autocomplete<TagDto, true>
            filterSelectedOptions
            getOptionKey={tag => tag.id}
            getOptionLabel={tag => tag.label}
            id="bulk-tags"
            isOptionEqualToValue={(option, value) => option.id === value.id}
            multiple
            noOptionsText={t('noTags')}
            onChange={(_event, selected) => onChange({ ...params, tags: selected })}
            options={tags}
            renderInput={inputParams => <TextField {...inputParams} />}
            value={params.tags}
          />
        </Box>
      )}
      {operation === BulkOperationDto.SetCategory && (
        <Box>
          <Box component="label" htmlFor="bulk-category" sx={fieldLabelSx(theme.colors)}>
            {t('category')}
          </Box>
          <TextField
            fullWidth
            id="bulk-category"
            onChange={event => onChange({ ...params, categoryId: event.target.value })}
            select
            slotProps={{ select: { displayEmpty: true } }}
            value={params.categoryId}
          >
            <MenuItem disabled value="">
              {t('categoryPlaceholder')}
            </MenuItem>
            {categories.map(category => (
              <MenuItem key={category.value} value={category.value}>
                {category.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      )}
      {operation === BulkOperationDto.MarkForReview && (
        <Box>
          <Box component="label" htmlFor="bulk-reason" sx={fieldLabelSx(theme.colors)}>
            {t('reason')}
          </Box>
          <TextField
            fullWidth
            id="bulk-reason"
            minRows={REASON_ROWS}
            multiline
            onChange={event => onChange({ ...params, reviewReason: event.target.value })}
            placeholder={t('reasonPlaceholder')}
            slotProps={{ htmlInput: { maxLength: REVIEW_REASON_MAX_LENGTH } }}
            value={params.reviewReason}
          />
        </Box>
      )}
    </Stack>
  );
};
