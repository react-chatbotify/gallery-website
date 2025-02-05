import { ImportExport } from "@mui/icons-material"; // Import sorting icon
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const sortMap = {
  favoritesCount: "favorites_count",
  updatedAt: "updated_at",
  createdAt: "created_at",
}

/**
 * Sort button for users to sort items based on number of favorites, time of update or time of release.
 * 
 * @param sortBy field to sort items by
 * @param onSortChange handles logic for when sorting field is changed
 */
const SortButton: React.FC<{
  sortBy: string;
  onSortChange: (field: string) => void;
}> = ({
  sortBy,
  onSortChange
}) => {
  // lazy loads translations
  const { t } = useTranslation("components/searchbar");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleSortFieldClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (field?: string) => {
    if (field) {
      onSortChange(field);
    }
    setAnchorEl(null);
  };

  return (
    <Box display="flex" alignItems="center">
      {/* Sort Button */}
      <Button
        onClick={handleSortFieldClick}
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "8px 16px",
          borderRadius: "20px",
          backgroundColor: "background.paper",
          border: "1px solid #ccc",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          textTransform: "none",
          color: "text.primary",
        }}
      >
        {/* Sorting Icon on the Left */}
        <Box sx={{ display: "flex", alignItems: "center", marginRight: "8px" }}>
          <ImportExport /> {/* Single icon for sorting */}
        </Box>
        <Typography
          sx={{
            cursor: "pointer",
            borderBottom: "1px dashed transparent",
            '&:hover': {
              borderBottom: "1px dashed",
            },
          }}
        >
          {t(`sortbutton.${sortMap[sortBy as keyof typeof sortMap]}`)}
        </Typography>
      </Button>

      {/* Sort Field Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleMenuClose()}
      >
        {[
          { field: "favoritesCount", label: t("sortbutton.favorites_count") },
          { field: "updatedAt", label: t("sortbutton.updated_at") },
          { field: "createdAt", label: t("sortbutton.created_at") },
        ].map(({ field, label }) => (
          <MenuItem
            key={field}
            selected={field === sortBy}
            onClick={() => handleMenuClose(field)}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default SortButton;
