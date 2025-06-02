import {Theme} from "@mui/material/styles";

export const accordionStyle = {
    padding: 0,
    boxShadow: 'none',
    border: 'none',
    '&:before': {display: 'none'}
}

export const accordionSummaryStyle = (theme: Theme) => ({
    paddingLeft: 1,
    minHeight: '32px',
    display: 'flex', // Ensure flex container
    alignItems: 'flex-start', // Align to top for the summary root
    '&.Mui-expanded': {
        minHeight: '32px'
    },
    '.MuiAccordionSummary-content': {
        margin: '0.3rem 0',
        alignItems: 'flex-start', // Align to top for the content
        display: 'flex', // Ensure flex on content
        flexDirection: 'column', // Optional, if you want vertical direction
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