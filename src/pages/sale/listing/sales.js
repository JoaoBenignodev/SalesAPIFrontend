import { useEffect, useState } from 'react';
import { Alert, Box, Button, Divider, Paper, Snackbar, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { formatLocale } from '../../../utils/formatLocale';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

function Sales() {

    // useState hook to store the list of Sales
    const [sales, setSales] = useState([]);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    // Function to fetch all sales from the frontend
    async function fetchSales() {
        try {
            //const response = await fetch('', {});
            const response = await fetch('http://localhost:8080/api/sales/',
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
                console.error('Failed to fetch Sales!', data);
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
                        Sales
                    </h1>
                    <Box
                        paddingRight={1}
                    >
                        <Button
                            variant='contained'
                            size='large'
                            href="/sales/active/"
                            endIcon={<EditIcon />}
                            sx={{ fontWeight: 'bold', backgroundColor: '#3949ab' }}
                        >
                            EDIT
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

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

export default Sales; 