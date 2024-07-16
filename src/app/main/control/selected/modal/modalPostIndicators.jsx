import React, {useState, useEffect} from 'react'
import { useForm } from 'react-hook-form';
import { Input, Select, SelectItem } from "@nextui-org/react";

function ModalPostIndicators({categories, sendDataIndicators, sendValidForm}) {

    const [validDescount, setValidDescount] = useState(false);
    const [validCategory, setValidCategory] = useState(false);

    const [currentDiscount, setCurrentDiscount] = useState(0);
    const [currentCategory, setCurrentCategory] = useState(0);

    const { register, setValue, setError, trigger, formState: { errors } } = useForm({
        defaultValues: {
            descount: 0,
            category: 0,
        }
    });

    useEffect(() => {
        trigger(); // Ejecuta la validación inicial al abrir el componente
    }, []);

    useEffect(() => {
        if (currentDiscount <= 0) {
            setError('descount', {
                type: 'manual',
                message: "El descuento debe ser superior a 0",
            });
            setValidDescount(false)
        } else {
            setError('descount', null);
            setValidDescount(true)
        }

        if (currentCategory === 0) {
            setError('category', {
                type: 'manual',
                message: "Debes escoger una categoria",
            });
            setValidCategory(false)
        } else {
            setError('category', null);
            setValidCategory(true)
        }
        const dataToSend = {
            descount_value: currentDiscount,
            category_product: currentCategory,
        };
        sendDataIndicators(dataToSend)
    }, [currentDiscount, currentCategory]);

    const handleDiscountChange = (event) => {
        setCurrentDiscount(parseInt(event.target.value));
        setValue('descount', parseInt(event.target.value));
    };

    const handleInputChange = (value) => {
        setCurrentCategory(parseInt(value))
        setValue('category', parseInt(value));
    };

    useEffect(() => {
        if (validDescount && validCategory) {
            sendValidForm(true)
        } else {
            sendValidForm(false)
        }
    }, [validDescount, validCategory]);

  return (
    <form>
        <div className='flex flex-col w-full gap-y-2'>
            <Input {...register('descount', { validate: value => Number(value) > 0 || "El descuento debe ser superior a 0" })} value={currentDiscount} isInvalid={validDescount === false} min={0} type='number' label="Descount" onChange={handleDiscountChange} errorMessage={errors.descount ? errors.descount.message : null} />
            <Select {...register('category', { required: "Este campo es requerido" })} label="Categories" isInvalid={validCategory === false} errorMessage={errors.category ? errors.category.message : null}>
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

export default ModalPostIndicators