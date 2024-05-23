import React, {useState, useEffect} from 'react'
import { Input } from "@nextui-org/react";

function ModalPostCategoryUnit({sendDataCategoryUnit}) {
    const [description, setDescription] = useState("");
    const [invalid, setInvalid] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
      if (description.length < 1) {
        setInvalid(true)
        setErrorMessage("La descripción no puede estar vacia")
      } else if (description.length > 50) {
        setInvalid(true)
        setErrorMessage("La descripción no puede tener mas de 50 caracteres")
      } else {
        setInvalid(false)
        setErrorMessage("")
      }

      const data = {
        "description": description
      }
      sendDataCategoryUnit(data)
    }, [description]);

  return (
    <div>
      <Input value={description} type='text' label="Description" isRequired isInvalid={invalid} errorMessage={errorMessage} onChange={(e) => setDescription(e.target.value)} />
    </div>
  )
}

export default ModalPostCategoryUnit