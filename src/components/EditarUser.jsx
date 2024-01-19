// ProfileEditor.js

import React, { useState,  useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMapMarkerAlt, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/images/descargar.jpg';
import Map from './Map';

const ProfileEditor = () => {
 
  const [isHovered, setIsHovered] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const [isEditing, setIsEditing] = useState(false); 
  const [isModalEnabled, setIsModalEnabled] = useState(true);


  const [ubicacion, setUbicacion] = useState('');

  const [ubicacionInput, setUbicacionInput] = useState('');

  // Esta función se llama cuando se selecciona una nueva ubicación en el mapa
  const handleUbicacionChange = (nuevaUbicacion) => {
    // Actualiza el estado de ubicacion y el input correspondiente
    setUbicacion(nuevaUbicacion);
    setUbicacionInput(nuevaUbicacion);
  };



  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const nombreUsuario = localStorage.getItem('username');
  
    if (nombreUsuario) {
      fetch(`http://127.0.0.1:8000/Login/obtener_usuario/${nombreUsuario}/`)
        .then(response => response.json())
        .then(data => {
          setUserData(data.usuario);
        })
        .catch(error => console.error('Error al obtener datos del usuario:', error));
    } else {
      console.error('Nombre de usuario no encontrado en localStorage');
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setSelectedImage(URL.createObjectURL(file));
      }
    },
  });
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleMarkerClick = () => {
    if (isEditing && isModalEnabled) {
    setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const toggleShowPassword = (passwordType) => {
    switch (passwordType) {
      case 'current':
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case 'new':
        setShowNewPassword(!showNewPassword);
        break;
      case 'repeat':
        setShowRepeatPassword(!showRepeatPassword);
        break;
      default:
        break;
    }
  };
  return (
    
    <div className="flex flex-col md:flex-row bg-gray-200">
    <div className="md:w-1/3 flex flex-col items-center bg-white p-8 rounded-lg shadow-md">
      <div className='bg-gray-300 p-20 rounded-xl shadow-lg'>
        <div className="mb-8 relative " {...getRootProps()}>
      
          <div
            className={`w-40 h-40 rounded-full  overflow-hidden cursor-pointer transition-transform ${
              isHovered ? 'transform scale-105' : ''
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
      
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Foto de perfil"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center absolute top-0 left-0">
                   <FontAwesomeIcon icon={faUser} size="3x" className="text-gray-500" />
                </div>
              )}
      
            {!selectedImage && (
              <div className="flex items-center justify-center w-full h-full bg-gray-400 text-gray-500 text-xs">
                
              </div>
            )}
           
          </div>
          <input {...getInputProps()} />
        </div>

       
        <div>
         
          {isHovered && (
            <div className="ml-3  text-gray-500  absolute  ">
              Cambiar foto de perfil
            </div>
          )}
     
        </div>

   {/* Contenedor para los botones */}
<div className="flex flex-col items-center mt-28">
  <div className="mb-4 mt-28">
    <button
      class="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
      onClick={handleEditClick}
    >
      Editar Información
    </button>
  </div>
  <div>
    <button
      class="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium 
      uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] 
      transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),
      0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 
      focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] 
      focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),
      0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] 
      dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] 
      dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] 
      dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
      onClick={() => console.log("Editar Contraseña")}
    >
      Editar Contraseña
    </button>
  </div>
  </div>
  </div>
 
  
</div>
    
       
     
      
      
    <div className="container mx-auto p-4">
     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
       {/* Formulario 1 */}
       <div className="mb-4">
       <div className="bg-gray-300 p-4 mb-6 rounded text-center">
          <h2 className="text-xl font-bold mb-2">Datos Generales</h2>
        </div>
        
         <form>
         <div className="grid grid-cols-1 md:grid-cols-1 gap-4 max-w-md mx-auto p-4 rounded bg-gray-100 mb-6">
          
        <div>
          
            <label htmlFor="nombres" className="text-sm text-gray-500 mb-1">
              Nombres
            </label>
            <input type="text" id="nombres" className="p-2 border border-gray-300 rounded w-full"
            value={userData?.snombre || ''} // Mostrar el valor del nombre del usuario
            readOnly={!isEditing}
            onChange={(e) => isEditing && setUserData({ ...userData, snombre: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="apellidos" className="text-sm text-gray-500 mb-1">
              Apellidos
            </label>
            <input type="text" id="apellidos" className="p-2 border border-gray-300 rounded w-full" 
            value={userData?.capellido||''}
            readOnly={!isEditing}
            onChange={(e) => isEditing && setUserData({ ...userData, capellido: e.target.value })}/>
          </div>
          <div>
            <label htmlFor="telefono" className="text-sm text-gray-500 mb-1">
              Teléfono
            </label>
            <input type="text" id="telefono" className="p-2 border border-gray-300 rounded w-full" 
            value={userData?.telefono||''}
            readOnly={!isEditing}
            onChange={(e) => isEditing && setUserData({ ...userData, telefono: e.target.value })}/>
          </div>
          
          <div >
            <label htmlFor="ubicacion" className="text-sm text-gray-500">
              Ubicación
            </label>
            <div className="flex items-center">
              <input type="text" id="ubicacion" className="p-2 border border-gray-300 rounded w-full" 
              value={ubicacionInput}
              readOnly />
              <div className="w-7">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-gray-500 cursor-pointer text-lg"
                  onClick={handleMarkerClick}
                />
              </div>
            </div>
            
          </div>
          
          
       
          </div>
        
         </form>
          
       </div>

       {/* Formulario 2 */}
       <div className="mb-4">
       <div className="bg-gray-300 p-4 mb-6 rounded text-center">
          <h2 className="text-xl font-bold mb-2">Datos Opcionales</h2>
        </div>
         <form>
         <div className="grid grid-cols-1 md:grid-cols-1 gap-4 max-w-md mx-auto p-4 rounded bg-gray-100 mb-6">
          <div>
            <label htmlFor="razonSocial" className="text-sm text-gray-500 mb-1">
              Razón Social
            </label>
            <input
              type="text"
              id="razonSocial"
              className="p-2 border border-gray-300 rounded w-full"
              value={userData?.razon_social||''}
              readOnly={!isEditing}
              onChange={(e) => isEditing && setUserData({ ...userData, razon_social: e.target.value })}/>
          </div>
          <div>
            <label htmlFor="ruc" className="text-sm text-gray-500 mb-1">
              Identificacion
            </label>
            <input type="text" id="ruc" className="p-2 border border-gray-300 rounded w-full" 
            value={userData?.ruc_cedula||''}
            readOnly={!isEditing}
            onChange={(e) => isEditing && setUserData({ ...userData, ruc_cedula: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="ubicacion1" className="text-sm text-gray-500 mb-1">
              Ubicación 1
            </label>
            <div className="flex items-center">
              <input
                type="text"
                id="ubicacion1"
                className="p-2 border border-gray-300 rounded w-full"
                readOnly
              />
              <div className="w-7">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-gray-500 cursor-pointer text-lg"
                  onClick={handleMarkerClick}
                />
              </div>
            </div>
          </div>
 
          <div>
            <label htmlFor="ubicacion2" className="text-sm text-gray-500 mb-1">
              Ubicación 2
            </label>
            <div className="flex items-center">
              <input
                type="text"
                id="ubicacion2"
                className="p-2 border border-gray-300 rounded w-full"
                readOnly
              />
              <div className="w-7">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-gray-500 cursor-pointer text-lg"
                  onClick={handleMarkerClick}
                />
              </div>
            </div>
          </div>
        </div>
         </form>
       </div>
       {isEditing && (
             <div className="mt-4">
             
             <button
               className="bg-blue-500 text-white px-4 py-2 rounded"
               onClick={handleSaveClick}
             >
               Guardar Cambios
             </button>
                
           </div>
           )}
     </div>

     {/* Formulario 3 debajo de los dos primeros */}
     <div className="mt-8">
     <div className="bg-gray-300 p-4 mb-6 rounded text-center">
          <h2 className="text-xl font-bold mb-2">Editar Contraseña</h2>
      </div>
       <form>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto p-4 rounded bg-gray-100 mb-6">
          <div>
            <label htmlFor="currentPassword" className="text-sm text-gray-500 mb-1">
              Contraseña Actual
            </label>
            <div className="flex items-center">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                id="currentPassword"
                className="p-2 border border-gray-300 rounded w-full"
              />
              <div className="w-7">
                <FontAwesomeIcon
                  icon={showCurrentPassword ? faEye : faEyeSlash}
                  className="text-gray-500 cursor-pointer text-lg"
                  onClick={() => toggleShowPassword('current')}
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="newPassword" className="text-sm text-gray-500 mb-1">
              Contraseña Nueva
            </label>
            <div className="flex items-center">
              <input
                type={showNewPassword ? 'text' : 'password'}
                id="newPassword"
                className="p-2 border border-gray-300 rounded w-full"
              />
              <div className="w-7">
                <FontAwesomeIcon
                  icon={showNewPassword ? faEye : faEyeSlash}
                  className="text-gray-500 cursor-pointer text-lg"
                  onClick={() => toggleShowPassword('new')}
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="repeatPassword" className="text-sm text-gray-500 mb-1">
              Repetir Contraseña Nueva
            </label>
            <div className="flex items-center">
              <input
                type={showRepeatPassword ? 'text' : 'password'}
                id="repeatPassword"
                className="p-2 border border-gray-300 rounded w-full"
              />
              <div className="w-7">
                <FontAwesomeIcon
                  icon={showRepeatPassword ? faEye : faEyeSlash}
                  className="text-gray-500 cursor-pointer text-lg"
                  onClick={() => toggleShowPassword('repeat')}
                />
              </div>
            </div>
          </div>
        </div>
       </form>
     </div>
   </div>

   {/* Modal para Ubicación */}
   {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded w-2/3">
            <Map setUbicacion={setUbicacion} />
            <button onClick={closeModal}>Cerrar modal</button>
          </div>
        </div>
      )}
    </div>
     
  
    
  );
};

export default ProfileEditor;
