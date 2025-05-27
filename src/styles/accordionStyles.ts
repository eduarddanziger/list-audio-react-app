import {Theme} from "@mui/material/styles";

export const accordionStyle = {
    padding: 0,
    boxShadow: 'none',
    border: 'none',
    '&:before': {display: 'none'}
}

export const accordionSummaryStyle = (theme: Theme) => (
    {
        paddingLeft: 1,
        minHeight: '32px',
        '&.Mui-expanded': {
            minHeight: '32px'
        },
        '.MuiAccordionSummary-content': {
            margin: '0.3rem 0'
        },
        '&:hover': {
            backgroundColor: 'transparent'
        },
        cursor: 'pointer',
        '& .MuiAccordionSummary-expandIconWrapper': {
            order: -1,
            color: theme.palette.text.primary
        }
    }
);

