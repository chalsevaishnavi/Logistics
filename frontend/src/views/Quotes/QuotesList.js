import React, { useState } from 'react';
import { Stack, Button, Container, Typography, Box, Card, IconButton, Popover, MenuItem } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import TableStyle from '../../ui-component/TableStyle';

// ----------------------------------------------------------------------

const leadData = [
  {
    id: 1,
    quotationnumber: 'GLQ0002',
    name: 'Jonny Doe',
    from: 'East',
    to: 'West',
    status: 'Active'
  }
];

const QuotesList = () => {
  // State to manage the popover
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  // Function to handle opening the popover
  const handlePopoverOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  // Function to handle closing the popover
  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  // Click handlers for menu items
  const handleEdit = () => {
    // Implement edit functionality
    console.log('Edit clicked for:', selectedRow);
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
    handlePopoverClose();
  };

  // Columns definition for DataGrid
  const columns = [
    {
      field: 'id',
      headerName: 'Id'
    },
    {
      field: 'quotationnumber',
      headerName: 'Quotation Number',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'from',
      headerName: 'From',
      flex: 1
    },
    {
      field: 'to',
      headerName: 'To',
      flex: 1
    },
    {
      field: 'status',
      headerName: 'Status',
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
            Quotation List
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
                rows={leadData}
                columns={columns}
                getRowId={(row) => row.id}
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

export default QuotesList;
