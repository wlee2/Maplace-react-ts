import React from 'react';
import { Dialog, DialogTitle, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';
import styles from './Login.module.scss';

interface LoginDialogProps {
    open: boolean;
    onClose: (local: boolean) => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ open, onClose }) => {
    const handleClose = (local: boolean) => {
        onClose(local);
    }
    return (
        <Dialog onClose={() => handleClose(false)} open={open}>
            <DialogTitle className={styles.blueBar}>&nbsp;Login Methods&nbsp;</DialogTitle>
            <List>
                <ListItem button onClick={() => handleClose(true)}>
                    <ListItemAvatar>
                        <Avatar>
                            L
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Local" />
                </ListItem>
                <ListItem button disabled>
                    <ListItemAvatar>
                        <Avatar className={styles.facebook}>
                            F
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Facebook" />
                </ListItem>
                <ListItem button disabled>
                    <ListItemAvatar>
                        <Avatar className={styles.google}>
                            G
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Google" />
                </ListItem>
            </List>
        </Dialog>
    );
};

export default LoginDialog;