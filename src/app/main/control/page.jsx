"use client"
import React, {useState, useEffect} from 'react'
import Selected from './selected/selected';
import { getCategories, getUnits, getIndicators } from '@/models/products';
import { addCategories, addUnits, addIndicators } from '@/redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Tab } from '@nextui-org/react';

function Control() {

    const controlProducts = useSelector((state) => state.product)

    const [categories, setCategories] = useState([]);
    const [units, setUnits] = useState([]);
    const [indicators, setIndicators] = useState([]);

    useEffect(() => {
        setCategories(controlProducts.listCategories)
        setUnits(controlProducts.listUnits)
        setIndicators(controlProducts.listIndicators)
    }, [controlProducts]);

  return (
    <div className='flex flex-col w-full h-full p-2'>
        <Tabs aria-label="Options" fullWidth>
            <Tab key="categories" title="Categorias">
                <Selected title="Category" columns={["ID", "DESCRIPTION"]} values={categories} />
            </Tab>
            <Tab key="units" title="Unidades">
                <Selected title="Unit" columns={["ID", "DESCRIPTION"]} values={units} />
            </Tab>
            <Tab key="indicators" title="Indicadores">
                <Selected title="Indicator" columns={["ID", "DESCOUNT", "CATEGORY"]} values={indicators} />
            </Tab>
        </Tabs>
    </div>
  )
}

export default Control