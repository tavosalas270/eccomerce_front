"use client"
import React, {useState} from 'react'
import ModalEditCategoryUnit from './modal/modalEditCategoryUnit';
import ModalPostCategoryUnit from './modal/modalPostCategoryUnit';
import ModalEditIndicators from './modal/modalEditIndicators';
import ModalPostIndicators from './modal/modalPostIndicators';
import { postCategories, updateCategories, deleteCategories, postUnits, updateUnits, deleteUnits, 
  postIndicators, updateIndicators, deleteIndicators } from '@/models/products';
import { addCategories, addUnits, addIndicators } from '@/redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Modal, ModalContent, ModalHeader, 
  ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

function Selected({title, columns, values}) {

  const dispatch = useDispatch()

  const controlProducts = useSelector((state) => state.product)

  const config = {
    headers: {
      'Authorization': 'Bearer ' + Cookies.get("token")
    }
  }

  const {isOpen, onOpen, onClose} = useDisclosure();

  const [metodo, setMetodo] = useState("");
  const [dataSelected, setDataSelected] = useState({});
  const [optionSelected, setOptionSelected] = useState({});
  const [dataSend, setDataSend] = useState({});

  const [dataInvalida, setDataInvalida] = useState(false);

  const handleOpenPostCategoryUnit = (metodo) => {
    setMetodo(metodo)
    onOpen();
  }

  const handleOpenEditCategoryUnit = (item, metodo) => {
    setMetodo(metodo)
    setDataSelected(item)
    onOpen();
  }

  const handleOpenPostIndicator = (metodo) => {
    setMetodo(metodo)
    onOpen();
  }

  const handleOpenEditIndicator = (item, metodo) => {
    setMetodo(metodo)
    const filtered = controlProducts.listCategories.filter((category) => category.description === item.category_product)
    setOptionSelected(filtered[0])
    setDataSelected(item)
    onOpen();
  }

  const sendDataCategoryUnit = (data) => {
    setDataSend(data)
    if (data.description.length < 1) {
      setDataInvalida(true)
    } else if (data.description.length > 50) {
      setDataInvalida(true)
    } else {
      setDataInvalida(false)
    }
  }

  const sendDataIndicators = (data) => {
    setDataSend(data)
  }

  function enviarNuevoCategoryUnit() {
    if (title === "Category") {
      postCategories(dataSend, config).then((response) => {
        dispatch(addCategories(response.data))
        onClose()
      }).catch(error => {})
    } else {
      postUnits(dataSend, config).then((response) => {
        dispatch(addUnits(response.data))
        onClose()
      }).catch(error => {})
    }
  }

  function enviarCategoryUnitActualizada() {
    if (title === "Category") {
      updateCategories(dataSend, config).then((response) => {
        const newIndicators = controlProducts.listIndicators.map((obj) => {
          if (obj.category_product === dataSelected.description) {
            return {...obj, category_product: dataSend.description};
          } else {
            return obj;
          }
        })
        dispatch(addCategories(response.data))
        dispatch(addIndicators(newIndicators))
        onClose()
      }).catch(error => {})
    } else {
      updateUnits(dataSend, config).then((response) => {
        dispatch(addUnits(response.data))
        onClose()
      }).catch(error => {})
    }
  }

  function deleteCategoryUnit(item) {
    Swal.fire({
      title: "¿Estas seguro de querer borrar este registro?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      confirmButtonColor: "rgb(248 113 113)",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed && title === "Category") {
        deleteCategories(item.id,config).then((response) => {
          const newIndicators = controlProducts.listIndicators.filter((obj) => obj.category_product !== item.description)
          dispatch(addCategories(response.data))
          dispatch(addIndicators(newIndicators))
          Swal.fire({
            icon: "success",
            title: "Registro eliminado correctamente",
          });
        }).catch(error => {})
      } else {
        deleteUnits(item.id, config).then((response) => {
          dispatch(addUnits(response.data))
          Swal.fire({
            icon: "success",
            title: "Registro eliminado correctamente",
          });
        }).catch(error => {})
      }
    });
  }

  function enviarNuevoIndicator() {
    postIndicators(dataSend, config).then((response) => {
      dispatch(addIndicators(response.data))
      onClose()
    }).catch(error => {})
  }

  function enviarIndicatorActualizado() {
    updateIndicators(dataSend, config).then((response) => {
      dispatch(addIndicators(response.data))
      onClose()
    }).catch(error => {})
  }

  function deleteIndicator(item) {
    Swal.fire({
      title: "¿Estas seguro de querer borrar este registro?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      confirmButtonColor: "rgb(248 113 113)",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteIndicators(item.id, config).then((response) => {
          dispatch(addIndicators(response.data))
          Swal.fire({
            icon: "success",
            title: "Registro eliminado correctamente",
          });
        }).catch(error => {})
      }
    });
  }

  return (
    <div className='flex flex-col w-full h-full gap-y-2'>
      <Table aria-label="Productos">
        <TableHeader>
          {columns.map((item, index) => (
            <TableColumn key={index} className='text-center'>{item}</TableColumn>
          ))}
          <TableColumn className='text-center'>OPTIONS</TableColumn>
        </TableHeader>
        {title !== "Indicator" ? (
          <TableBody>
            {values.map((item, index) => (
              <TableRow key={index.toString()}>
                  <TableCell className='text-center'>{item.id}</TableCell>
                  <TableCell className='text-center'>{item.description}</TableCell>
                  <TableCell>
                    <div className='flex justify-center w-full gap-2'>
                      <Button className='w-32 bg-red-400 font-semibold' onPress={() => deleteCategoryUnit(item)}>Eliminar</Button>
                      <Button className='w-32 bg-blue-400 font-semibold' onPress={() => handleOpenEditCategoryUnit(item, "edit")}>Actualizar</Button>
                    </div>
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ):(
          <TableBody>
            {values.map((item, index) => (
              <TableRow key={index.toString()}>
                  <TableCell className='text-center'>{item.id}</TableCell>
                  <TableCell className='text-center'>{item.descount_value}</TableCell>
                  <TableCell className='text-center'>{item.category_product}</TableCell>
                  <TableCell>
                    <div className='flex justify-center w-full gap-2'>
                      <Button className='w-32 bg-red-400 font-semibold' onPress={() => deleteIndicator(item)}>Eliminar</Button>
                      <Button className='w-32 bg-blue-400 font-semibold' onPress={() => handleOpenEditIndicator(item, "edit")}>Actualizar</Button>
                    </div>
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
      <div className='flex flex-row justify-end'>
        <Button className='w-40 bg-green-400 font-semibold' onClick={title !== "Indicator" ? () => handleOpenPostCategoryUnit("post") : () => handleOpenPostIndicator("post")}>Añadir {title}</Button>
      </div>

      <Modal size="lg" isOpen={isOpen} onClose={onClose}>
       <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Actualizar {title}</ModalHeader>
            <ModalBody>
              {title !== "Indicator" ? (
                <>
                  {metodo === "post" ? (
                    <ModalPostCategoryUnit sendDataCategoryUnit={sendDataCategoryUnit} /> 
                  ) : (
                    <ModalEditCategoryUnit dataSelected={dataSelected} sendDataCategoryUnit={sendDataCategoryUnit} />
                  )}
                </>
                
              ):(
                <>
                  {metodo === "post" ? (
                      <ModalPostIndicators categories={controlProducts.listCategories} sendDataIndicators={sendDataIndicators} /> 
                    ) : (
                      <ModalEditIndicators categories={controlProducts.listCategories} optionSelected={optionSelected} dataSelected={dataSelected} sendDataIndicators={sendDataIndicators} />
                  )}
                </>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>Close</Button>
              {metodo === "post" ? (
                <Button isDisabled={title !== "Indicator" ? dataInvalida : false} className='w-32 bg-blue-400 font-semibold' onPress={title !== "Indicator" ? enviarNuevoCategoryUnit : enviarNuevoIndicator}>Guardar</Button>
              ) : (
                <Button isDisabled={title !== "Indicator" ? dataInvalida : false} className='w-32 bg-blue-400 font-semibold' onPress={title !== "Indicator" ? enviarCategoryUnitActualizada : enviarIndicatorActualizado}>Enviar</Button>
              )}
            </ModalFooter>
          </>
        )}
       </ModalContent>
      </Modal>
    </div>
  )
}

export default Selected