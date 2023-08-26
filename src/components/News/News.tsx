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
import Tooltip from '@mui/material/Tooltip';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';

import { ModalDelete } from '../ModalDelete';
import { SIDEBAR_WIDTH } from '../../constants';

import './styles.scss';

const columns = [
  { id: 'name', label: 'Заголовок', width: '60%' },
  { id: 'code', label: 'Дата', width: '15%' },
  {
    id: 'population',
    label: 'Действия',
    width: '25%',
  },
];

const rows = [
  { id: 1, title: 'Новость 1', date: '21.11.1995' },
  { id: 2, title: 'Новость 2', date: '21.11.1995' },
  { id: 3, title: 'Новость 3', date: '21.11.1995' },
  { id: 4, title: 'Новость 4', date: '21.11.1995' },
  { id: 5, title: 'Новость 5', date: '21.11.1995' },
  { id: 6, title: 'Новость 6', date: '21.11.1995' },
  { id: 7, title: 'Новость 7', date: '21.11.1995' },
  { id: 8, title: 'Новость 8', date: '21.11.1995' },
  { id: 9, title: 'Новость 9', date: '21.11.1995' },
  { id: 10, title: 'Новость 10', date: '21.11.1995' },
  { id: 11, title: 'Новость 11', date: '21.11.1995' },
  { id: 12, title: 'Новость 12', date: '21.11.1995' },
];

export const News = () => {
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
                    align={index === 2 ? 'right' : 'left'}
                    style={{ width: column.width }}
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell align="left">{row.title}</TableCell>
                    <TableCell align="left">{row.date}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Удалить">
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleShowModalDelete(row.id)}
                        >
                          <DeleteIcon sx={{ color: 'var(--red)' }} />
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
