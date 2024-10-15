import React from 'react';
import { Stack, Button, Container, Typography, Box, Card, IconButton, Popover, MenuItem } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import TableStyle from '../../ui-component/TableStyle';
import { getApi } from 'views/services/api';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import EditQuote from './EditQuote';
import DeleteQuote from './DeleteQuote';

// ----------------------------------------------------------------------

const QuotesList = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const navigate = useNavigate();

  // State to manage the popover
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [quotesData, setQuotesData] = useState([]);
  const [openEdit, setEditOpen] = useState(false);
  const [openDelete, setDeleteOpen] = useState(false);

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
    console.log('Edit clicked ============>', selectedRow);
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
    if (selectedRow) {
      navigate(`/admin/view_quote_details/${selectedRow?._id}`);
    }
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

  const fetchQuotesData = async () => {
    try {
      getApi(`/quote/getallquotes/${user._id}`)
        .then((response) => {
          console.log('all quotes here ======>', response);
          setQuotesData(response.data.data);
        })
        .catch((error) => {
          console.log('error ==>', error);
        });
    } catch (error) {
      console.log('error ==>', error);
    }
  };
  console.log('quotesData ==>', quotesData);

  useEffect(() => {
    fetchQuotesData();
  }, [openEdit, openDelete]);

  // Columns definition for DataGrid
  const columns = [
    {
      field: 'quotationNo',
      headerName: 'Quotation Number',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'customerdata.name',
      headerName: 'Customer Name',
      flex: 1,
      renderCell: (params) => <Typography>{params.row.customerdata ? params.row.customerdata.name : 'N/A'}</Typography>
    },
    {
      field: 'from',
      headerName: 'From',
      flex: 1,
      renderCell: (params) => <Typography>{params.row.quotedata ? params.row.quotedata.from : 'N/A'}</Typography>
    },
    {
      field: 'to',
      headerName: 'To',
      flex: 1,
      renderCell: (params) => <Typography>{params.row.quotedata ? params.row.quotedata.to : 'N/A'}</Typography>
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
      <EditQuote open={openEdit} handleClose={handleEditClose} data={selectedRow} />
      <DeleteQuote open={openDelete} handleClose={handleDeleteClose} quoteid={selectedRow?._id}/>
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
                rows={quotesData}
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

export default QuotesList;
