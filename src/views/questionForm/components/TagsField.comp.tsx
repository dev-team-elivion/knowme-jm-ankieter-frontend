import { Autocomplete, FormControl, TextField } from '@mui/material';
import { JSX, useDeferredValue, useId, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { TagDto, TagRefDto } from '@/api/generated';
import { FormFieldLabel } from '@/components/form/FormFieldLabel.comp.tsx';
import { useNotifications } from '@/components/notifications/Notification.context.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { QuestionFormModel } from '@/views/questionForm/model/QuestionForm.model.ts';
import { useCreateTag } from '@/views/questionForm/util/useCreateTag.util.ts';
import { useGetTags } from '@/views/questionForm/util/useGetTags.util.ts';

type CreateTagOption = {
  inputValue: string;
};

type TagOption = CreateTagOption | TagRefDto;

const isCreateOption = (option: TagOption): option is CreateTagOption => 'inputValue' in option;

const toTagRef = ({ code, id, label }: TagDto): TagRefDto => ({ code, id, label });

const isSameLabel = (first: string, second: string): boolean =>
  first.toLocaleLowerCase() === second.toLocaleLowerCase();

export const TagsField = (): JSX.Element => {
  const inputId = useId();
  const { t } = useTranslationWithPrefix('views.questionForm.classification');
  const { notifyError } = useNotifications();
  const { control } = useFormContext<QuestionFormModel>();
  const {
    field,
    fieldState: { error },
  } = useController({ control, name: 'tags' });
  const [inputValue, setInputValue] = useState('');
  const search = useDeferredValue(inputValue);
  const { isError, isFetching, tags } = useGetTags({ search });
  const { createTag, isPending } = useCreateTag();

  const typedLabel = inputValue.trim();
  const isKnownLabel = [...tags, ...field.value].some(tag => isSameLabel(tag.label, typedLabel));
  const tagOptions: TagOption[] = tags.map(toTagRef);
  const options: TagOption[] =
    typedLabel && !isKnownLabel ? [...tagOptions, { inputValue: typedLabel }] : tagOptions;

  const handleChange = async (selected: TagOption[]): Promise<void> => {
    const existing = selected.flatMap(option => (isCreateOption(option) ? [] : [option]));
    const toCreate = selected.find(isCreateOption);
    if (toCreate === undefined) {
      field.onChange(existing);
      return;
    }
    try {
      const created = await createTag({ label: toCreate.inputValue });
      field.onChange([...existing, toTagRef(created)]);
      setInputValue('');
    } catch {
      notifyError(t('tagCreateError'));
    }
  };

  return (
    <FormControl fullWidth>
      <FormFieldLabel htmlFor={inputId} isRequired={false} label={t('tags')} />
      <Autocomplete<TagOption, true>
        filterOptions={items => items}
        filterSelectedOptions
        getOptionKey={option =>
          isCreateOption(option) ? `create:${option.inputValue}` : option.id
        }
        getOptionLabel={option =>
          isCreateOption(option) ? t('addTag', { label: option.inputValue }) : option.label
        }
        id={inputId}
        inputValue={inputValue}
        isOptionEqualToValue={(option, value) =>
          !isCreateOption(option) && !isCreateOption(value) && option.id === value.id
        }
        loading={isFetching || isPending}
        multiple
        noOptionsText={isError ? t('tagsUnavailable') : t('noTags')}
        onBlur={field.onBlur}
        onChange={(_event, selected) => void handleChange(selected)}
        onInputChange={(_event, value) => setInputValue(value)}
        options={options}
        renderInput={params => (
          <TextField
            {...params}
            error={error !== undefined}
            helperText={error?.message}
            inputRef={field.ref}
            placeholder={field.value.length === 0 ? t('tagsPlaceholder') : undefined}
          />
        )}
        value={field.value}
      />
    </FormControl>
  );
};
