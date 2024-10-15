import React from 'react';
import { Stack, Button, Container, Typography, Box, Card, IconButton, Popover, MenuItem } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import TableStyle from '../../ui-component/TableStyle';
import { shipment } from 'menu-items/dashboard';
import { getApi } from 'views/services/api';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router';

const ShipmentList = () => {
 const user = JSON.parse(localStorage.getItem('user'));
 const navigate = useNavigate();



  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState([{}]);
  const [shipments, setShipments] = useState([]);

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
    console.log('when click on edit ==========>', selectedRow);
    if(selectedRow){
      navigate(`/admin/shipment/add`, {state : {shipment : selectedRow, mode: "edit"}});
    }
    
    handlePopoverClose();
  };

  const handleView = () => {
    console.log('View clicked for:', selectedRow);
    if(selectedRow){
      navigate(`/admin/shipment_details/${selectedRow?._id}`);
    }
    handlePopoverClose();
  };

  const handleDelete = () => {
    // Implement delete functionality
    console.log('Delete clicked for:', selectedRow);
    handlePopoverClose();
  };

  const fetchShipmentData = async ()=> {
    try {
      getApi(`/shipment/allshipments_details/${user._id}`)
        .then((response) => {
          console.log('response all shipments ======>', response);
          setShipments(response?.data?.data);
        })
        .catch((error) => {
          console.log('error ==>', error);
        });
    } catch (error) {
      console.log('error ==>', error);
    }

  }


  useEffect(()=>{
    fetchShipmentData();
  },[]);

  // Columns definition for DataGrid
  const columns = [
    {
      field: 'customerdata1.name',
      headerName: 'Sender Name',
      flex: 1,
      renderCell: (params) => <Typography>{params.row.customerdata1 ? params.row.customerdata1.name : 'N/A'}</Typography>
    },
    {
      field: 'customerdata2.name',
      headerName: 'Receiver Name',
      flex: 1,
      renderCell: (params) => <Typography>{params.row.customerdata2 ? params.row.customerdata2.name : 'N/A'}</Typography>
    },
    {
      field: 'shipmentdate',
      headerName: 'Shipment Date',
      flex: 1,
      renderCell: (params) => <Typography>{params.row.shipmentdate ? moment(params.row.shipmentdate).format('YYYY-MM-DD') : 'N/A'}</Typography>
    },
    {
      field: 'expectedDeliveryDate',
      headerName: 'Expected Date',
      flex: 1,
      renderCell: (params) => <Typography>{params.row.expectedDeliveryDate ? moment(params.row.expectedDeliveryDate).format('YYYY-MM-DD') : 'N/A'}</Typography>
    },
    {
      field: 'package_pickup_address',
      headerName: 'Pickup Address',
      flex: 1
    },
    {
      field: 'deliveryAddress',
      headerName: 'Delivery Address',
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
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent="space-between">
          <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.3rem' }}>
            Shipment List
          </Typography>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card sx={{ height: 600 }}>
              <DataGrid
                rows={shipments}
                columns={columns}
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

export default ShipmentList;
