import React, {useState, useEffect} from 'react'
import { useForm } from 'react-hook-form';
import { Input, Select, SelectItem } from "@nextui-org/react";

function ModalEditIndicators({categories, optionSelected, dataSelected, sendDataIndicators, sendValidForm}) {

    const [validDescount, setValidDescount] = useState(false);

    const { register, setValue, setError, watch, trigger, formState: { errors } } = useForm({
        defaultValues: {
            descount: dataSelected.descount_value,
            category: optionSelected.id,
        }
    });

    useEffect(() => {
        trigger();
    }, []);

    useEffect(() => {
        if (watch('descount') <= 0) {
            setError('descount', {
                type: 'manual',
                message: "El descuento debe ser superior a 0",
            });
            setValidDescount(false)
        } else {
            setError('descount', null);
            setValidDescount(true)
        }
        const dataToSend = {
            id: dataSelected.id,
            descount_value: watch('descount'),
            category_product: watch('category'),
        };
        sendDataIndicators(dataToSend)
    }, [watch('descount'), watch('category')]);

    const [currentDiscount, setCurrentDiscount] = useState(dataSelected.descount_value);

    const handleDiscountChange = (event) => {
        setCurrentDiscount(parseInt(event.target.value));
        setValue('descount', parseInt(event.target.value));
    };

    const handleInputChange = (value) => {
        setValue('category', parseInt(value));
    };

    useEffect(() => {
        sendValidForm(validDescount)
    }, [validDescount]);

  return (
    <form>
        <div className='flex flex-col w-full gap-y-2'>
            <Input {...register('descount', { validate: value => Number(value) > 0 || "El descuento debe ser superior a 0" })} value={currentDiscount} isInvalid={validDescount === false} min={0} type='number' label="Descount" onChange={handleDiscountChange} errorMessage={errors.descount ? errors.descount.message : null} />
            <Select {...register('category', { required: "Este campo es requerido" })} label="Categories" defaultSelectedKeys={[(optionSelected.id).toString()]}>
                {categories.map((item) => (
                    <SelectItem key={item.id} value={item.id} onClick={() => handleInputChange(item.id)}>
                        {item.description}
                    </SelectItem>
                ))}
            </Select>
        </div>
    </form>
  )
}

export default ModalEditIndicators