import React, { useState } from 'react';
import { Stack, Button, Container, Typography, Box, Card, IconButton, Popover, MenuItem } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import Iconify from 'ui-component/iconify/Iconify';
import TableStyle from 'ui-component/TableStyle';
import AddExpenses from './AddExpenses';
import { getApi } from 'views/services/api';
import { useEffect } from 'react';
import moment from 'moment';
import DeleteExpenses from './DeleteExpenses';
import { useNavigate } from 'react-router';

// ----------------------------------------------------------------------

const ShowExpenses = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpenAdd] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);

  const navigate = useNavigate();

  // Function to handle opening the popover
  const handlePopoverOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  // Function to handle closing the popover
  const handlePopoverClose = () => {
    setAnchorEl(null);
    // setSelectedRow(null);
  };

  // Click handlers for menu items
  const handleEdit = () => {
    // Implement edit functionality
    console.log('Edit clicked for =====>', selectedRow);
    if (selectedRow) {
      setOpenAdd(true);
    }
    handlePopoverClose();
  };

  const handleView = () => {
    // Implement view functionality
    console.log('View clicked for:', selectedRow);
    if(selectedRow){
      navigate(`/admin/view_expenses/${selectedRow?._id}`);
    }
    handlePopoverClose();
  };

  const handleDelete = () => {
    console.log('Delete clicked for:', selectedRow);
    if(selectedRow){
      setOpenDelete(true);
    }
    handlePopoverClose();
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  // Columns definition for DataGrid
  const columns = [
    {
      field: 'expenseCategory',
      headerName: 'Expense Category Name',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize',
      renderCell: (params) => <Typography>{params.row.expenseCategory ? params.row.expenseCategory.name : 'N/A'}</Typography>
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1
    },
    {
      field: 'date',
      headerName: 'Date',
      flex: 1,
      renderCell: (params) => <Typography>{params.row.date ? moment(params.row.date).format('DD/MM/YYYY') : 'N/A'}</Typography>
    },

    {
      field: 'amount',
      headerName: 'Amount',
      flex: 1
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 0.5,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={(event) => handlePopoverOpen(event, params.row)}
          >
            <MoreVertIcon />
          </IconButton>
        </>
      )
    }
  ];

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const fetchExpenseData = async () => {
    try {
      getApi(`/expense/getallexpense/${user._id}`)
        .then((response) => {
          console.log('response ================>', response);
          setExpenseData(response?.data?.data);
        })
        .catch((error) => {
          console.log('error ==>', error);
        });
    } catch (error) {
      console.log('error ==>', error);
    }
  };

  useEffect(() => {
    fetchExpenseData();
  }, [open, openDelete]);

  return (
    <>
      <AddExpenses open={open} handleClose={handleCloseAdd} editData={selectedRow} />
      <DeleteExpenses open={openDelete} handleClose={handleCloseDelete} expenseid={selectedRow?._id}/>
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent="space-between">
          <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.3rem' }}>
            Expenses
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleOpenAdd} // Uncomment if needed
            >
              Add Expenses
            </Button>

            <Button
              variant="contained"
              sx={{ backgroundColor: '#e02d1b' }}
              startIcon={<SimCardDownloadIcon />}
              // onClick={handleOpenAdd} // Uncomment if needed
            >
              PDF
            </Button>

            <Button
              variant="contained"
              sx={{ backgroundColor: '#1cc88a' }}
              startIcon={<CloudDownloadIcon />}
              // onClick={handleOpenAdd} // Uncomment if needed
            >
              Excel
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card sx={{ height: 600 }}>
              <DataGrid
                rows={expenseData}
                columns={columns}
                checkboxSelection
                getRowId={(row) => row._id}
                components={{ Toolbar: GridToolbar }}
                componentsProps={{ toolbar: { showQuickFilter: true } }}
              />
            </Card>
          </Box>
        </TableStyle>

        {/* Popover for Action Menu */}
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          <MenuItem onClick={handleEdit}>
            <EditIcon sx={{ mr: 1 }} />
            Edit
          </MenuItem>
          <MenuItem onClick={handleView}>
            <VisibilityIcon sx={{ mr: 1, color: 'green' }} />
            View
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <DeleteIcon sx={{ mr: 1, color: 'red' }} />
            Delete
          </MenuItem>
        </Popover>
      </Container>
    </>
  );
};

export default ShowExpenses;
