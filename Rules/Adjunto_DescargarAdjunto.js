/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Adjunto_DescargarAdjunto(clientAPI) {
    // Get the file bytes from the binding
    let archivoBytes = clientAPI.binding.Archivo;

    // Name of the file to download, you could get it from the binding or another field
    let nombreArchivo = clientAPI.binding.NombreArchivo || 'archivo.bin';

    // Create a Blob from the bytes
    let archivoBlob = new Blob([archivoBytes], { type: 'application/octet-stream' });

    // Create a URL for the Blob
    let url = URL.createObjectURL(archivoBlob);

    // Create a download link
    let a = document.createElement('a');
    a.href = url;
    a.download = nombreArchivo;

    // Simulate a click on the link to start the download
    a.click();

    // Release the Blob URL
    URL.revokeObjectURL(url);
}
