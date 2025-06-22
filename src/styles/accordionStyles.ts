import { SxProps } from "@mui/material";
import {Theme} from "@mui/material/styles";

export const accordionStyle: SxProps= {
    padding: 0,
    boxShadow: 'none',
    border: 'none',
    '&:before': {display: 'none'}
}

export const accordionSummaryStyle = (theme: Theme): SxProps => ({
    paddingLeft: 1,
    minHeight: '32px',
    display: 'flex',
    alignItems: 'flex-start',
    '&.Mui-expanded': {
        minHeight: '32px'
    },
    '.MuiAccordionSummary-content': {
        margin: '0.3rem 0',
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
    },
    '&:hover': {
        backgroundColor: 'transparent'
    },
    cursor: 'pointer',
    '& .MuiAccordionSummary-expandIconWrapper': {
        order: -1,
        color: theme.palette.text.primary
    }
});