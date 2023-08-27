import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Tooltip from '@mui/material/Tooltip';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { ModalDelete } from '../ModalDelete';
import { Pagination } from '../Pagination';
import { SIDEBAR_WIDTH } from '../../constants';
import { COLUMNS } from './constants';

import './styles.scss';

export const Brands = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [brands, setBrands] = useState<any>();
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    getBrands(0, 10);
  }, []);

  const getBrands = async (page: number, size: number) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/brand?page=${page}&size=${size}`);
      if (response.status !== 200 || typeof response.data === 'string') {
        throw new Error('bad response');
      }

      setBrands(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeDelete = (value: boolean) => {
    console.log('delete', value, selectedId);
    setOpenModalDelete(false);
    setSelectedId(null);
  };

  const handleShowModalDelete = (id: number) => {
    setOpenModalDelete(true);
    setSelectedId(id);
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${SIDEBAR_WIDTH}px)` },
      }}
    >
      <Toolbar />
      <div className="news-controls">
        <Button variant="contained" startIcon={<AddCircleOutlineIcon />}>
          Добавить
        </Button>
      </div>
      <ModalDelete
        isOpen={openModalDelete}
        onChangeDelete={handleChangeDelete}
      />
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
      {brands?.totalElements && (
        <Paper
          sx={{
            width: '100%',
            overflow: 'hidden',
            display: isLoading ? 'none' : 'block',
          }}
        >
          <TableContainer sx={{ maxHeight: '70vh' }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {COLUMNS.map((column, index) => (
                    <TableCell
                      key={column.id}
                      align={index === 1 ? 'right' : 'left'}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {brands.content.map((row: any) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.title}>
                    <TableCell align="left">{row.title}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Удалить">
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleShowModalDelete(row.id)}
                        >
                          <DeleteIcon sx={{ color: 'var(--red)' }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={row.active ? 'Активен' : 'Не активен'}>
                        <IconButton aria-label="active">
                          {row.active ? (
                            <TaskAltIcon color="success" />
                          ) : (
                            <BlockIcon />
                          )}
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Редактировать">
                        <IconButton aria-label="edit">
                          <EditIcon color="primary" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination count={brands.totalElements} getData={getBrands} />
        </Paper>
      )}
    </Box>
  );
};
