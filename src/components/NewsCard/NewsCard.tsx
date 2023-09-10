import { FC, useState, useEffect, MouseEvent } from 'react';
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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useMedia } from '../../hooks';
import { loadImage, uploadImage } from '../../utils';
import { Transition } from '../Transition';

export const NewsCard: FC<any> = ({ value, isOpen, onClose, onSave }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isMobile = useMedia('(max-width: 768px)');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState<any>('');
  const [image, setImage] = useState();
  const [imgSrc, setImgSrc] = useState();

  useEffect(() => {
    if (value && isOpen) {
      setDate(dayjs(value.newsDate));
      setTitle(value.title);
      loadImage(value.imageId).then(setImgSrc);
    }
  }, [value, isOpen]);

  const handleUploadImage = (event: any) => {
    const file = event?.target?.files?.[0];

    if (!file) return;
    setImage(file);
  };

  const handleSave = async (event: MouseEvent<HTMLButtonElement>) => {
    const isValid = title.trim() && date && (image || value?.imageId);

    if (!isValid) {
      setAnchorEl(event.currentTarget);
      return;
    }

    try {
      let imageId = value?.imageId;

      if (image) {
        imageId = await uploadImage(image);
      }

      const data = {
        ...value,
        title: title.trim(),
        newsDate: date.toISOString?.(),
        imageId,
      };

      const response = await axios.post('/news', data);
      if (response.status !== 200 || typeof response.data === 'string') {
        throw new Error('bad response');
      }

      clearForm();
      onSave();
    } catch (error) {
      console.log(error);
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
    setImgSrc(undefined);
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
            {value ? 'Редактирование' : 'Создание'} новости
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

        {(image || imgSrc) && (
          <div>
            <img
              alt="not found"
              width="250px"
              src={URL.createObjectURL(image || imgSrc!)}
            />
          </div>
        )}
      </Box>
    </Dialog>
  );
};
