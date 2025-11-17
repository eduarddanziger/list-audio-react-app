import { SxProps } from "@mui/material";
import {Theme} from "@mui/material/styles";

export const accordionStyle: SxProps= {
    padding: 0,
    boxShadow: 'none',
    border: 'none',
    width: '100%',
    '&:before': {display: 'none'}
}

export const accordionSummaryStyle = (theme: Theme): SxProps => ({
    paddingLeft: 1,
    minHeight: 0,
    display: 'flex',
    alignItems: 'flex-start',
    '&.Mui-expanded': {
        margin: '0.1rem 0',
        minHeight: 0
    },
    '.MuiAccordionSummary-content': {
        margin: '0.3rem 0',
        minHeight: 0,
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        '&.Mui-expanded': {
            margin: 0,
            minHeight: 0
        }
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