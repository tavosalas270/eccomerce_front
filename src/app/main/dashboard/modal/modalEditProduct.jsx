import React, {useState, useEffect} from 'react'
import { Input, Select, SelectItem, Textarea } from "@nextui-org/react";

function ModalEditProduct({categorias, unidades, dataSelected, sendDataProducts}) {

    const defaultUnit = unidades.find(item => item.description === dataSelected.measure_unit)?.id;
    const defaultCategory = categorias.find(item => item.description === dataSelected.category_product)?.id;

    const [name, setName] = useState(dataSelected.name);
    const [description, setDescription] = useState(dataSelected.description);
    const [image, setImage] = useState("");
    const [unit, setUnit] = useState(defaultUnit);
    const [category, setCategory] = useState(defaultCategory);

    const handleValue = (value, field) => {
        switch (field) {
            case "name":
                setName(value);
                break;
            case "description":
                setDescription(value);
                break;
            default:
                break;
        }
    }

    const handleChange = (value, field) => {
        switch (field) {
            case "category":
                setCategory(parseInt(value))
                break;
            case "unit":
                setUnit(parseInt(value))
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        const data = {
            "id": dataSelected.id,
            "name": name,
            "description": description,
            "image": image,
            "measure_unit": unit,
            "category_product": category 
        }
        sendDataProducts(data)
    }, [name, description, image, unit, category]);

  return (
    <div className='flex flex-col w-full gap-y-2'>
        <Input value={name} type='text' label="Name" onChange={(e) => handleValue(e.target.value, "name")} />
        <Textarea value={description} label="Description" placeholder="Enter your description" className="w-full" onChange={(e) => handleValue(e.target.value, "description")} />
        <div className="relative p-2 rounded-medium !bg-neutral-100">
            <input type="file" onChange={(e) => setImage(e.target.files[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <label htmlFor="file-input" className="cursor-pointer text-small text-foreground-500">
                {image?.name ? image?.name : "Seleccionar archivo"}
            </label>
        </div>
        <Select label="Categories" onChange={(e) => handleChange(e.target.value, "category")} defaultSelectedKeys={[defaultCategory.toString()]}>
            {categorias.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                    {item.description}
                </SelectItem>
            ))}
        </Select>
        <Select label="Units" onChange={(e) => handleChange(e.target.value, "unit")} defaultSelectedKeys={[defaultUnit.toString()]}>
            {unidades.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                    {item.description}
                </SelectItem>
            ))}
        </Select>
    </div>
  )
}

export default ModalEditProduct