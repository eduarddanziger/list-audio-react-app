export const accordionStyles = {
    accordion: {
        padding: 0,
        boxShadow: 'none',
        border: 'none',
        '&:before': { display: 'none' }
    },
    accordionSummary: {
        paddingLeft: 1,
        minHeight: '32px!important',
        '&.Mui-expanded': {
            minHeight: '32px!important'
        },
        '.MuiAccordionSummary-content': {
            margin: '0.4rem 0'
        },
        backgroundColor: 'inherit',
        color: 'inherit',
        '&:hover': {
            backgroundColor: 'transparent'
        },
        cursor: 'pointer',
        '& .MuiAccordionSummary-expandIconWrapper': {
            order: -1
        }
    }
}
