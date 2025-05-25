import { Theme } from '@mui/material/styles';

export const accordionSummaryStyles = (theme: Theme) => ({
    paddingLeft: 1,
    minHeight: '32px!important',
    '&.Mui-expanded': {
        minHeight: '32px!important'
    },
    '.MuiAccordionSummary-content': {
        margin: '0.3rem 0'
    },
    backgroundColor: 'inherit',
    color: 'inherit',
    '&:hover': {
        backgroundColor: 'transparent'
    },
    cursor: 'pointer',
    '& .MuiAccordionSummary-expandIconWrapper': {
        order: -1,
        marginRight: theme.spacing(1)
    }
});