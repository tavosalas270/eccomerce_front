import React, {useEffect} from 'react'
import { useForm } from 'react-hook-form';
import { Input, Select, SelectItem, Textarea, Card, CardHeader, CardBody, Image } from "@nextui-org/react";

function ModalEditProduct({categorias, unidades, dataSelected, sendDataProducts, sendValidForm}) {

    const base64String = `data:image/jpeg;base64,${dataSelected.image}`;

    const defaultUnit = unidades.find(item => item.description === dataSelected.measure_unit)?.id;
    const defaultCategory = categorias.find(item => item.description === dataSelected.category_product)?.id;

    const { register, watch, formState: { isValid } } = useForm({
        defaultValues: {
            name: dataSelected.name,
            description: dataSelected.description,
            image: "",
            measure_unit: defaultUnit,
            category_product: defaultCategory
        }
    });

    useEffect(() => {
        const dataToSend = {
            id: dataSelected.id,
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
        <div className='flex flex-col h-full w-full gap-y-2'>
            <Input {...register('name', { required: true, maxLength: 20 })} value={watch('name')} type='text' label="Name" />
            <Textarea {...register('description', { required: true, maxLength: 100 })} value={watch('description')} label="Description" placeholder="Enter your description" className="w-full" />
            {dataSelected.image_name !== "" ? (
                <Card className="py-4 w-full h-80 bg-neutral-100 overflow-y-auto">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <p className="text-tiny uppercase font-bold">Imagen Actual del Producto</p>
                        <p className="font-bold text-medium">{dataSelected.image_name}</p>
                    </CardHeader>
                    <CardBody className="flex-row justify-center items-center overflow-visible py-2">
                        <Image src={base64String} alt="chosen" className='object-cover w-full' />
                    </CardBody>
                </Card>
            ):null}
            <div className="relative p-2 rounded-medium !bg-neutral-100">
                <input {...register('image', { required: true })} type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <label htmlFor="file-input" className="cursor-pointer text-small text-foreground-500">
                    {watch('image')[0]?.name ? watch('image')[0]?.name : "Seleccionar archivo"}
                </label>
            </div>
            <Select {...register('category_product', { required: true })} label="Categories" defaultSelectedKeys={[defaultCategory.toString()]}>
                {categorias.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                        {item.description}
                    </SelectItem>
                ))}
            </Select>
            <Select {...register('measure_unit', { required: true })} label="Units" defaultSelectedKeys={[defaultUnit.toString()]}>
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

export default ModalEditProduct