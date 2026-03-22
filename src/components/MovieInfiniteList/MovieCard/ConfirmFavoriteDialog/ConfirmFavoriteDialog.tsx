import {
  Button,
  DialogActions,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

type Props = {
  open: boolean;
  title: string;
  onClose: () => void;
  onConfirm: () => void;
};

export const ConfirmFavoriteDialog = ({
  open,
  title,
  onClose,
  onConfirm,
}: Props) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Добавить в избранное?</DialogTitle>

      <DialogContent>
        <Typography variant="body2" color="text.secondary">
          Фильм «{title}» будет сохранён в списке избранного
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>

        <Button variant="contained" onClick={onConfirm} autoFocus>
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
