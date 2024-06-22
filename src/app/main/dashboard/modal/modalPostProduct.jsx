import React, {useEffect} from 'react'
import { useForm } from 'react-hook-form';
import { Input, Select, SelectItem, Textarea } from "@nextui-org/react";

function ModalPostProduct({categorias, unidades, sendDataProducts, sendValidForm}) {

    const { register, watch, formState: { isValid } } = useForm({
        defaultValues: {
            name: "",
            description: "",
            image: "",
            measure_unit: "",
            category_product: ""
        }
    });

    useEffect(() => {
        const dataToSend = {
            name: watch('name'),
            description: watch('description'),
            image: watch('image')[0],
            measure_unit: watch('measure_unit'),
            category_product: watch('category_product')
        };
        sendDataProducts(dataToSend);
        sendValidForm(isValid)
    }, [watch('name'), watch('description'), watch('image'), watch('measure_unit'), watch('category_product'), isValid]);

  return (
    <form>
        <div className='flex flex-col w-full gap-y-2'>
            <Input type='text' label="Name" {...register('name', { required: true, maxLength: 20 })} />
            <Textarea {...register('description', { required: true, maxLength: 100 })} label="Description" placeholder="Enter your description" className="w-full" />
            <div className="relative p-2 rounded-medium !bg-neutral-100">
                <input {...register('image', { required: true })} type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <label htmlFor="file-input" className="cursor-pointer text-small text-foreground-500">
                    {watch('image')[0]?.name ? watch('image')[0]?.name : "Seleccionar archivo"}
                </label>
            </div>
            <Select label="Categories" {...register('category_product', { required: true })}>
                {categorias.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                        {item.description}
                    </SelectItem>
                ))}
            </Select>
            <Select label="Units" {...register('measure_unit', { required: true })}>
                {unidades.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                        {item.description}
                    </SelectItem>
                ))}
            </Select>
        </div>
    </form>
    
  )
}

export default ModalPostProduct