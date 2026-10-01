import { Stack } from '@mui/material';
import { JSX } from 'react';

import { MediaAssetDto } from '@/api/generated';
import { MediaPreview } from '@/components/media/MediaPreview.comp.tsx';

type Props = {
  assets: MediaAssetDto[];
  label: string;
  maxHeight: number;
};

export const PresentationMedia = ({ assets, label, maxHeight }: Props): JSX.Element | null => {
  if (assets.length === 0) {
    return null;
  }

  return (
    <Stack aria-label={label} role="group" spacing={1.5}>
      {assets.map(asset => (
        <MediaPreview asset={asset} key={asset.id} maxHeight={maxHeight} />
      ))}
    </Stack>
  );
};
