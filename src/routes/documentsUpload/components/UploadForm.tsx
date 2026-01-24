import FormFactory from '@/components/formComponent/formFactory';
import { useFilesHandler } from '@/hooks/useFilesHandler';
import { FilesUploadRequest } from '@/models/dto/filesUploadRequest';
import { newFileModel } from '@/models/forms/fileUpload';
import { useToken } from '@/stores/tokens/TokenStore';
import { useState } from 'react';

const documentsList = [
  'Documento de identidad', 
  'Certificación Bancaria',
  'Factura de servicio a tu nombre',
];

const UploadForm = ({ setStatus, setSuccess, userId }: {
  setStatus: React.Dispatch<React.SetStateAction<'idle'|'loading'|'error'|'success'>>, setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
  userId: string,
}) => {
  const [formVersion, setFormVersion] = useState(0);
  const { uploadMultiple } = useFilesHandler();
  const token: any = useToken();


  const uploadFiles = async ({ files }: { files: any[]}) => {
    setStatus('loading');
    const data: FilesUploadRequest = {
      'user': { 'userId': userId },
      'files': files,
    }
    const { tokenData } = token;

    uploadMultiple(data, tokenData.access_token!)
    .then(() => {
      setFormVersion(formVersion + 1);
      setSuccess(true);
      setStatus('idle');
    })
    .catch(() => {
      setStatus('error');
    });
  };

  return(
    <div className="documents-upload__wrap">
      <h1 className='u-center-text heading-primary'>Carga tus documentos</h1>
      <div className='documents-upload__list-box'>
        {documentsList.map((doc, i) => 
          <p 
            className='paragraph documents-upload__doc-list'
            key={i+doc}
          >
            <strong>{i+1}.</strong> {doc}
          </p>
        )}
      </div>  
      <div className="u-mt-10">
        <FormFactory
          key={formVersion}
          base={newFileModel}
          formMethod={uploadFiles}
          submitLabel="Guardar archivos"
        />
      </div>
    </div>
  )
}

export default UploadForm; 
