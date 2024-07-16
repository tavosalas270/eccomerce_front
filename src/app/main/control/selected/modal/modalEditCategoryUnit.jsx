import React, {useState, useEffect} from 'react'
import { useForm } from 'react-hook-form';
import { Input } from "@nextui-org/react";

function ModalEditCategoryUnit({dataSelected, sendDataCategoryUnit, sendValidForm}) {

  const [value, setValue] = useState(dataSelected.description);
  const [valid, setValid] = useState(true);

  const { register, setError, trigger, formState: { errors } } = useForm({
    defaultValues: {
      description: dataSelected.description,
    }
  });

  useEffect(() => {
    trigger(); // Ejecuta la validación inicial al abrir el componente
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setValue(value)
    const dataToSend = {
      id: dataSelected.id,
      description: value,
    };
    sendDataCategoryUnit(dataToSend);
    if (!value.trim()) {
      setError('description', {
        type: 'manual',
        message: "Este campo es requerido",
      });
      setValid(false)
    } else if (value.length < 5) {
      setError('description', {
        type: 'manual',
        message: "La descripción debe tener al menos 5 caracteres",
      });
      setValid(false)
    } else if (value.length > 10) {
      setError('description', {
        type: 'manual',
        message: "La descripción no puede exceder los 10 caracteres",
      });
      setValid(false)
    } else {
      setError('description', null);
      setValid(true)
    }
  };

  useEffect(() => {
    sendValidForm(valid)
  }, [valid]);


  return (
    <form>
      <Input {...register('description', { required: "Este campo es requerido" })} type='text' label="Description" onChange={handleInputChange} value={value} isRequired isInvalid={!valid} errorMessage={errors.description ? errors.description.message : null} />
    </form>
  )
}

export default ModalEditCategoryUnit