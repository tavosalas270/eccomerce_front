import React, {useState, useEffect} from 'react'
import { Input, Select, SelectItem, Textarea } from "@nextui-org/react";

function ModalPostProduct({categorias, unidades, sendDataProducts}) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [unit, setUnit] = useState(0);
    const [category, setCategory] = useState(0);

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

  return (
    <div className='flex flex-col w-full gap-y-2'>
        <Input value={name} type='text' label="Name" onChange={(e) => handleValue(e.target.value, "name")} />
        <Textarea value={description} label="Description" placeholder="Enter your description" className="w-full" onChange={(e) => handleValue(e.target.value, "description")} />
        <div className="relative p-2 rounded-medium !bg-neutral-100">
            <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <label htmlFor="file-input" className="cursor-pointer text-small text-foreground-500">
                Seleccionar archivo
            </label>
        </div>
        <Select label="Categories" onChange={(e) => handleChange(e.target.value, "category")}>
            {categorias.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                    {item.description}
                </SelectItem>
            ))}
        </Select>
        <Select label="Units" onChange={(e) => handleChange(e.target.value, "unit")}>
            {unidades.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                    {item.description}
                </SelectItem>
            ))}
        </Select>
    </div>
  )
}

export default ModalPostProduct