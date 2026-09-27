import { Autocomplete, TextField } from '@mui/material';
import { JSX } from 'react';

import { TagDto } from '@/api/generated';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

type Props = {
  onChange: (tagIds: string[]) => void;
  options: TagDto[];
  selectedIds: string[];
};

export const TagsFilterField = ({ onChange, options, selectedIds }: Props): JSX.Element => {
  const { t } = useTranslationWithPrefix('views.questionBank.filters');
  const selected = options.filter(tag => selectedIds.includes(tag.id));

  return (
    <Autocomplete<TagDto, true>
      filterSelectedOptions
      getOptionKey={tag => tag.id}
      getOptionLabel={tag => tag.label}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      multiple
      noOptionsText={t('noTags')}
      onChange={(_event, tags) => onChange(tags.map(tag => tag.id))}
      options={options}
      renderInput={params => <TextField {...params} />}
      value={selected}
    />
  );
};
