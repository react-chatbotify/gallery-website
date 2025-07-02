import { Tab } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

const SponsorTab: React.FC<{ currentSponsorCategory: number; value: number; textValue: string }> = ({
  currentSponsorCategory,
  value,
  textValue,
}) => {
  const { t } = useTranslation('pages/sponsors');
  return (
    <Tab
      label={t(`${textValue}`)}
      disableRipple
      sx={{
        textTransform: 'none',
        fontWeight: 'bold',
        backgroundColor: `${currentSponsorCategory === value ? '#3B3B3B80' : null}`,
        my: `4px`,
        mx: '4px',
        border: '1px none #27272A',
        borderRadius: '8px',
      }}
    />
  );
};

export default SponsorTab;
