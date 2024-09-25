import React from 'react';
import { Box, Grid, TextField, MenuItem, Typography, Button, FormLabel, Divider } from '@mui/material';
import { Form, useFormik } from 'formik';
import * as Yup from 'yup';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Card } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import { Switch } from '@mui/material';
import AddQuotetionDetails from './AddQuotetionDetails';
import { useState } from 'react';

const AddQuotes = () => {
  const [openAdd, setOpenAdd] = useState(false);

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const formik = useFormik({
    initialValues: {
      shipmentdate: '',
      expecteddate: '',
      senderInfo: '',
      receiverInfo: '',
      deliveryAddress: '',
      contactPersonName: '',
      phone: '',
      fullLoad: '',
      pickupAddress: ''
    },
    validationSchema: Yup.object({
      shipmentdate: Yup.string().required('Required'),
      expecteddate: Yup.string().required('Required'),
      senderInfo: Yup.string().required('Required'),
      receiverInfo: Yup.string().required('Required'),
      deliveryAddress: Yup.string().required('Required'),
      contactPerson: Yup.string().required('Required'),
      phone: Yup.string().required('Required'),
      fullLoad: Yup.string().required('Required'),
      pickupAddress: Yup.string().required('Required')
    }),
    onSubmit: (values) => {
      console.log(values);
    }
  });

  return (
    <>
      <AddQuotetionDetails open={openAdd} handleClose={handleCloseAdd} />
      <Box sx={{ padding: 4, borderRadius: '4px', backgroundColor: '#fff' }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.3rem' }}>
                Quotation Form
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormLabel>Select Customer</FormLabel>
              <TextField
                select
                name="customer"
                fullWidth
                variant="outlined"
                value={formik.values.customer}
                onChange={formik.handleChange}
                error={formik.touched.customer && Boolean(formik.errors.customer)}
                helperText={formik.touched.customer && formik.errors.customer}
              >
                <MenuItem value="sender1">Sender 1</MenuItem>
                <MenuItem value="sender2">Sender 2</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormLabel>Date</FormLabel>
              <TextField
                type="date"
                name="shipmentdate"
                fullWidth
                value={formik.values.shipmentdate}
                onChange={formik.handleChange}
                error={formik.touched.shipmentdate && Boolean(formik.errors.shipmentdate)}
                helperText={formik.touched.shipmentdate && formik.errors.shipmentdate}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid item xs={12} md={4} />

            <Grid item xs={12} md={8}>
              <TextField
                label="Remark"
                name="remark"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                value={formik.values.remark}
                onChange={formik.handleChange}
                error={formik.touched.remark && Boolean(formik.errors.remark)}
                helperText={formik.touched.remark && formik.errors.remark}
              />
            </Grid>
            <Grid item xs={12} md={4} />

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.3rem' }}>
                Quotation Details
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table aria-label="Quotation Details">
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>From</TableCell>
                      <TableCell>To</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Size</TableCell>
                      <TableCell>Weight</TableCell>
                      <TableCell>ETA</TableCell>
                      <TableCell>Advance</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      {/* <TableCell colSpan={8}>
                      <Button variant="contained">Add</Button>
                    </TableCell> */}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item xs={12} container spacing={2}>
              <Grid item>
                <Button variant="contained" color="primary" onClick={handleOpenAdd}>
                  Add Quotation Details
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary">
                  Save
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="primary">
                  Return to the dashboard
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default AddQuotes;
