import React from 'react';
import { Box, Grid, TextField, MenuItem, Typography, Button, FormLabel, Divider } from '@mui/material';
import { Form, useFormik } from 'formik';
import * as Yup from 'yup';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
// import AddCustomer from 'views/Customer/AddCustomer';
import CreateCustomer from './CreateCustomer';
import { useState } from 'react';
import { Container } from '@mui/system';
import AddVendor from 'views/Vendors/VendorList/AddVendor';
import AddPackage from './AddPackage';
import AddInsurance from './AddInsurance';

const AddShipment = () => {
  const [open, setOpenAdd] = useState(false);
  const [openVendor, setOpenAddForVendor] = useState(false);
  const [openPackage, setOpenAddForPackage] = useState(false); 
  const [openInsurance, setOpenAddForInsurance] = useState(false);
  

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleOpenAddForVendor = () => {
    setOpenAddForVendor(true);
  }

  const handleCloseAddForVendor = () => {
    setOpenAddForVendor(false);
  }

  const handleOpenAddForPackage = () => {
    setOpenAddForPackage(true);
  }

  const handleCloseAddForPackage = () => {
    setOpenAddForPackage(false);
  }

  const handleOpenAddForInsurance = () => {
    setOpenAddForInsurance(true);
  }

  const handleCloseAddForInsurance = () => {
    setOpenAddForInsurance(false);
  }

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
      <CreateCustomer open={open} handleClose={handleCloseAdd} />
      <AddVendor open={openVendor} handleClose={handleCloseAddForVendor}/>
      <AddPackage open={openPackage} handleClose={handleCloseAddForPackage}/>
      <AddInsurance open={openInsurance} handleClose={handleCloseAddForInsurance}/>
      

      <Box sx={{ padding: 4, borderRadius: '4px', backgroundColor: '#fff' }}>
        <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.3rem' }}>
          Shipment Info
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormLabel>Shipment Date</FormLabel>
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
            <Grid item xs={12} md={6}>
              <FormLabel>Expected Delivery Date</FormLabel>
              <TextField
                type="date"
                name="expecteddate"
                fullWidth
                value={formik.values.expecteddate}
                onChange={formik.handleChange}
                error={formik.touched.expecteddate && Boolean(formik.errors.expecteddate)}
                helperText={formik.touched.expecteddate && formik.errors.expecteddate}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormLabel>Sender Info</FormLabel>
              <TextField
                select
                name="senderInfo"
                fullWidth
                variant="outlined"
                value={formik.values.senderInfo}
                onChange={formik.handleChange}
                error={formik.touched.senderInfo && Boolean(formik.errors.senderInfo)}
                helperText={formik.touched.senderInfo && formik.errors.senderInfo}
              >
                <MenuItem value="sender1">Sender 1</MenuItem>
                <MenuItem value="sender2">Sender 2</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormLabel>Receiver Info</FormLabel>
              <TextField
                select
                name="receiverInfo"
                fullWidth
                variant="outlined"
                value={formik.values.receiverInfo}
                onChange={formik.handleChange}
                error={formik.touched.receiverInfo && Boolean(formik.errors.receiverInfo)}
                helperText={formik.touched.receiverInfo && formik.errors.receiverInfo}
              >
                <MenuItem value="receiver1">Receiver 1</MenuItem>
                <MenuItem value="receiver2">Receiver 2</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button variant="contained" color="primary" onClick={handleOpenAdd}>
                Add Sender
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button variant="contained" color="primary" onClick={handleOpenAdd}>
                Add Receiver
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Delivery Address"
                name="deliveryAddress"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                value={formik.values.deliveryAddress}
                onChange={formik.handleChange}
                error={formik.touched.deliveryAddress && Boolean(formik.errors.deliveryAddress)}
                helperText={formik.touched.deliveryAddress && formik.errors.deliveryAddress}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.3rem' }}>
                Package Pickup Location
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="Contact Person Name"
                name="contactPersonName"
                fullWidth
                variant="outlined"
                value={formik.values.contactPersonName}
                onChange={formik.handleChange}
                error={formik.touched.contactPersonName && Boolean(formik.errors.contactPersonName)}
                helperText={formik.touched.contactPersonName && formik.errors.contactPersonName}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Contact Number"
                name="contactPersonName"
                fullWidth
                variant="outlined"
                value={formik.values.contactPersonName}
                onChange={formik.handleChange}
                error={formik.touched.contactPersonName && Boolean(formik.errors.contactPersonName)}
                helperText={formik.touched.contactPersonName && formik.errors.contactPersonName}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                select
                label="Full Load"
                name="fullLoad"
                fullWidth
                variant="outlined"
                value={formik.values.fullLoad}
                onChange={formik.handleChange}
                error={formik.touched.fullLoad && Boolean(formik.errors.fullLoad)}
                helperText={formik.touched.fullLoad && formik.errors.fullLoad}
              >
                <MenuItem value="FullLoad">Full Load</MenuItem>
                <MenuItem value="PartLoad">Part Load</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Pickup Address"
                name="pickupAddress"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                value={formik.values.pickupAddress}
                onChange={formik.handleChange}
                error={formik.touched.pickupAddress && Boolean(formik.errors.pickupAddress)}
                helperText={formik.touched.pickupAddress && formik.errors.pickupAddress}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.3rem' }}>
                Transport Details
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="Driver Name"
                name="driverName"
                fullWidth
                variant="outlined"
                value={formik.values.driverName}
                onChange={formik.handleChange}
                error={formik.touched.driverName && Boolean(formik.errors.driverName)}
                helperText={formik.touched.driverName && formik.errors.driverName}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="Driver Phone Number"
                name="driverNumber"
                fullWidth
                variant="outlined"
                value={formik.values.driverNumber}
                onChange={formik.handleChange}
                error={formik.touched.driverNumber && Boolean(formik.errors.driverNumber)}
                helperText={formik.touched.driverNumber && formik.errors.driverNumber}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Vehicle Details"
                name="vehicleDetails"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={formik.values.vehicleDetails}
                onChange={formik.handleChange}
                error={formik.touched.vehicleDetails && Boolean(formik.errors.vehicleDetails)}
                helperText={formik.touched.vehicleDetails && formik.errors.vehicleDetails}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="User Notes - For Internal use Only"
                name="userNotes"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                value={formik.values.userNotes}
                onChange={formik.handleChange}
                error={formik.touched.userNotes && Boolean(formik.errors.userNotes)}
                helperText={formik.touched.userNotes && formik.errors.userNotes}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Grid container>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.3rem' }}>
                Vendor Details
              </Typography>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <FormLabel>Select Vendor</FormLabel>
                <TextField
                  select
                  name="selectVendor"
                  fullWidth
                  variant="outlined"
                  value={formik.values.selectVendor}
                  onChange={formik.handleChange}
                  error={formik.touched.selectVendor && Boolean(formik.errors.selectVendor)}
                  helperText={formik.touched.selectVendor && formik.errors.selectVendor}
                >
                  <MenuItem value="FullLoad">Vendor 1</MenuItem>
                  <MenuItem value="PartLoad">Vendor 2</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} md={3}>
                <FormLabel>Memo Number</FormLabel>
                <TextField
                  name="memoNumber"
                  fullWidth
                  variant="outlined"
                  value={formik.values.memoNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.memoNumber && Boolean(formik.errors.memoNumber)}
                  helperText={formik.touched.memoNumber && formik.errors.memoNumber}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormLabel>Commission</FormLabel>
                <TextField
                  name="commission"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={formik.values.commission}
                  onChange={formik.handleChange}
                  error={formik.touched.commission && Boolean(formik.errors.commission)}
                  helperText={formik.touched.commission && formik.errors.commission}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormLabel>Cash</FormLabel>
                <TextField
                  name="cash"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={formik.values.cash}
                  onChange={formik.handleChange}
                  error={formik.touched.cash && Boolean(formik.errors.cash)}
                  helperText={formik.touched.cash && formik.errors.cash}
                />
              </Grid>
            </Grid>

            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={3}>
                <FormLabel>Total</FormLabel>
                <TextField
                  name="total"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={formik.values.total}
                  onChange={formik.handleChange}
                  error={formik.touched.total && Boolean(formik.errors.total)}
                  helperText={formik.touched.total && formik.errors.total}
                />
              </Grid>

              <Grid item xs={12} md={3} container alignItems="center">
                <Button variant="contained" color="primary" onClick={handleOpenAddForVendor}>
                  Add Vendor
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Grid container>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.3rem' }}>
                Additional Expenses
              </Typography>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} md={2}>
                <FormLabel>Transportation</FormLabel>
                <TextField
                  name="transportation"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={formik.values.transportation}
                  onChange={formik.handleChange}
                  error={formik.touched.transportation && Boolean(formik.errors.transportation)}
                  helperText={formik.touched.transportation && formik.errors.transportation}
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <FormLabel>Handling</FormLabel>
                <TextField
                  name="handling"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={formik.values.handling}
                  onChange={formik.handleChange}
                  error={formik.touched.handling && Boolean(formik.errors.handling)}
                  helperText={formik.touched.handling && formik.errors.handling}
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <FormLabel>Halting</FormLabel>
                <TextField
                  name="halting"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={formik.values.halting}
                  onChange={formik.handleChange}
                  error={formik.touched.halting && Boolean(formik.errors.halting)}
                  helperText={formik.touched.halting && formik.errors.halting}
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <FormLabel>Insurance</FormLabel>
                <TextField
                  name="insurance"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={formik.values.insurance}
                  onChange={formik.handleChange}
                  error={formik.touched.insurance && Boolean(formik.errors.insurance)}
                  helperText={formik.touched.insurance && formik.errors.insurance}
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <FormLabel>Cartage</FormLabel>
                <TextField
                  name="cartage"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={formik.values.cartage}
                  onChange={formik.handleChange}
                  error={formik.touched.cartage && Boolean(formik.errors.cartage)}
                  helperText={formik.touched.cartage && formik.errors.cartage}
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <FormLabel>Over weight</FormLabel>
                <TextField
                  name="overweight"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={formik.values.overweight}
                  onChange={formik.handleChange}
                  error={formik.touched.overweight && Boolean(formik.errors.overweight)}
                  helperText={formik.touched.overweight && formik.errors.overweight}
                />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} md={2}>
                <FormLabel>ODC Charges</FormLabel>
                <TextField
                  name="odcCharges"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={formik.values.odcCharges}
                  onChange={formik.handleChange}
                  error={formik.touched.odcCharges && Boolean(formik.errors.odcCharges)}
                  helperText={formik.touched.odcCharges && formik.errors.odcCharges}
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <FormLabel>Tax Percent (%)</FormLabel>
                <TextField
                  name="taxPercent"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={formik.values.taxPercent}
                  onChange={formik.handleChange}
                  error={formik.touched.taxPercent && Boolean(formik.errors.taxPercent)}
                  helperText={formik.touched.taxPercent && formik.errors.taxPercent}
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <FormLabel>Advance Paid</FormLabel>
                <TextField
                  name="advancePaid"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={formik.values.advancePaid}
                  onChange={formik.handleChange}
                  error={formik.touched.advancePaid && Boolean(formik.errors.advancePaid)}
                  helperText={formik.touched.advancePaid && formik.errors.advancePaid}
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <FormLabel>Discount</FormLabel>
                <TextField
                  name="discount"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={formik.values.discount}
                  onChange={formik.handleChange}
                  error={formik.touched.discount && Boolean(formik.errors.discount)}
                  helperText={formik.touched.discount && formik.errors.discount}
                />
              </Grid>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Grid container>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.3rem' }}>
                Package Details
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table aria-label="Package Details">
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Invoice No</TableCell>
                      <TableCell>Size</TableCell>
                      <TableCell>Weight</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Cost</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={8}>
                        <Button variant="contained" onClick={handleOpenAddForPackage}>Add</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Grid container>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.3rem' }}>
                Insurance Details
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table aria-label="Package Details">
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>Eway Bill</TableCell>
                      <TableCell>Insurance No</TableCell>
                      <TableCell>Insurance Agent</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={8}>
                        <Button variant="contained" onClick={handleOpenAddForInsurance}>Add</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.3rem' }}>
                Text Details
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" align="left" sx={{ mb: 2, fontSize: '1rem' }}>
                Total Taxes
              </Typography>
              <Typography variant="subtitle1" align="left" sx={{ mb: 2, fontSize: '1rem' }}>
                Total
              </Typography>
              <Typography variant="subtitle1" align="left" sx={{ mb: 2, fontSize: '1rem' }}>
                Balance
              </Typography>
            </Grid>

            <Grid item xs={12} md={6} container justifyContent="flex-end">
              <Grid item xs={12} md={2} />

              <Grid item xs={12} md={4}>
                <TextField size="small" type="number" defaultValue="0" inputProps={{ style: { textAlign: 'left' } }} sx={{ mb: 1 }} />
                <TextField size="small" type="number" defaultValue="0" inputProps={{ style: { textAlign: 'left' } }} sx={{ mb: 1 }} />
                <TextField size="small" type="number" defaultValue="0" inputProps={{ style: { textAlign: 'left' } }} sx={{ mb: 1 }} />
              </Grid>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} md={6}>
              <TextField
                label="Remarks"
                name="Remarks"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                value={formik.values.Remarks}
                onChange={formik.handleChange}
                error={formik.touched.Remarks && Boolean(formik.errors.Remarks)}
                helperText={formik.touched.Remarks && formik.errors.Remarks}
              />
            </Grid>
            <Grid item xs={12} md={4} />

            <Grid item xs={12} md={2}>
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group" sx={{ fontSize: '1rem' }} variant="subtitle1">
                  Bill To
                </FormLabel>
                <RadioGroup aria-labelledby="demo-controlled-radio-buttons-group" name="controlled-radio-buttons-group" value={''}>
                  <FormControlLabel value="female" control={<Radio />} label="Consignor" />
                  <FormControlLabel value="male" control={<Radio />} label="Consignee" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-start', gap: 3, mt: 2 }}>
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
              <Button variant="outlined" color="secondary" type="reset">
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default AddShipment;
