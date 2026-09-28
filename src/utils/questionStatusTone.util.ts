import { VersionStatusDto } from '@/api/generated';
import { StatusPillTone } from '@/components/state/model/StatusPill.model.ts';

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
