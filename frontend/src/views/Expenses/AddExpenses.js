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
import { MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { postApi } from 'views/services/api';
import { useEffect } from 'react';
import { getApi } from 'views/services/api';

const AddExpenses = (props) => {
  const { open, handleClose } = props;

  const user = JSON.parse(localStorage.getItem('user'));
  const [tabValue, setTabValue] = useState('1');
  const [expenses, setExpenses] = useState([]);

  

  const validationSchemaForExpenses = yup.object({
    category: yup.string().required('Category is required'),
    date: yup.string().required('Date is required'),
    name: yup.string().required('Name is required'),
    amount: yup.number().required('Amount is required'),
    note: yup.string().required('Note is required'),
  });

  const validationSchemaForExpensesCategory = yup.object({
    expenseCategoryName: yup.string().required('Category is required'),
    note: yup.string().required('Note is required')
  });

  const initialValues = {
    expenseCategoryName: '',
    note: '',
  };

  const initialValuesForExpense  = {
    category: '',
    date: '',
    name: '',
    amount: '',
    note: '',
    
  };

  const formik = useFormik({
    initialValues: tabValue === '1' ? initialValuesForExpense : initialValues,
    validationSchema: tabValue === '1' ? validationSchemaForExpenses : validationSchemaForExpensesCategory,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      console.log('values', values);
      try {
        values.created_by = JSON.parse(localStorage.getItem('user'))._id;
        console.log('values.created_by ==>', values.created_by);
        if (tabValue === '2') {
          postApi(`/expense/addcategory`, values)
            .then((response) => {
              if (response) {
                console.log('response ==>', response);
              }
            })
            .catch((error) => {
              console.log('error ==>', error);
            });
        } else {
          postApi(`/expense/addexpense`, values)
            .then((response) => {
              if (response) {
                console.log('response ==>', response);
              }
            })
            .catch((error) => {
              console.log('error ==>', error);
            });
        }
      } catch (error) {
        console.log('error ==>', error);
      }
      handleClose();
      formik.resetForm();
    }
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const fetchExpenseCategory = async () => {
    try {
      const response = await getApi(`/expense/getallexpense_category/${user._id}`);
      console.log(' get all expenses ==>', response);
      setExpenses(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExpenseCategory();
  }, [open]);

  return (
    <div>
      <Dialog open={open} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description" maxWidth="xs">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h6">Create Expenses</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleTabChange} aria-label="dialog tabs">
                <Tab label="Expense" value="1" />
                <Tab label="Expense Category" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1" sx={{ p: 0, mt: 2 }}>
              <form>
                <Grid container rowSpacing={2}>
                  <Grid item xs={12} md={12}>
                    <FormLabel>Select Expenses Category</FormLabel>
                    <TextField
                      select
                      id="category"
                      name="category"
                      size="small"
                      fullWidth
                      value={formik.values.category}
                      onChange={formik.handleChange}
                      error={formik.touched.category && Boolean(formik.errors.category)}
                      helperText={formik.touched.category && formik.errors.category}
                    >
                      {expenses.map((option) => (
                        <MenuItem key={option._id} value={option._id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <FormLabel>Date</FormLabel>
                    <TextField
                      id="date"
                      type="date"
                      name="date"
                      size="small"
                      fullWidth
                      value={formik.values.date}
                      onChange={formik.handleChange}
                      error={formik.touched.date && Boolean(formik.errors.date)}
                      helperText={formik.touched.date && formik.errors.date}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      id="name"
                      name="name"
                      label="Name"
                      size="small"
                      fullWidth
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      id="amount"
                      name="amount"
                      label="Amount"
                      size="small"
                      fullWidth
                      value={formik.values.amount}
                      onChange={formik.handleChange}
                      error={formik.touched.amount && Boolean(formik.errors.amount)}
                      helperText={formik.touched.amount && formik.errors.amount}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      id="note"
                      name="note"
                      label="note"
                      multiline
                      rows={4}
                      size="small"
                      fullWidth
                      value={formik.values.note}
                      onChange={formik.handleChange}
                      error={formik.touched.note && Boolean(formik.errors.note)}
                      helperText={formik.touched.note && formik.errors.note}
                    />
                  </Grid>
                </Grid>
              </form>
            </TabPanel>
            <TabPanel value="2" sx={{ p: 0, mt: 2 }}>
              <form>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                  <Grid item xs={12}>
                    <TextField
                      id="expenseCategoryName"
                      name="expenseCategoryName"
                      label="Name"
                      size="small"
                      fullWidth
                      value={formik.values.expenseCategoryName}
                      onChange={formik.handleChange}
                      error={formik.touched.expenseCategoryName && Boolean(formik.errors.expenseCategoryName)}
                      helperText={formik.touched.expenseCategoryName && formik.errors.expenseCategoryName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="note"
                      name="note"
                      label="note"
                      multiline
                      rows={4}
                      size="small"
                      fullWidth
                      value={formik.values.note}
                      onChange={formik.handleChange}
                      error={formik.touched.note && Boolean(formik.errors.note)}
                      helperText={formik.touched.note && formik.errors.note}
                    />
                  </Grid>
                </Grid>
              </form>
            </TabPanel>
          </TabContext>
        </DialogContent>

        <DialogActions>
          <Button type="submit" variant="contained" onClick={formik.handleSubmit} style={{ textTransform: 'capitalize' }} color="primary">
            Save
          </Button>
          <Button type="submit" variant="contained" onClick={formik.handleSubmit} style={{ textTransform: 'capitalize' }} color="secondary">
            Reset
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

export default AddExpenses;
