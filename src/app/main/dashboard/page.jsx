"use client"
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { getAllProducts } from '@/models/products';
import { addProducts } from '@/redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';

function Dashboard() {

    const router = useRouter()

    const dispatch = useDispatch()

    const listProducts = useSelector((state) => state.product)

    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(listProducts.listProducts)
    }, [listProducts]);

    useEffect(() => {
        if (listProducts.listProducts.length < 1) {
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }
            getAllProducts(config).then((response) => {
                dispatch(addProducts(response))
            }).catch((error) => {
                router.push('/login');
            });
        }
    }, []);

  return (
    <div className='flex flex-col w-full h-full p-2 gap-y-2'>
        <div className='flex flex-row justify-end'>
            <Button onClick={() => router.push('/control')} className='w-40 bg-green-400 font-semibold'>Añadir Producto</Button>
        </div>
        <Table aria-label="Productos">
            <TableHeader>
                <TableColumn>NAME</TableColumn>
                <TableColumn>DESCRIPTION</TableColumn>
            </TableHeader>
            <TableBody>
                {products.map((item, index) => (
                    <TableRow key={index.toString()}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.description}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
  )
}

export default Dashboard