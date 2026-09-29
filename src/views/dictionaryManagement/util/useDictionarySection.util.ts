import { useSearchParams } from 'react-router-dom';

import {
  DICTIONARY_SECTIONS,
  SECTION_PARAM,
} from '@/views/dictionaryManagement/model/dictionaryManagement.constants.ts';
import { DictionarySectionEnum } from '@/views/dictionaryManagement/model/DictionaryManagement.enum.ts';

type Return = {
  section: DictionarySectionEnum;
  setSection: (section: DictionarySectionEnum) => void;
};

export const useDictionarySection = (): Return => {
  const [searchParams, setSearchParams] = useSearchParams();
  const raw = searchParams.get(SECTION_PARAM);
  const section =
    DICTIONARY_SECTIONS.find(candidate => candidate === raw) ?? DictionarySectionEnum.CATEGORIES;

  const setSection = (next: DictionarySectionEnum): void =>
    setSearchParams(
      current => {
        const params = new URLSearchParams(current);
        params.set(SECTION_PARAM, next);
        return params;
      },
      { replace: true },
    );

  return { section, setSection };
};
