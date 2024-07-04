import React, {useState, useEffect} from 'react'
import { useForm } from 'react-hook-form';
import { Input, Select, SelectItem } from "@nextui-org/react";

function ModalEditIndicators({categories, optionSelected, dataSelected, sendDataIndicators, sendValidForm}) {

    const { register, setValue, setError, watch, trigger, formState: { errors } } = useForm({
        defaultValues: {
            descount: dataSelected.descount_value,
            category: optionSelected.id,
        }
    });

    useEffect(() => {
        if (watch('descount') === undefined) {
            setError('descount', {
                type: 'manual',
                message: "Este campo es requerido",
            });
            sendValidForm(false)
        } else if (watch('descount') <= 0) {
            setError('descount', {
                type: 'manual',
                message: "El descuento debe ser superior a 0",
            });
            sendValidForm(false)
        } else {
            setError('descount', null);
            sendValidForm(true)
        }
        const dataToSend = {
            id: dataSelected.id,
            descount_value: watch('descount'),
            category_product: watch('category'),
        };
        sendDataIndicators(dataToSend)
    }, [watch('descount'), watch('category')]);

    const [currentDiscount, setCurrentDiscount] = useState(dataSelected.descount_value);

    useEffect(() => {
        trigger(); // Ejecuta la validación inicial al abrir el componente
    }, []);

    const handleDiscountChange = (event) => {
        setCurrentDiscount(event.target.value);
        setValue('descount', event.target.value);
    };

    const handleInputChange = (value) => {
        setValue('category', parseInt(value));
    };

  return (
    <form>
        <div className='flex flex-col w-full gap-y-2'>
            <Input {...register('descount', { required: "Este campo es requerido" })} value={currentDiscount} min={0} type='number' label="Descount" onChange={handleDiscountChange} errorMessage={errors.descount ? errors.descount.message : null} />
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