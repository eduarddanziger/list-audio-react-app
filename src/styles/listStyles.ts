import { SxProps } from "@mui/material";

export const ellipsisTextStyle: SxProps = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    flexGrow: 1,
    width: 0
};

export const getFlexStyle = (percent: number): SxProps => ({
    display: 'flex',
    gap: 'inherit',
    flex: `1 1 ${percent}%`, // Calculate the flex value dynamically
    paddingRight: 1,
    overflow: 'hidden',
});
