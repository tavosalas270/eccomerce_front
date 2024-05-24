"use client"
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { getAllProducts, getCategories, getUnits, getIndicators, postProducts } from '@/models/products';
import ModalPostProduct from './modal/modalPostProduct';
import { addProducts, addCategories, addUnits, addIndicators } from '@/redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Modal, ModalContent, ModalHeader, 
    ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';

function Dashboard() {

    const config = {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    }

    const router = useRouter()

    const dispatch = useDispatch()

    const listProducts = useSelector((state) => state.product)

    const {isOpen, onOpen, onClose} = useDisclosure();

    const [metodo, setMetodo] = useState("");
    const [dataSelected, setDataSelected] = useState({});
    const [optionSelected, setOptionSelected] = useState({});
    const [dataSend, setDataSend] = useState({});
    const [dataInvalida, setDataInvalida] = useState(false);

    const [products, setProducts] = useState([]);

    const handleOpenPostProducts = (metodo) => {
        setMetodo(metodo)
        onOpen();
    }

    const sendDataProducts = (data) => {
        setDataSend(data)
    }

    function enviarNuevoProducto() {
        postProducts(dataSend, config).then((response) => {
            dispatch(addProducts(response.data))
            onClose()
        }).catch(error => {})
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
        <Table aria-label="Productos">
            <TableHeader>
                <TableColumn>NAME</TableColumn>
                <TableColumn>DESCRIPTION</TableColumn>
                <TableColumn>MEASURE UNIT</TableColumn>
                <TableColumn>CATEGORY</TableColumn>
            </TableHeader>
            <TableBody>
                {products.map((item, index) => (
                    <TableRow key={index.toString()}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{item.measure_unit}</TableCell>
                        <TableCell>{item.category_product}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        <div className='flex flex-row justify-end'>
            <Button className='w-40 bg-green-400 font-semibold' onClick={() => handleOpenPostProducts("post")}>Añadir Producto</Button>
        </div>

        <Modal size="lg" isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Producto</ModalHeader>
                <ModalBody>
                    <ModalPostProduct categorias={listProducts.listCategories} unidades={listProducts.listUnits} sendDataProducts={sendDataProducts}></ModalPostProduct>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </div>
  )
}

export default Dashboard