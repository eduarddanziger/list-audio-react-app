import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export interface ConfirmDeleteDialogProps {
    open: boolean;
    title?: string;
    description: string;
    confirmLabel?: string;
    cancelLabel?: string;
    isPending?: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
    open,
    title = 'Delete item?',
    description,
    confirmLabel = 'Delete',
    cancelLabel = 'Cancel',
    isPending = false,
    onCancel,
    onConfirm,
}) => {
    return (
        <Dialog
            open={open}
            onClose={isPending ? undefined : onCancel}
            aria-labelledby="confirm-delete-dialog-title"
            aria-describedby="confirm-delete-dialog-description"
        >
            <DialogTitle id="confirm-delete-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="confirm-delete-dialog-description">
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} disabled={isPending}>
                    {cancelLabel}
                </Button>
                <Button
                    onClick={onConfirm}
                    color="error"
                    variant="contained"
                    disabled={isPending}
                >
                    {confirmLabel}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDeleteDialog;
