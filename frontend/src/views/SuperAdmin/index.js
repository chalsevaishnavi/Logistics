import React, { useState } from 'react';
import { useEffect } from 'react';
import { Stack, Button, Container, Typography, Box, Card, IconButton, Popover, MenuItem } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import TableStyle from 'ui-component/TableStyle';
import Iconify from 'ui-component/iconify/Iconify';
import AddAdmin from './AddAdmin';
import EditAdmin from './EditAdmin';
import { getApi } from 'views/services/api';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import DeleteAdmin from './DeleteAdmin';

// ----------------------------------------------------------------------

const SuperAdmin = () => {
  // State to manage the popover

  const params = useParams();
  console.log('params ==>', params._id);

  // const leadId = params.id;

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState();
  const [open, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [adminData, setAdminData] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));
  console.log('user ===>', user);

  const navigate = useNavigate();

  // Function to handle opening the popover
  const handlePopoverOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
    console.log('selected row =>', row);
  };

  // Function to handle closing the popover
  const handlePopoverClose = () => {
    setAnchorEl(null);
    // setSelectedRow(null);
  };

  // Click handlers for menu items
  const handleEdit = () => {
    console.log('on handleEdit seleted row==>', selectedRow);
    if (selectedRow) {
      setOpenEdit(true);
    }
    handlePopoverClose();
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleView = () => {
    // Implement view functionality
    console.log('View clicked for==>', selectedRow);
    if (selectedRow) {
      navigate(`/admin/view/${selectedRow._id}`);
    }
    handlePopoverClose();
  };

  const handleDelete = () => {
    console.log('on handleDelete seleted row==>', selectedRow);
    if (selectedRow) {
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
      headerName: 'Phone No',
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

  const fetchSuperAdminData = async () => {
    try {
      getApi(`/user/getalluser_byId/${user._id}`)
        .then((response) => {
          console.log('response ==>', response);
          setAdminData(response.data.data);
          console.log('response.data.data ==>,response.data.data');
        })
        .catch((error) => {
          console.log('error ==>', error);
        });
    } catch (error) {
      console.log('error ==>', error);
    }
  };
  console.log('adminData ==>', adminData);

  useEffect(() => {
    fetchSuperAdminData();
  }, [open, openEdit, openDelete]);

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  return (
    <>
      <AddAdmin open={open} handleClose={handleCloseAdd} />
      <EditAdmin open={openEdit} handleClose={handleCloseEdit} data={selectedRow} />
      <DeleteAdmin open={openDelete} handleClose={handleCloseDelete} data={selectedRow} />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent="space-between">
          <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.3rem' }}>
            Admin List
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleOpenAdd} // Uncomment if needed
            >
              Add Admin
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card sx={{ height: 600 }}>
              <DataGrid
                rows={adminData}
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

export default SuperAdmin;
