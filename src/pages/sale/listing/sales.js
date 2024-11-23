import { useState, useEffect } from 'react';
import { Alert, Box, Button, Divider, IconButton, Modal, Paper, Snackbar, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';



function Sales() {

    //useState hook to store the list of Sales
    const [sales, setSales] = useState([]);
    // const [user_id, setUser_id] = useState([]);
    const [currentSale, setCurrentSale] = useState(null);
    const [formValues, setFormValues] = useState({ quantity: '', price: '', user_id: '', product_id: '' });
    const [openModal, setOpenModal] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    //useEffect hook to fetch sales when the component loads
    useEffect(() => {
        fetchSales();
    }, []);

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
                console.error('Failed to fetch sales', data);
                setSnackbarMessage('Erro ao buscar as vendas');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            }

        } catch (error) {
            console.log('Error fetching sales:', error);
            setSnackbarMessage('Erro ao buscar as vendas');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    }

    // Function to handle Sale update
    function updateSale(sale) {
        setCurrentSale(sale); //set the current sale to be edited
        setFormValues({
            quantity: sale.quantity,
            price: sale.price,
            user_id: sale.user_id,
            product_id: sale.product_id,
        }); //populate form with sales data
        setOpenModal(true);
    }

    // Function to handle form input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    }

    // Function to submit the updated sale data
    async function handleFormSubmit() {
        try {
            const response = await fetch(`http://localhost:8080/api/sales/${currentSale.id}/change/`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formValues),
                });

            if (response.ok) {
                const updatedSale = await response.json();
                setSales((prevSales) =>
                    prevSales.map((sale) =>
                        sale.id === updatedSale.id ? updatedSale : sale
                    )
                );

                setOpenModal(false);
                setSnackbarMessage('Venda atualizada com sucesso!');
                setSnackbarSeverity('success');
                setOpenSnackbar(true);

            } else {
                setSnackbarMessage('Erro ao atualizar a venda');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
                console.log('Failed to update sale');
            }

        } catch (error) {
            setSnackbarMessage('Erro ao atualizar a venda');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
            console.error('Error updating sale: ', error);
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
                <h1 align="center">Sales</h1>
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
                                align="right"
                            >
                                Price
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
                                <TableCell align="right">{sale.price}</TableCell>
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

                    <h2 align="center">Editar Venda</h2>
                    <TextField
                        label="ID do Cliente"
                        name="user_id"
                        value={formValues.user_id}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="ID do Produto"
                        name="product_id"
                        value={formValues.product_id}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Quantidade"
                        name="quantity"
                        value={formValues.quantity}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <Box display="flex" justifyContent="center" mt={2}>
                        <Button variant="contained" size="large" onClick={handleFormSubmit} sx={{ backgroundColor: "#3949ab" }}>
                            Atualizar
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

export default Sales; 