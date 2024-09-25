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
import AddCallLog from './AddCallLogs';
import { getApi } from 'views/services/api';
import { useEffect } from 'react';
import DeleteCallLog from './deleteCallLogs';

// ----------------------------------------------------------------------

const leadData = [
  {
    id: 1,
    name: 'Jonny Doe',
    email: 'jonny@gmail.com',
    phone: '9981923587'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '9876543210'
  }
];

const ShowCallLogs = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState();
  const [open, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [callData, setCallData] = useState([]);

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
    console.log('Edit clicked for =====>', selectedRow);
    if(selectedRow){
      setOpenAdd(true);
    }
    handlePopoverClose();
  };

  const handleView = () => {
    // Implement view functionality
    console.log('View clicked for:', selectedRow);
    handlePopoverClose();
  };

  const handleDelete = () => {
    // Implement delete functionality
    console.log('Delete clicked for:', selectedRow);
    if(selectedRow){
      setOpenDelete(true);
    }
    handlePopoverClose();
  };

  const handleCloseDelete = () =>{
    setOpenDelete(false);
  }

  // Columns definition for DataGrid
  const columns = [
    {
      field: 'customerdata.name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize',
      renderCell: (params) => (
        <Typography>
          {params.row.customerdata ? params.row.customerdata.name : 'N/A'}
        </Typography>
      )
    },
    {
      field: 'companyname',
      headerName: 'Company Name',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize',
      renderCell: (params) => (
        <Typography>
          {params.row.customerdata ? params.row.customerdata.companyname : 'N/A'}
        </Typography>
      )
    },
    {
      field: 'duration',
      headerName: 'Duration',
      flex: 1
    },
    {
      field: 'feedback',
      headerName: 'Feedback',
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

  const fetchCallData = async () => {
    try {
      getApi(`/call/getallcalls/${user._id}`)
        .then((response) => {
          console.log('response ======>', response);
          setCallData(response.data.data);
        })
        .catch((error) => {
          console.log('error ==>', error);
        });
    } catch (error) {
      console.log('error ==>', error);
    }
  };

  useEffect(() => {
    fetchCallData();
  }, [open, openDelete]);

  

  return (
    <>
      <AddCallLog open={open} handleClose={handleCloseAdd} editData={selectedRow} />
      <DeleteCallLog open={openDelete} handleClose={handleCloseDelete} callid={selectedRow?._id}/>
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent="space-between">
          <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.3rem' }}>
            Call Logs
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleOpenAdd} // Uncomment if needed
            >
              Add Call Log
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
                rows={callData}
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

export default ShowCallLogs;
