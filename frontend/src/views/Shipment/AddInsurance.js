/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { FormLabel } from '@mui/material';
import { useState } from 'react';

const AddInsurance = (props) => {
  const { open, handleClose } = props;
  const validationSchema = yup.object({
    subject: yup.string().required('Subject is required'),
    receiver: yup.string().email().required('Receiver is required'),
    lcv: yup.string().required('lcv is required')
  });

  // -----------   initialValues
  const initialValues = {
    sender: '',
    subject: '',
    receiver: '',
    lcv: ''
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      // addClaim(values);
      console.log('EmailValues', values);
      handleClose();
      formik.resetForm();
      toast.success('Email Add successfully');
      resetForm();
    }
  });

  return (
    <div>
      <Dialog open={open} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description" maxWidth="xs">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
            // backgroundColor: "#2b4054",
            // color: "white",
          }}
        >
          <Typography variant="h6">Insurance Details</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    id="ewayBill"
                    name="ewayBill"
                    label="Eway Bill"
                    size="small"
                    fullWidth
                    value={formik.values.ewayBill}
                    onChange={formik.handleChange}
                    error={formik.touched.ewayBill && Boolean(formik.errors.ewayBill)}
                    helperText={formik.touched.ewayBill && formik.errors.ewayBill}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    id="insuranceNo"
                    name="insuranceNo"
                    label="Insurance No"
                    size="small"
                    fullWidth
                    value={formik.values.insuranceNo}
                    onChange={formik.handleChange}
                    error={formik.touched.insuranceNo && Boolean(formik.errors.insuranceNo)}
                    helperText={formik.touched.insuranceNo && formik.errors.insuranceNo}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    id="insuranceAgent"
                    name="insuranceAgent"
                    label="Insurance Agent"
                    size="small"
                    fullWidth
                    value={formik.values.insuranceAgent}
                    onChange={formik.handleChange}
                    error={formik.touched.insuranceAgent && Boolean(formik.errors.insuranceAgent)}
                    helperText={formik.touched.insuranceAgent && formik.errors.insuranceAgent}
                  />
                </Grid>
              </Grid>
            </DialogContentText>
          </form>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" onClick={formik.handleSubmit} style={{ textTransform: 'capitalize' }} color="secondary">
            Save
          </Button>
          <Button
            type="reset"
            variant="outlined"
            style={{ textTransform: 'capitalize' }}
            onClick={() => {
              formik.resetForm();
              handleClose();
            }}
            color="error"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddInsurance;
