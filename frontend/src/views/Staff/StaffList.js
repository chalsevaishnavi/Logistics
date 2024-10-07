import React, { useState } from 'react';
import { Stack, Button, Container, Typography, Box, Card, IconButton, Popover, MenuItem } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import TableStyle from '../../ui-component/TableStyle';
import { getApi } from 'views/services/api';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import EditStaff from './EditStaff';
import DeleteCustomer from 'views/Customer/DeleteCustomer';

// ----------------------------------------------------------------------

const StaffList = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [staffData, setStaffData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

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
    console.log('Edit clicked for:', selectedRow);
    if (selectedRow) {
      setOpenEdit(true);
    }
    handlePopoverClose();
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    handlePopoverClose();
  };

  const handleView = () => {
    // Implement view functionality
    console.log('View clicked for:', selectedRow);
    if (selectedRow) {
      navigate(`/admin/view_customer/${selectedRow?._id}`);
    }
    handlePopoverClose();
  };

  const handleDelete = () => {
    if (selectedRow) {
      setOpenDelete(true);
    }
    handlePopoverClose();
  };

  const handleCloseDelete = () => {
   setOpenDelete(false);
  };

  const fetchStaffData = async () => {
    try {
      getApi(`/user/getalluser_byId/${user._id}`)
        .then((response) => {
          console.log('response ==>', response);
          setStaffData(response.data.data);
        })
        .catch((error) => {
          console.log('error ==>', error);
        });
    } catch (error) {
      console.log('error ==>', error);
    }
  };

  useEffect(() => {
    fetchStaffData();
  }, [openEdit,openDelete]);

  // Columns definition for DataGrid
  const columns = [
    {
      field: 'role',
      headerName: 'Role',
      flex: 1
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1
    },
    {
      field: 'phoneno',
      headerName: 'Phone Number',
      flex: 1
    },
    {
      field: 'usernote',
      headerName: 'User Note',
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

  return (
    <>
      <DeleteCustomer open={openDelete} handleClose={handleCloseDelete} customerid={selectedRow?._id}  />
      <EditStaff open={openEdit} handleClose={handleCloseEdit} data={selectedRow} />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent="space-between">
          <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.3rem' }}>
            Staff List
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
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
                rows={staffData}
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

export default StaffList;
