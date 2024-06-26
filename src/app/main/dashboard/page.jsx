"use client"
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { getAllProducts, getCategories, getUnits, getIndicators, postProducts, updateProducts, deleteProducts } from '@/models/products';
import ModalPostProduct from './modal/modalPostProduct';
import ModalEditProduct from './modal/modalEditProduct';
import { addProducts, addCategories, addUnits, addIndicators } from '@/redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Modal, ModalContent, ModalHeader, 
    ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

function Dashboard() {

    const config = {
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("token")
        }
    }

    const router = useRouter()

    const dispatch = useDispatch()

    const listProducts = useSelector((state) => state.product)

    const {isOpen, onOpen, onClose} = useDisclosure();

    const [metodo, setMetodo] = useState("");
    const [dataSelected, setDataSelected] = useState({});
    const [dataSend, setDataSend] = useState({});
    const [dataValida, setDataValida] = useState(false);
    const [products, setProducts] = useState([]);

    const sendValidForm = (value) => {
        setDataValida(value)
    }

    const handleOpenPostProducts = (metodo) => {
        setMetodo(metodo)
        onOpen();
    }

    const handleOpenEditProducts = (item, metodo) => {
        setMetodo(metodo)
        setDataSelected(item)
        onOpen();
      }

    const sendDataProducts = (data) => {
        setDataSend(data)
    }

    function enviarNuevoProducto() {
        const formData = new FormData();
        formData.append('name', dataSend.name);
        formData.append('description', dataSend.description);
        formData.append('image', dataSend.image);
        formData.append('measure_unit', dataSend.measure_unit);
        formData.append('category_product', dataSend.category_product);
        postProducts(formData, config).then((response) => {
            const nuevosProductos = [...listProducts.listProducts, response.data]
            dispatch(addProducts(nuevosProductos))
            onClose()
        }).catch(error => {})
    }

    function enviarProductoActualizado() {
        const formData = new FormData();
        formData.append('name', dataSend.name);
        formData.append('description', dataSend.description);
        formData.append('image', dataSend.image);
        formData.append('measure_unit', dataSend.measure_unit);
        formData.append('category_product', dataSend.category_product);
        updateProducts(formData, config, dataSend.id).then((response) => {
            const nuevosProductos = listProducts.listProducts.map((obj) => {
                if (obj.id === response.data.id) {
                  return response.data;
                } else {
                  return obj;
                }
            })
            dispatch(addProducts(nuevosProductos))
            onClose()
        }).catch(error => {})
    }

    const deleteProduct = (item) => {
        Swal.fire({
            title: "¿Estas seguro de querer borrar este registro?",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            confirmButtonColor: "rgb(248 113 113)",
            cancelButtonText: "Cancelar"
          }).then((result) => {
            if (result.isConfirmed) {
                deleteProducts(item.id,config).then((response) => {
                    dispatch(addProducts(response.data))
                    Swal.fire({
                        icon: "success",
                        title: "Registro eliminado correctamente",
                    });
                }).catch(error => {})
            }
          });
    }

    useEffect(() => {
        setProducts(listProducts.listProducts)
    }, [listProducts]);

    useEffect(() => {
        if (listProducts.listProducts.length < 1 && listProducts.listCategories.length < 1 && listProducts.listUnits.length < 1 && listProducts.listIndicators.length < 1) {
            const promiseProducts = getAllProducts(config)
            const promiseCategories = getCategories(config)
            const promiseUnits = getUnits(config)
            const promiseIndicators = getIndicators(config)

            Promise.all([promiseProducts, promiseCategories, promiseUnits, promiseIndicators])
            .then(([responseProducts, responseCategories, responseUnits, responseIndicators]) => {
                dispatch(addProducts(responseProducts))
                dispatch(addCategories(responseCategories))
                dispatch(addUnits(responseUnits))
                dispatch(addIndicators(responseIndicators))
            }).catch(error => {
                router.push('/login');
            })
        }
    }, []);

  return (
    <div className='flex flex-col w-full h-full p-2 gap-y-2'>
        <Table aria-label="Productos" className='h-4.75/5 overflow-y-auto'>
            <TableHeader>
                <TableColumn>NAME</TableColumn>
                <TableColumn>DESCRIPTION</TableColumn>
                <TableColumn>MEASURE UNIT</TableColumn>
                <TableColumn>CATEGORY</TableColumn>
                <TableColumn className='text-center'>OPTIONS</TableColumn>
            </TableHeader>
            <TableBody>
                {products.map((item, index) => (
                    <TableRow key={index.toString()}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{item.measure_unit}</TableCell>
                        <TableCell>{item.category_product}</TableCell>
                        <TableCell>
                            <div className='flex justify-center w-full gap-2'>
                                <Button className='w-32 bg-red-400 font-semibold' onPress={() => deleteProduct(item)}>Eliminar</Button>
                                <Button className='w-32 bg-blue-400 font-semibold' onPress={() => handleOpenEditProducts(item, "edit")}>Actualizar</Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        <div className='flex flex-row justify-end h-0.25/5'>
            <Button className='w-40 bg-green-400 font-semibold' onClick={() => handleOpenPostProducts("post")}>Añadir Producto</Button>
        </div>

        <Modal size="lg" isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Producto</ModalHeader>
                <ModalBody>
                    {metodo === "post" ? (
                        <ModalPostProduct categorias={listProducts.listCategories} unidades={listProducts.listUnits} sendDataProducts={sendDataProducts} sendValidForm={sendValidForm}></ModalPostProduct>
                    ):(
                        <ModalEditProduct categorias={listProducts.listCategories} unidades={listProducts.listUnits} dataSelected={dataSelected} sendDataProducts={sendDataProducts} sendValidForm={sendValidForm}></ModalEditProduct>
                    )}  
                </ModalBody>
                <ModalFooter>
                    <Button className='w-32 bg-danger-300 font-semibold' onPress={onClose}>Close</Button>
                    <Button isDisabled={!dataValida} className='w-32 bg-blue-400 font-semibold' onPress={metodo === "post" ? enviarNuevoProducto : enviarProductoActualizado}>Guardar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </div>
  )
}

export default Dashboard