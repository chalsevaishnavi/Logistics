import React, { useState } from 'react';
import { Stack, Button, Container, Typography, Box, Card, IconButton, Popover, MenuItem } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import TableStyle from '../../ui-component/TableStyle';
import { Email } from '@mui/icons-material';
import Iconify from '../../ui-component/iconify';
import AddPrice from './AddPrice';
import { getApi } from 'views/services/api';
import { useEffect } from 'react';
import DeletePrice from './DeletePrice';

// ----------------------------------------------------------------------

const leadData = [
  {
    id: 1,
    name: 'Jonny Doe',
    email: 'jonny@gmail.com',
    phone: '9981923587',
    location: 'ABC Road, XYZ City'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '9876543210',
    location: '123 Main St, Anytown'
  }
];

const PriceList = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log('user ===>', user);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [priceData, setPriceData] = useState([]);

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
    setOpenAdd(true);
    handlePopoverClose();
  };

  const handleView = () => {
    // Implement view functionality
    console.log('View clicked for:', selectedRow);
    handlePopoverClose();
  };

  const handleDelete = () => {
    console.log('Delete clicked for:', selectedRow);
    if (selectedRow) {
      setOpenDelete(true);
    }
    handlePopoverClose();
  };

  const handleCloseDelete = () => setOpenDelete(false);

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const fetchPriceData = async () => {
    try {
      getApi(`/price/getallprice/${user._id}`)
        .then((response) => {
          console.log('response ==>', response);
          setPriceData(response.data.data);
        })
        .catch((error) => {
          console.log('error ==>', error);
        });
    } catch (error) {
      console.log('error ==>', error);
    }
  };

  useEffect(() => {
    fetchPriceData();
  }, [openAdd, openDelete]);

  // Columns definition for DataGrid
  const columns = [
    {
      field: 'from',
      headerName: 'From',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'to',
      headerName: 'To',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'lcvrate',
      headerName: 'LCV Price',
      flex: 1
    },
    {
      field: 'opentruckrate',
      headerName: 'Open Truck Price',
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
      <AddPrice open={openAdd} handleClose={handleCloseAdd} editData={selectedRow} />
      <DeletePrice open={openDelete} handleClose={handleCloseDelete} priceid={selectedRow?._id}/>
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent="space-between">
          <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.3rem' }}>
            Price List
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleOpenAdd} // Uncomment if needed
            >
              Add Price
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card sx={{ height: 600 }}>
              <DataGrid
                rows={priceData}
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

export default PriceList;
