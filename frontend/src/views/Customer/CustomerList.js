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
import EditCustomer from './EditCustomer';
import { useNavigate } from 'react-router';
import DeleteCustomer from './DeleteCustomer';

const CustomerList = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log('user ===>', user);

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState();
  const [customerData, setCustomerData] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handlePopoverOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
    console.log('selected row =>', row);
  };
  console.log('selectedRow ==>', selectedRow);

  const handlePopoverClose = () => {
    setAnchorEl(null);
    // setSelectedRow(null);
  };

  const handleEdit = () => {
    console.log('Edit clicked for:', selectedRow);
    if (selectedRow) {
      setEditOpen(true);
    }
    handlePopoverClose();
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleView = () => {
    console.log('View clicked for:', selectedRow);
    // if(selectedRow){
    navigate(`/admin/view_customer/${selectedRow?._id}`);
    // }
    handlePopoverClose();
  };

  const handleDelete = () => {
    console.log('Delete clicked for:', selectedRow);
    if (selectedRow) {
      setDeleteOpen(true);
    }
    handlePopoverClose();
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const fetchCustomerData = async () => {
    try {
      getApi(`/user/getalluser_byId/${user._id}`)
        .then((response) => {
          console.log('response ==>', response);
          setCustomerData(response.data.data);
          console.log('response.data.data ==>,response.data.data');
        })
        .catch((error) => {
          console.log('error ==>', error);
        });
    } catch (error) {
      console.log('error ==>', error);
    }
  };

  console.log('customerData ====>', customerData);

  useEffect(() => {
    fetchCustomerData();
  }, [editOpen,deleteOpen]);

  const columns = [
    {
      field: 'companyname',
      headerName: 'Company Name',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'phoneno',
      headerName: 'Phone Number',
      flex: 1
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => {
        return (
          <Box
            sx={
              params?.value == 1
                ? {
                    backgroundColor: '#01B574',
                    color: 'white',
                    padding: '4px',
                    borderRadius: '5px'
                  }
                : {
                    backgroundColor: 'red',
                    color: 'white',
                    padding: '4px',
                    borderRadius: '5px'
                  }
            }
          >
            {params?.value === 1 ? 'Active' : 'Inactive'}
          </Box>
        );
      }
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
      <EditCustomer open={editOpen} handleClose={handleEditClose} data={selectedRow} />
      <DeleteCustomer open={deleteOpen} handleClose={handleDeleteClose} customerid={selectedRow?._id} />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent="space-between">
          <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.3rem' }}>
            Customer List
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
                rows={customerData}
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

export default CustomerList;
