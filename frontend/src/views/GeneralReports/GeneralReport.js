import React, { useState } from 'react';
import {Card, Stack, Button, Container, Typography, Box, IconButton, Popover, MenuItem, Grid, TextField, Select, InputLabel, FormControl } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


const leadData = [
  {
    id: 1,
    name: 'Jonny Doe',
    email: 'jonny@gmail.com',
    phone: '9981923587',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '9876543210',
  }
  // Add more data as needed
];

const GeneralReport = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpenAdd] = useState(false);
  const [tabValue, setTabValue] = useState('1');

  const handlePopoverOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleEdit = () => {
    console.log('Edit clicked for:', selectedRow);
    handlePopoverClose();
  };

  const handleView = () => {
    console.log('View clicked for:', selectedRow);
    handlePopoverClose();
  };

  const handleDelete = () => {
    console.log('Delete clicked for:', selectedRow);
    handlePopoverClose();
  };

  const columns = [
    {
      field: 'id',
      headerName: 'Id',
      width: 90,
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      flex: 1,
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
      ),
    }
  ];

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent="space-between">
        <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.3rem' }}>
            General Report
          </Typography>
        </Stack>
       <Box sx={{p : 2, backgroundColor : '#fff', borderRadius : '5px', boxShadow:'inherit'}} >
       <TabContext value={tabValue}>
          <TabList onChange={handleChange} aria-label="report tabs">
            <Tab label="Reports" value="1" />
            <Tab label="Payment Log" value="2" />
          </TabList>
          <TabPanel value="1">
            {/* Design from the image in the first tab */}
            <Card>
              <Box p={2}>
                <Stack direction="row" spacing={1} justifyContent='right'>
                  <Button variant="contained" color="error">PDF</Button>
                  <Button variant="contained" color="success">Excel</Button>
                  </Stack>

                  <Stack direction="row" spacing={1} justifyContent='right' sx={{pt : 3, m: 0}}>
                  <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>Time</InputLabel>
                    <Select label="Time" defaultValue="This year Finar">
                      <MenuItem value="This year Finar">This year Finar</MenuItem>
                      {/* Add more options as needed */}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>Status</InputLabel>
                    <Select label="Status" defaultValue="All">
                      <MenuItem value="All">All</MenuItem>
                      {/* Add more options as needed */}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel>sender</InputLabel>
                    <Select label="Sender" defaultValue="All">
                      <MenuItem value="sender 1">ender 1</MenuItem>
                      <MenuItem value="sender 2">ender 2</MenuItem>
                      {/* Add more options as needed */}
                    </Select>
                  </FormControl>

                  </Stack>


                  {/* <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>Time</InputLabel>
                    <Select label="Time" defaultValue="This year Finar">
                      <MenuItem value="This year Finar">This year Finar</MenuItem>
                     
                    </Select>
                  </FormControl>
                  <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>Status</InputLabel>
                    <Select label="Status" defaultValue="All">
                      <MenuItem value="All">All</MenuItem>
                     
                    </Select>
                  </FormControl>
                  <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel>sender</InputLabel>
                    <Select label="Sender" defaultValue="All">
                      <MenuItem value="sender 1">ender 1</MenuItem>
                      <MenuItem value="sender 2">ender 2</MenuItem>
                      
                    </Select>
                  </FormControl> */}
                
              </Box>
            </Card>
          </TabPanel>
          <TabPanel value="2">
            {/* Table in the second tab */}
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid rows={leadData} columns={columns} pageSize={5} />
            </Box>
          </TabPanel>
        </TabContext>

       </Box>
      </Container>
    </>
  );
};

export default GeneralReport;
