var clientAPI;

/**
 * Esta función convierte el valor booleano de 'Activo' en un texto legible.
 * @param {IClientAPI} clientAPI
 */
export default function FormatActivo(clientAPI) {
    // Obtener el valor del campo 'Activo'
    let activo = clientAPI.binding.Activo;

    // Retornar 'Activo' si es true, de lo contrario 'Inactivo'
    return activo ? 'Activo' : 'Inactivo';
}
