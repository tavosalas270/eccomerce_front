import React, {useState, useEffect} from 'react'
import { Input, Select, SelectItem } from "@nextui-org/react";

function ModalPostIndicators({categories, sendDataIndicators}) {

    const [descount, setDescount] = useState(0);
    const [category, setCategory] = useState(0);

    const handleValue = (value) => {
        if(value === '') {
            setDescount(0);
        } else {
            setDescount(parseInt(value));
        }
    }

    const handleChange = (value) => {
        setCategory(parseInt(value.target.value))
    };

    useEffect(() => {
        const data = {
            "descount_value": descount,
            "category_product": category 
        }
        sendDataIndicators(data)
    }, [descount, category]);

  return (
    <div className='flex flex-col w-full gap-y-2'>
        <Input value={descount} min={0} type='number' label="Descount" onChange={(e) => handleValue(e.target.value)} />
        <Select label="Categories" onChange={handleChange}>
            {categories.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                    {item.description}
                </SelectItem>
            ))}
        </Select>
    </div>
  )
}

export default ModalPostIndicators