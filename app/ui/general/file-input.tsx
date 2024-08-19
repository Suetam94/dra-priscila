'use client'

import React, { useState } from 'react'
import { GooglePhotosLogo } from '@phosphor-icons/react'

interface FileInputProps {
  onChange: (file: File | null) => void
  disabled?: boolean
}

const FileInput = ({ onChange, disabled = false }: FileInputProps): React.JSX.Element => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setSelectedFile(file)
    onChange(file)

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
      <label className="w-full flex flex-col items-center px-4 py-6 bg-base-gray text-base-blue rounded-lg shadow-lg tracking-wide uppercase border border-base-gray cursor-pointer hover:bg-base-pink hover:text-white transition duration-300 ease-in-out">
        <GooglePhotosLogo className="w-10 h-10 mb-2" />
        <span className="text-base leading-normal">Selecione uma imagem</span>
        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={disabled} />
      </label>
      {preview && (
        <div className="mt-4">
          <p className="text-base-gray mb-2">Pré-visualização:</p>
          <img src={preview} alt="Pré-visualização da imagem" className="rounded-lg shadow-lg max-w-xs" />
        </div>
      )}
      {selectedFile && (
        <p className="mt-2 text-base-blue">Arquivo selecionado: {selectedFile.name}</p>
      )}
    </div>
  )
}

export default FileInput
