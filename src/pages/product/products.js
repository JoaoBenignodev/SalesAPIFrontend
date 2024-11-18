import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
    IconButton,
    Divider,
    Button,
    Typography,
    Dialog,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import UpdateProductForm from "./components/UpdateProductForm";
import { formatDecimal } from "../../utils/formatDecimal";
import { formatLocale } from "../../utils/formatLocale";

const Products = () => {
    const [products, setproducts] = useState([]);
    const [product, setProduct] = useState({});
    const [openModal, setOpenModal] = useState(false);

    const fetchProducts = async () => {
        try {
            const response = await fetch(
                "http://localhost:8080/api/products/",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                const data = await response.json();

                setproducts(data ?? []);
                return;
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    function handleUpdateProduct(product) {
        setProduct(product);
        setOpenModal(true);
    }

    async function handleSubmitProduct(userId, productId, product) {
        await updateProduct(userId, productId, product);
        await fetchProducts();
        setOpenModal(false);
    }

    async function updateProduct(userId, id, product) {
        try {
            const response = await fetch(
                `http://localhost:8080/api/products/${id}/change/`,
                {
                    method: "PUT",
                    body: JSON.stringify({
                        name: product.get("product"),
                        quantity: product.get("quantity"),
                        price: formatDecimal(product.get("price")),
                        is_active: true,
                        user_id: userId,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                console.error("Erro ao atualizar produto");
                return;
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <Box p={8} width="100%">
                <TableContainer
                    component={Paper}
                    sx={{ display: "flex", flexDirection: "column" }}
                >
                    <Box
                        paddingX={5}
                        paddingY={3}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography variant="h4">Produtos</Typography>
                        <Button
                            href="/product/add"
                            variant="outlined"
                            color="success"
                        >
                            Adicionar produto
                        </Button>
                    </Box>
                    <Divider />
                    <Table arial-label="user table">
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    sx={{ fontWeight: "bold" }}
                                    align="center"
                                >
                                    Produto
                                </TableCell>
                                <TableCell
                                    sx={{ fontWeight: "bold" }}
                                    align="right"
                                >
                                    Quantidade
                                </TableCell>
                                <TableCell
                                    sx={{ fontWeight: "bold" }}
                                    align="right"
                                >
                                    Preço
                                </TableCell>
                                <TableCell
                                    sx={{ fontWeight: "bold" }}
                                    align="center"
                                >
                                    Status
                                </TableCell>
                                <TableCell
                                    sx={{ fontWeight: "bold" }}
                                    align="center"
                                />
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <TableRow
                                        key={product.id}
                                        hover
                                        sx={{
                                            "&:hover": {
                                                cursor: "pointer",
                                            },
                                        }}
                                        // style={{backgroundColor: index % 2 == 0 ? 'white' : 'whitesmoke'}} -> users.map((user, index)
                                        //onClick={() => alert(`cliente escolhido: ${user.name}`)}
                                    >
                                        <TableCell align="center">
                                            {product.name}
                                        </TableCell>
                                        <TableCell align="right">
                                            {product.quantity}
                                        </TableCell>
                                        <TableCell align="right">
                                            {formatLocale(product.price)}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            style={{ alignContent: "left" }}
                                        >
                                            <Box
                                                display="flex"
                                                justifyContent="center"
                                                width="full"
                                            >
                                                {product.is_active ? (
                                                    <Box
                                                        sx={{ minWidth: 60 }}
                                                        px={2}
                                                        bgcolor="#7986cb"
                                                        borderRadius="16px"
                                                        color="#FFF"
                                                    >
                                                        Ativo
                                                    </Box>
                                                ) : (
                                                    <Box
                                                        sx={{ minWidth: 60 }}
                                                        px={2}
                                                        bgcolor="#c5cae9"
                                                        borderRadius="16px"
                                                        color="#FFF"
                                                    >
                                                        Não ativo
                                                    </Box>
                                                )}
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center">
                                            {/* <TableCell align="center" type='button' value='Atualizar'></TableCell> */}
                                            <IconButton
                                                aria-label="edit"
                                                onClick={() =>
                                                    handleUpdateProduct(product)
                                                }
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell size="small">
                                        Nenhum produto encontrado
                                    </TableCell>
                                    <TableCell size="small" />
                                    <TableCell size="small" />
                                    <TableCell size="small" />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Dialog
                maxWidth="md"
                PaperComponent={Paper}
                fullWidth
                open={openModal}
                onClose={() => {
                    setOpenModal(false);
                }}
            >
                <UpdateProductForm
                    product={product}
                    idProduct={product.id}
                    onSubmit={(userId, productId, product) =>
                        handleSubmitProduct(userId, productId, product)
                    }
                />
            </Dialog>
        </>
    );
};

export default Products;
