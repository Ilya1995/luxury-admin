import { FC, forwardRef, useState, useEffect, MouseEvent } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Popover from '@mui/material/Popover';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useMedia } from '../../hooks';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const NewsCard: FC<any> = ({ value, isOpen, onClose, onSave }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isMobile = useMedia('(max-width: 768px)');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState<any>('');
  const [image, setImage] = useState();

  useEffect(() => {
    if (value) {
      setDate(dayjs(value.newsDate));
      setTitle(value.title);
      setImage(value.pictureUrl);
    }
  }, [value]);

  const handleUploadImage = (event: any) => {
    const file = event?.target?.files?.[0];

    if (!file) return;
    setImage(file);
  };

  const fileToBase64 = async () => {
    if (!image) return;

    let result_base64 = await new Promise((resolve) => {
      let fileReader = new FileReader();
      fileReader.onload = (e) => resolve(fileReader.result);
      fileReader.readAsDataURL(image);
    });

    return result_base64;
  };

  const handleSave = async (event: MouseEvent<HTMLButtonElement>) => {
    const isValid = title.trim() && date && image;

    if (!isValid) {
      setAnchorEl(event.currentTarget);
      return;
    }

    try {
      const imageStr = await fileToBase64();

      const data = {
        ...value,
        title: title.trim(),
        newsDate: date.toISOString?.(),
        pictureUrl: imageStr,
      };

      const response = await axios.post('/news', data);
      if (response.status !== 200 || typeof response.data === 'string') {
        throw new Error('bad response');
      }

      onSave();
    } catch (error) {
      toast.error('Произошла ошибка, попробуйте позже');
    }
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    onClose();
    clearForm();
  };

  const clearForm = () => {
    setTitle('');
    setDate('');
    setImage(undefined);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Создание новости
          </Typography>
          <Button
            aria-describedby={id}
            autoFocus
            color="inherit"
            onClick={handleSave}
          >
            Сохранить
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Typography sx={{ p: 2 }}>Заполните поля</Typography>
          </Popover>
        </Toolbar>
      </AppBar>
      <Box
        component="form"
        sx={{
          '& > :not(style)': {
            my: 3,
            mx: isMobile ? 0 : 2,
            width: isMobile ? '100vw' : '50vw',
          },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Заголовок"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Box>
      <Box
        component="form"
        sx={{
          '& > :not(style)': {
            mb: 3,
            mx: isMobile ? 0 : 2,
            width: isMobile ? '100vw' : '50vw',
          },
        }}
        noValidate
        autoComplete="off"
      >
        <DatePicker value={date} onChange={setDate} />
      </Box>
      <Box
        component="form"
        sx={{
          '& > :not(style)': {
            mb: 3,
            mx: isMobile ? 0 : 2,
            width: isMobile ? '100vw' : '50vw',
          },
        }}
        noValidate
        autoComplete="off"
      >
        <Button variant="contained" component="label">
          Загрузить картинку
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleUploadImage}
          />
        </Button>

        {image && (
          <div>
            <img
              alt="not found"
              width={'250px'}
              src={URL.createObjectURL(image)}
            />
          </div>
        )}
      </Box>
    </Dialog>
  );
};
