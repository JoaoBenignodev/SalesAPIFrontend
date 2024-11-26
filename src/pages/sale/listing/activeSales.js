import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Box, Button, Checkbox, Divider, IconButton, Modal, Paper, Snackbar, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { formatLocale } from '../../../utils/formatLocale';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import TableRowsIcon from '@mui/icons-material/TableRows';



function ActiveSales() {

    // useState hook to store the list of Sales
    const [sales, setSales] = useState([]);

    // Instancing useNavigate function
    const navigateTo = useNavigate()

    const [currentSale, setCurrentSale] = useState(null);
    const [formValues, setFormValues] = useState({
        is_active: true // Default value
    });
    const [openModal, setOpenModal] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    

    // Function to fetch all sales from the frontend
    async function fetchSales() {
        try {
            //const response = await fetch('', {});
            const response = await fetch('http://localhost:8080/api/sales/active/',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

            const data = await response.json();
            if (response.ok) {
                setSales(data); //Setting the fetched sales data
            } else {
                console.error('Failed to fetch active Sales!', data);
                setSnackbarMessage('An error occured while fetching the sales!');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            }

        } catch (error) {
            console.log('Error fetching sales:', error);
            setSnackbarMessage('An error occured!');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    }

    //useEffect hook to fetch sales when the component loads
    useEffect(() => {
        fetchSales();
    }, []);

    // Function to handle Sale update
    function updateSale(sale) {
        setCurrentSale(sale); //set the current sale to be edited
        setFormValues({
            is_active: sale.is_active
        }); //populate form with sales data
        setOpenModal(true);
    }

    // Function to submit the updated sale data
    async function handleFormSubmit() {
        // Check if the sale is still active
        if (formValues.is_active) {
            setSnackbarMessage('Only inactivations can be done via the update!');
            setSnackbarSeverity('warning');
            setOpenSnackbar(true);
            return
        }

        try {
            const response = await fetch(`http://localhost:8080/api/sales/${currentSale.id}/change/`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formValues),
                });

            const data = response.json()

            if (response.ok) {
                console.log("Sale inactivated with success!", data);
                setSnackbarMessage('The Sale was inactivated with success!');
                setSnackbarSeverity("success");
                setOpenSnackbar(true);

                setOpenModal(false); // Closes the modal

                // Fetch the Product listing considering the updated data
                fetchSales()

                //
                setTimeout(() => {
                    navigateTo('/sales/')
                }, 2000)

            } else {
                console.error("Failed to inactivate the Sale!", data);
                setSnackbarMessage("Failed to inactivate the Sale!\nPlease try again!");
                setSnackbarSeverity("error");
                setOpenSnackbar(true);
            }

        } catch (error) {
            console.error('An error occured while inactivating the Sale!', error);
            setSnackbarMessage("An error occured while inactivating the Sale!");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
        }
    };

    // Close snackbar function
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    }

    return (
        <Box backgroundColor="#e8eaf6" p={8} width='100%'>
            <TableContainer
                component={Paper}
                sx={{ display: 'flex', flexDirection: 'column' }}
            >
                <Box
                    paddingX={5}
                    paddingY={3.1}
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                >
                    <h1
                        align="center"
                        style={{ flex: 1, textAlign: 'center' }}
                    >
                        Active Sales
                    </h1>
                    <Box
                        paddingRight={1}
                    >
                        <Button
                            variant='contained'
                            size='large'
                            href="/sales/"
                            endIcon={<TableRowsIcon />}
                            sx={{ fontWeight: 'bold', backgroundColor: '#3949ab' }}
                        >
                            LIST ALL
                        </Button>
                    </Box>
                    <Box
                        paddingLeft={1}
                    >
                        <Button
                            paddingX={2}
                            variant='contained'
                            size='large'
                            href="/sales/add/"
                            endIcon={<AddIcon />}
                            sx={{ fontWeight: 'bold', backgroundColor: '#3949ab' }}
                        >
                            ADD
                        </Button>
                    </Box>
                </Box>
                <Divider />
                <Table arial-label="sale table">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{ fontWeight: ' bold' }}
                                align="center"
                            >
                                Product
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: ' bold' }}
                                align="center"
                            >
                                Customer
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: ' bold' }}
                                align="center"
                            >
                                Quantity
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: ' bold' }}
                                align="center"
                            >
                                Price
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: ' bold' }}
                                align="center"
                            >
                                Status
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: ' bold' }}
                                align="center">
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {sales.map((sale) => (
                            <TableRow key={sale.id}
                                hover
                                sx={{
                                    '&:hover': {
                                        cursor: 'pointer',
                                    },
                                }}>
                                <TableCell align="center">{sale.product_name}</TableCell>
                                <TableCell align="center">{sale.user_name}</TableCell>
                                <TableCell align="center">{sale.quantity}</TableCell>
                                <TableCell align="center">{formatLocale(sale.price)}</TableCell>
                                <TableCell
                                    align="center"
                                    style={{ alignContent: "left" }}
                                >
                                    <Box
                                        display="flex"
                                        justifyContent="center"
                                        width="full"
                                    >
                                        {sale.is_active ? (
                                            <Box
                                                sx={{ minWidth: 60, fontWeight: 'bold' }}
                                                px={2}
                                                bgcolor="#7986cb"
                                                borderRadius="10px"
                                                color="#FFF"
                                            >
                                                Active
                                            </Box>
                                        ) : (
                                            <Box
                                                sx={{ minWidth: 60, fontWeight: 'bold' }}
                                                px={2}
                                                bgcolor="#ff7878cb"
                                                borderRadius="10px"
                                                color="#FFF"
                                            >
                                                Inactive
                                            </Box>
                                        )}
                                    </Box>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton aria-label="edit sale" onClick={() => updateSale(sale)}>
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal Component for editing sale*/}
            <Modal open={openModal}
                onClose={() => setOpenModal(false)}>

                <Box backgroundColor="#FFF" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 350, p: 4, borderRadius: '8px' }}>

                    <h2 align="center">Edit Sale</h2>

                    {/* IsActive checkbox configuration */}
                    <Box display="flex" alignItems="center">
                        <Checkbox
                            checked={formValues.is_active}
                            onChange={(e) =>
                                setFormValues({
                                    ...formValues,
                                    is_active: e.target.checked,
                                })
                            }
                            sx={{
                                color: "#7986cb",
                                "&.Mui-checked": { color: "#3949ab" },
                            }}
                        />
                        <span>Active</span>
                    </Box>


                    <Box display="flex" justifyContent="center" mt={2}>
                        <Button variant="contained" size="large" onClick={handleFormSubmit} sx={{ backgroundColor: "#3949ab" }}>
                            Update Sale
                        </Button>
                    </Box>
                </Box>
            </Modal>

            {/* Snackbar Component */}
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>

        </Box >

    );

}

export default ActiveSales; 