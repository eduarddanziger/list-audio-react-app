import { SxProps } from "@mui/material";

export const ellipsisTextStyle: SxProps = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    flexGrow: 1,
    width: 0
};

export const getFlexStylePercent = (percent: number): SxProps => ({
    display: 'flex',
    gap: 'inherit',
    flex: `1 1 ${percent}%`,
    paddingRight: '0.2rem',
    overflow: 'hidden'
});
