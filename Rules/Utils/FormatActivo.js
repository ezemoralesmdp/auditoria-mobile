/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function FormatActivo(clientAPI) {
    // Obtener el valor del campo 'Activo'
    let activo = clientAPI.binding.ACTIVO;

    // Retornar 'Activo' si es true, de lo contrario 'Inactivo'
    return activo ? 'Activo' : 'Inactivo';
}
