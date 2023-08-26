import { useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Tooltip from '@mui/material/Tooltip';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';

import { ModalDelete } from '../ModalDelete';
import { SIDEBAR_WIDTH } from '../../constants';

import './styles.scss';

const columns = [
  { id: 'name', label: 'Название', minWidth: 450 },
  {
    id: 'population',
    label: 'Действия',
    minWidth: 50,
  },
];

const rows = [
  { id: 1, title: 'Бренд 1', active: true },
  { id: 2, title: 'Бренд 2', active: true },
  { id: 3, title: 'Бренд 3', active: false },
  { id: 4, title: 'Бренд 4', active: true },
  { id: 5, title: 'Бренд 5', active: true },
  { id: 6, title: 'Бренд 6', active: true },
  { id: 7, title: 'Бренд 7', active: true },
  { id: 8, title: 'Бренд 8', active: true },
  { id: 9, title: 'Бренд 9', active: true },
  { id: 10, title: 'Бренд 10', active: true },
  { id: 11, title: 'Бренд 11', active: true },
  { id: 12, title: 'Бренд 12', active: true },
];

export const Brands = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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

  const labelDisplayedRows = ({ from, to, count }: any) => {
    return `${from}–${to} из ${count !== -1 ? count : `больше чем ${to}`}`;
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
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: '70vh' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
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
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
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
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          labelRowsPerPage="Количество элементов"
          labelDisplayedRows={labelDisplayedRows}
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};
