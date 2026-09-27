import { TranslationStatusDto, VersionStatusDto } from '@/api/generated';
import { StatusPillTone } from '@/components/state/model/StatusPill.model.ts';

export const getTranslationStatusTone = (status: TranslationStatusDto): StatusPillTone => {
  switch (status) {
    case TranslationStatusDto.Approved:
      return 'success';
    case TranslationStatusDto.Draft:
      return 'info';
    case TranslationStatusDto.Missing:
      return 'warning';
  }
};

export const getVersionStatusTone = (status: VersionStatusDto): StatusPillTone => {
  switch (status) {
    case VersionStatusDto.Active:
      return 'success';
    case VersionStatusDto.Draft:
      return 'info';
    case VersionStatusDto.Retired:
      return 'neutral';
  }
};
