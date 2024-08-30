(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./build.definitions/AuditoriaMobile/i18n/i18n.properties":
/*!****************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/i18n/i18n.properties ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Rules/Adjunto_DescargarAdjunto.js":
/*!*****************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Rules/Adjunto_DescargarAdjunto.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Adjunto_DescargarAdjunto)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function Adjunto_DescargarAdjunto(clientAPI) {
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


/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Rules/Application/AppUpdateFailure.js":
/*!*********************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Rules/Application/AppUpdateFailure.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateFailure)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function AppUpdateFailure(clientAPI) {
    let result = clientAPI.actionResults.AppUpdate.error.toString();
    var message;
    console.log(result);
    if (result.startsWith('Error: Uncaught app extraction failure:')) {
        result = 'Error: Uncaught app extraction failure:';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body: 404 Not Found: Requested route')) {
        result = 'Application instance is not up or running';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body')) {
        result = 'Service instance not found.';
    }

    switch (result) {
        case 'Service instance not found.':
            message = 'Mobile App Update feature is not assigned or not running for your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response Error Response Status: 404 | Body: Failed to find a matched endpoint':
            message = 'Mobile App Update feature is not assigned to your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response failed: Error: Optional(OAuth2Error.tokenRejected: The newly acquired or refreshed token got rejected.)':
            message = 'The Mobile App Update feature is not assigned to your application or there is no Application metadata deployed. Please check your application in Mobile Services and try again.';
            break;
        case 'Error: Uncaught app extraction failure:':
            message = 'Error extracting metadata. Please redeploy and try again.';
            break;
        case 'Application instance is not up or running':
            message = 'Communication failure. Verify that the BindMobileApplicationRoutesToME Application route is running in your BTP space cockpit.';
            break;
        default:
            message = result;
            break;
    }
    return clientAPI.getPageProxy().executeAction({
        "Name": "/AuditoriaMobile/Actions/Application/AppUpdateFailureMessage.action",
        "Properties": {
            "Duration": 0,
            "Message": message
        }
    });
}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Rules/Application/AppUpdateSuccess.js":
/*!*********************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Rules/Application/AppUpdateSuccess.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateSuccess)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function sleep(ms) {
    return (new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve();
        }, ms);
    }));
}
function AppUpdateSuccess(clientAPI) {
    var message;
    // Force a small pause to let the progress banner show in case there is no new version available
    return sleep(500).then(function() {
        let result = clientAPI.actionResults.AppUpdate.data;
        console.log(result);

        let versionNum = result.split(': ')[1];
        if (result.startsWith('Current version is already up to date')) {
            return clientAPI.getPageProxy().executeAction({
                "Name": "/AuditoriaMobile/Actions/Application/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Message": `Ya estás usando la última versión: ${versionNum}`,
                    "NumberOfLines": 2
                }
            });
        } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
            message = 'No se encontraron metadatos de la aplicación. Implemente su aplicación y vuelva a intentarlo.';
            return clientAPI.getPageProxy().executeAction({
                "Name": "/AuditoriaMobile/Actions/Application/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Duration": 5,
                    "Message": message,
                    "NumberOfLines": 2
                }
            });
        }
    });
}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Rules/Application/ClientIsMultiUserMode.js":
/*!**************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Rules/Application/ClientIsMultiUserMode.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ClientIsMultiUserMode)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ClientIsMultiUserMode(clientAPI) {
    return clientAPI.isAppInMultiUserMode();
}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Rules/Application/GetClientSupportVersions.js":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Rules/Application/GetClientSupportVersions.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetClientSupportVersions)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function GetClientSupportVersions(clientAPI) {
    let versionInfo = clientAPI.getVersionInfo();
    let versionStr = '';
    Object.keys(versionInfo).forEach(function(key, index) {
        // key: the name of the object key
        // index: the ordinal position of the key within the object
        //console.log(`Key: ${key}   Index: ${index}`);
        if (key != 'Application Version') {
            versionStr += `${key}: ${versionInfo[key]}\n`;
        }
    });
    return versionStr;
}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Rules/Application/GetClientVersion.js":
/*!*********************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Rules/Application/GetClientVersion.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetClientVersion)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function GetClientVersion(clientAPI) {
    let versionInfo = clientAPI.getVersionInfo();
    if (versionInfo.hasOwnProperty('Application Version')) {
        return versionInfo['Application Version'];
    }
}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Rules/Application/OnWillUpdate.js":
/*!*****************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Rules/Application/OnWillUpdate.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OnWillUpdate)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OnWillUpdate(clientAPI) {
    return clientAPI.executeAction('/AuditoriaMobile/Actions/Application/OnWillUpdate.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/AuditoriaMobile/Actions/Auditoria/Service/CloseOffline.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Offline Odata Close Failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Rules/Application/ResetAppSettingsAndLogout.js":
/*!******************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Rules/Application/ResetAppSettingsAndLogout.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResetAppSettingsAndLogout)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ResetAppSettingsAndLogout(clientAPI) {
    let logger = clientAPI.getLogger();
    let platform = clientAPI.nativescript.platformModule;
    let appSettings = clientAPI.nativescript.appSettingsModule;
    var appId;
    if (platform && (platform.isIOS || platform.isAndroid)) {
        appId = clientAPI.evaluateTargetPath('#Application/#AppData/MobileServiceAppId');
    } else {
        appId = 'WindowsClient';
    }
    try {
        // Remove any other app specific settings
        appSettings.getAllKeys().forEach(key => {
            if (key.substring(0, appId.length) === appId) {
                appSettings.remove(key);
            }
        });
    } catch (err) {
        logger.log(`ERROR: AppSettings cleanup failure - ${err}`, 'ERROR');
    } finally {
        // Logout 
        return clientAPI.getPageProxy().executeAction('/AuditoriaMobile/Actions/Application/Reset.action');
    }
}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js":
/*!************************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CheckForSyncError)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} context
 */
function CheckForSyncError(context) {
    context.count('/AuditoriaMobile/Services/Auditoria.service', 'ErrorArchive', '').then(errorCount => {
        if (errorCount > 0) {
            return context.getPageProxy().executeAction('/AuditoriaMobile/Actions/ErrorArchive/ErrorArchive_SyncFailure.action').then(function() {
                return Promise.reject(false);
            });
        }
    });
}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Rules/ErrorArchive/ErrorArchive_DecideWhichEditPage.js":
/*!**************************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Rules/ErrorArchive/ErrorArchive_DecideWhichEditPage.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ErrorArchive_DecideWhichEditPage)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ErrorArchive_DecideWhichEditPage(clientAPI) {
    // Current binding's root is the errorArchiveEntity:
    let errorArchiveEntity = clientAPI.binding;

    // Get the affectedEntity object out of it
    let affectedEntity = errorArchiveEntity.AffectedEntity;

    console.log("La entidad afectada es:");
    console.log(affectedEntity);

    let targetAction = null;
    let id = affectedEntity["@odata.id"]; // e.g. PurchaseOrderHeaders(12345)
    let affectedEntityType = "Conjunto de entidades desconocidas"; // By default it's unknown type

    if (id.indexOf("(") > 0) {
        // Extracting the entity set type from @odata.id e.g. PurchaseOrderHeaders
        var patt = /\/?(.+)\(/i;
        var result = id.match(patt);
        affectedEntityType = result[1];
    }

    console.log("Affected Entity Type Is:");
    console.log(affectedEntityType);

    // Here we decide which action to call depends on which affectedEntityType is the affectedEntity
    // You can add more complex decision logic if needed
    switch (affectedEntityType) {
        case "Auditoria":
            targetAction = "/AuditoriaMobile/Actions/NavTo/Auditoria/NavToAuditoria_Edit.action";
            break;
        default:
            // Save the affected Entity's type in client data so that it can be displayed by the toast
            clientAPI.getPageProxy().getClientData().AffectedEntityType = affectedEntityType;
            // Show a toast for affectedEntityType that we do not handle yet
            return clientAPI.executeAction("/AuditoriaMobile/Actions/ErrorArchive/ErrorArchive_UnknownAffectedEntity.action");
    }

    if (targetAction) {
        let pageProxy = clientAPI.getPageProxy();

        // Set the affectedEntity object to root the binding context.
        pageProxy.setActionBinding(affectedEntity);

        // Note: doing 'return' here is important to chain the current context to the action.
        // Without the return the ActionBinding will not be passed to the action because it will consider
        // you are executing this action independent of the current context.
        return clientAPI.executeAction(targetAction);
    }
}


/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Rules/FormatActivo.rule.js":
/*!**********************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Rules/FormatActivo.rule.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormatActivo)
/* harmony export */ });

var clientAPI;

/**
 * Describe this function...\n@param {IClientAPI} clientAPI
 */
function FormatActivo(clientAPI) {
}


/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Rules/Logging/LogLevels.js":
/*!**********************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Rules/Logging/LogLevels.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LogLevels)
/* harmony export */ });
function LogLevels(clientAPI) {
    var levels = [];
    levels.push({
        'DisplayValue': 'Error',
        'ReturnValue': 'Error',
    });
    levels.push({
        'DisplayValue': 'Warning',
        'ReturnValue': 'Warn',
    });
    levels.push({
        'DisplayValue': 'Info',
        'ReturnValue': 'Info',
    });
    levels.push({
        'DisplayValue': 'Debug',
        'ReturnValue': 'Debug',
    });
    levels.push({
        'DisplayValue': 'Trace',
        'ReturnValue': 'Trace',
    });
    return levels;
}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Rules/Logging/SetTraceCategories.js":
/*!*******************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Rules/Logging/SetTraceCategories.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SetTraceCategories)
/* harmony export */ });
function SetTraceCategories(clientAPI) {
    var logger = clientAPI.getLogger();
    const sectionedTable = clientAPI.getPageProxy().getControl('SectionedTable');
    const fcsection = sectionedTable.getSection('FormCellSection0');
    const traceCategory = fcsection.getControl('TracingCategoriesListPicker');
    const odataTrace = fcsection.getControl('odataTrace');

    try {
        if (traceCategory.getValue()) {
            var values = traceCategory.getValue();
            var categories = [];

            if (values && values.length) {
                categories = values.map((value) => {
                    return 'mdk.trace.' + value.ReturnValue;
                });
            }
            clientAPI.setDebugSettings(odataTrace.getValue(), true, categories);
        }
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Rules/Logging/SetUserLogLevel.js":
/*!****************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Rules/Logging/SetUserLogLevel.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SetUserLogLevel)
/* harmony export */ });
function SetUserLogLevel(clientAPI) {
    try {
        if (clientAPI.getValue() && clientAPI.getValue()[0]) {
            var logger = clientAPI.getLogger();
            var listPickerValue = clientAPI.getValue()[0].ReturnValue;
            if (listPickerValue) {
                switch (listPickerValue) {
                    case 'Debug':
                        logger.setLevel('Debug');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Error':
                        logger.setLevel('Error');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Warn':
                        logger.setLevel('Warn');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Info':
                        logger.setLevel('Info');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Trace':
                        logger.setLevel('Trace');
                        ShowTraceOptions(clientAPI, true);
                        break;
                    default:
                        // eslint-disable-next-line no-console
                        console.log(`unrecognized key ${listPickerValue}`);
                }
                return listPickerValue;
            }
        }
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

function ShowTraceOptions(clientAPI, tracingEnabled) {
    let categories = clientAPI.getPageProxy().getControl('SectionedTable').getControl('TracingCategoriesListPicker');
    let odataTrace = clientAPI.getPageProxy().getControl('SectionedTable').getControl('odataTrace');

    categories.setVisible(tracingEnabled);
    odataTrace.setVisible(tracingEnabled);
}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Rules/Logging/ToggleLogging.js":
/*!**************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Rules/Logging/ToggleLogging.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ToggleLogging)
/* harmony export */ });
function ToggleLogging(clientAPI) {
    try {
        var logger = clientAPI.getLogger();
        const sectionedTable = clientAPI.getPageProxy().getControl('SectionedTable');
        const fcsection = sectionedTable.getSection('FormCellSection0');
        const enableLogSwitch = fcsection.getControl('EnableLogSwitch');
        const logLevelListPicker = fcsection.getControl('LogLevelListPicker');
        let switchValue = enableLogSwitch.getValue();
        if (switchValue) {
            logger.on();
            logLevelListPicker.setVisible(true);
            logLevelListPicker.setEditable(true);
            logLevelListPicker.redraw();
        } else {
            logger.off();
            logLevelListPicker.setEditable(false);
            logLevelListPicker.setVisible(false);
            logLevelListPicker.redraw();
        }
        return switchValue;
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Rules/Logging/TraceCategories.js":
/*!****************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Rules/Logging/TraceCategories.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TraceCategories)
/* harmony export */ });
function TraceCategories(clientAPI) {
    var categories = ['action', 'api', 'app', 'binding', 'branding',
        'core', 'i18n', 'lcms', 'logging', 'odata', 'onboarding', 'profiling', 'push',
        'restservice', 'settings', 'targetpath', 'ui'
    ];

    var values = [];
    categories.forEach((category) => {
        values.push({
            'DisplayValue': category,
            'ReturnValue': category,
        });
    });

    return values;
}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Rules/Logging/UserLogSetting.js":
/*!***************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Rules/Logging/UserLogSetting.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserLogSetting)
/* harmony export */ });
function UserLogSetting(clientAPI) {

    try {
        var logger = clientAPI.getLogger();

        const sectionedTable = clientAPI.getControl('SectionedTable');
        const fcsection = sectionedTable.getSection('FormCellSection0');
        const enableLogSwitch = fcsection.getControl('EnableLogSwitch');
        const logLevelListPicker = fcsection.getControl('LogLevelListPicker');
        const traceCategory = fcsection.getControl('TracingCategoriesListPicker');
        const odataTrace = fcsection.getControl('odataTrace');


        //Persist the user logging preferences
        if (logger) {
            console.log("in logger state");
            if (logger.isTurnedOn()) {
                if (enableLogSwitch) {
                    enableLogSwitch.setValue(true);
                }
                if (logLevelListPicker) {
                    logLevelListPicker.setEditable(true);
                }
            } else {
                if (enableLogSwitch) {
                    enableLogSwitch.setValue(false);
                }
                if (logLevelListPicker) {
                    logLevelListPicker.setEditable(false);
                }
            }
            var logLevel = logger.getLevel();
            if (logLevel) {
                if (logLevelListPicker) {
                    logLevelListPicker.setValue([logLevel]);
                }
            }
            if (logLevel === 'Trace') {
                traceCategory.setVisible(true);
                odataTrace.setVisible(true);
            }

            //Upon selecting a value in the List picker and clicking the back button 
            //will enable the onload page rule. This will set the selected value
            //in the control
            if (logLevelListPicker.getValue()[0]) {
                var returnValue = logLevelListPicker.getValue()[0].ReturnValue;
                if (returnValue) {
                    logLevelListPicker.setValue([returnValue]);
                    logger.setLevel(returnValue);
                }
            }
        }
    } catch (exception) {
        // eslint-disable-next-line no-console
        console.log(String(exception), 'Error User Logger could not be set');
    }
}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Rules/Messages/Auditoria/Auditoria_DeleteConfirmation.js":
/*!****************************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Rules/Messages/Auditoria/Auditoria_DeleteConfirmation.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Auditoria_DeleteConfirmation)
/* harmony export */ });
/**
 * Esta función arroja un mensaje de confirmación ante la eliminación de una entidad de tipo Auditoria.
 * @param {IClientAPI} clientAPI
 */
function Auditoria_DeleteConfirmation(clientAPI) {
    return clientAPI.executeAction('/AuditoriaMobile/Actions/Messages/Auditoria/Auditoria_DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/AuditoriaMobile/Actions/ABM/Auditoria/Auditoria_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Error al eliminar la auditoría ' + failure));
        } else {
            return Promise.reject('Eliminación de auditoría cancelada por el usuario.')
        }
    });
}


/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Rules/Messages/TipoAuditoria/TipoAuditoria_DeleteConfirmation.js":
/*!************************************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Rules/Messages/TipoAuditoria/TipoAuditoria_DeleteConfirmation.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TipoAuditoria_DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function TipoAuditoria_DeleteConfirmation(clientAPI) {
    return clientAPI.executeAction('/AuditoriaMobile/Actions/Messages/TipoAuditoria/TipoAuditoria_DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/AuditoriaMobile/Actions/ABM/TipoAuditoria/TipoAuditoria_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Error al eliminar el tipo de auditoría ' + failure));
        } else {
            return Promise.reject('Eliminación de tipo de auditoría cancelada por el usuario.')
        }
    });
}


/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Rules/NavToExternalSites/Emmsa/OpenEmmsaContacto.js":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Rules/NavToExternalSites/Emmsa/OpenEmmsaContacto.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OpenEmmsaContacto)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OpenEmmsaContacto(clientAPI) {
    // Get the Nativescript Utils Module
    const utilsModule = clientAPI.nativescript.utilsModule;

    return clientAPI.executeAction('/AuditoriaMobile/Actions/Confirmation.action').then((result) => {
        if (result.data) {
            // This will open SAP.com website
            return utilsModule.openUrl("https://www.emmsa.net/contacto/");
        } else {
            return Promise.reject('El usuario rechazo la acción.');
        }
    });
}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Rules/NavToExternalSites/Emmsa/OpenEmmsaOficial.js":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Rules/NavToExternalSites/Emmsa/OpenEmmsaOficial.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OpenEmmsaOficial)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OpenEmmsaOficial(clientAPI) {
    // Get the Nativescript Utils Module
    const utilsModule = clientAPI.nativescript.utilsModule;

    return clientAPI.executeAction('/AuditoriaMobile/Actions/Confirmation.action').then((result) => {
        if (result.data) {
            // This will open SAP.com website
            return utilsModule.openUrl("https://www.emmsa.net/");
        } else {
            return Promise.reject('El usuario rechazo la acción.');
        }
    });
}


/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Rules/NavToExternalSites/Ledesma/OpenLedesmaContacto.js":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Rules/NavToExternalSites/Ledesma/OpenLedesmaContacto.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OpenLedesmaContacto)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OpenLedesmaContacto(clientAPI) {
    // Get the Nativescript Utils Module
    const utilsModule = clientAPI.nativescript.utilsModule;

    return clientAPI.executeAction('/AuditoriaMobile/Actions/Confirmation.action').then((result) => {
        if (result.data) {
            // This will open SAP.com website
            return utilsModule.openUrl("https://www.ledesma.com.ar/contacto/");
        } else {
            return Promise.reject('El usuario rechazo la acción.');
        }
    });
}


/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Rules/NavToExternalSites/Ledesma/OpenLedesmaOficial.js":
/*!**************************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Rules/NavToExternalSites/Ledesma/OpenLedesmaOficial.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OpenLedesmaOficial)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OpenLedesmaOficial(clientAPI) {
    // Get the Nativescript Utils Module
    const utilsModule = clientAPI.nativescript.utilsModule;

    return clientAPI.executeAction('/AuditoriaMobile/Actions/Confirmation.action').then((result) => {
        if (result.data) {
            // This will open SAP.com website
            return utilsModule.openUrl("https://www.ledesma.com.ar/");
        } else {
            return Promise.reject('El usuario rechazo la acción.');
        }
    });
}


/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Rules/NavToExternalSites/SAP/OpenSAPMobileStart.js":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Rules/NavToExternalSites/SAP/OpenSAPMobileStart.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OpenSAPMobileStart)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OpenSAPMobileStart(clientAPI) {
    // Get the Nativescript Utils Module
    const utilsModule = clientAPI.nativescript.utilsModule;

    // Get the Nativescript Platform Module
    const platformModule = clientAPI.nativescript.platformModule;

    return clientAPI.executeAction('/AuditoriaMobile/Actions/Confirmation.action').then((result) => {
        if (result.data) {
            //This will open SAP Mobile Start app
            if (platformModule.isIOS) {
                return utilsModule.openUrl("com.sap.mobile.start://");
            } else if (platformModule.isAndroid) {
                return utilsModule.openUrl("com.sap.mobile.apps.sapstart://");
            }
        } else {
            return Promise.reject('El usuario rechazo la acción.');
        }
    });
}


/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Rules/NavToExternalSites/SAP/OpenSAPcom.js":
/*!**************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Rules/NavToExternalSites/SAP/OpenSAPcom.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OpenSAPcom)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OpenSAPcom(clientAPI) {
    // Get the Nativescript Utils Module
    const utilsModule = clientAPI.nativescript.utilsModule;

    return clientAPI.executeAction('/AuditoriaMobile/Actions/Confirmation.action').then((result) => {
        if (result.data) {
            // This will open SAP.com website
            return utilsModule.openUrl("https://www.sap.com");
        } else {
            return Promise.reject('El usuario rechazo la acción.');
        }
    });
}


/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Rules/Service/Initialize.js":
/*!***********************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Rules/Service/Initialize.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Initialize)
/* harmony export */ });
function Initialize(context) {

    // Perform pre data initialization task

    // Initialize all your Data sources
    let _Auditoria = context.executeAction('/AuditoriaMobile/Actions/Auditoria/Service/InitializeOffline.action');

    //You can add more service initialize actions here

    return Promise.all([_Auditoria]).then(() => {
        // After Initializing the DB connections

        // Display successful initialization  message to the user
        return context.executeAction({

            "Name": "/AuditoriaMobile/Actions/GenericToastMessage.action",
            "Properties": {
                "Message": "Servicios de Auditoria inicializados",
                "Animated": true,
                "Duration": 1,
                "IsIconHidden": true,
                "NumberOfLines": 1
            }
        });
    }).catch(() => {
        return false;
    });
}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Rules/Utils/FormatActivo.js":
/*!***********************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Rules/Utils/FormatActivo.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormatActivo)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function FormatActivo(clientAPI) {
    // Obtener el valor del campo 'Activo'
    let activo = clientAPI.binding.ACTIVO;

    // Retornar 'Activo' si es true, de lo contrario 'Inactivo'
    return activo ? 'Activo' : 'Inactivo';
}


/***/ }),

/***/ "./build.definitions/application-index.js":
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let application_app = __webpack_require__(/*! ./Application.app */ "./build.definitions/Application.app")
	let auditoriamobile_actions_abm_auditoria_auditoria_createentity_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/ABM/Auditoria/Auditoria_CreateEntity.action */ "./build.definitions/AuditoriaMobile/Actions/ABM/Auditoria/Auditoria_CreateEntity.action")
	let auditoriamobile_actions_abm_auditoria_auditoria_deleteentity_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/ABM/Auditoria/Auditoria_DeleteEntity.action */ "./build.definitions/AuditoriaMobile/Actions/ABM/Auditoria/Auditoria_DeleteEntity.action")
	let auditoriamobile_actions_abm_auditoria_auditoria_updateentity_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/ABM/Auditoria/Auditoria_UpdateEntity.action */ "./build.definitions/AuditoriaMobile/Actions/ABM/Auditoria/Auditoria_UpdateEntity.action")
	let auditoriamobile_actions_abm_tipoauditoria_tipoauditoria_deleteentity_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/ABM/TipoAuditoria/TipoAuditoria_DeleteEntity.action */ "./build.definitions/AuditoriaMobile/Actions/ABM/TipoAuditoria/TipoAuditoria_DeleteEntity.action")
	let auditoriamobile_actions_abm_tipoauditoria_tipoauditoria_updateentity_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/ABM/TipoAuditoria/TipoAuditoria_UpdateEntity.action */ "./build.definitions/AuditoriaMobile/Actions/ABM/TipoAuditoria/TipoAuditoria_UpdateEntity.action")
	let auditoriamobile_actions_adjunto_deleteconfirmation_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/Adjunto_DeleteConfirmation.action */ "./build.definitions/AuditoriaMobile/Actions/Adjunto_DeleteConfirmation.action")
	let auditoriamobile_actions_application_appupdate_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/Application/AppUpdate.action */ "./build.definitions/AuditoriaMobile/Actions/Application/AppUpdate.action")
	let auditoriamobile_actions_application_appupdatefailuremessage_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/Application/AppUpdateFailureMessage.action */ "./build.definitions/AuditoriaMobile/Actions/Application/AppUpdateFailureMessage.action")
	let auditoriamobile_actions_application_appupdateprogressbanner_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/Application/AppUpdateProgressBanner.action */ "./build.definitions/AuditoriaMobile/Actions/Application/AppUpdateProgressBanner.action")
	let auditoriamobile_actions_application_appupdatesuccessmessage_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/Application/AppUpdateSuccessMessage.action */ "./build.definitions/AuditoriaMobile/Actions/Application/AppUpdateSuccessMessage.action")
	let auditoriamobile_actions_application_logout_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/Application/Logout.action */ "./build.definitions/AuditoriaMobile/Actions/Application/Logout.action")
	let auditoriamobile_actions_application_navtoabout_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/Application/NavToAbout.action */ "./build.definitions/AuditoriaMobile/Actions/Application/NavToAbout.action")
	let auditoriamobile_actions_application_navtoactivitylog_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/Application/NavToActivityLog.action */ "./build.definitions/AuditoriaMobile/Actions/Application/NavToActivityLog.action")
	let auditoriamobile_actions_application_navtosupport_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/Application/NavToSupport.action */ "./build.definitions/AuditoriaMobile/Actions/Application/NavToSupport.action")
	let auditoriamobile_actions_application_onwillupdate_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/Application/OnWillUpdate.action */ "./build.definitions/AuditoriaMobile/Actions/Application/OnWillUpdate.action")
	let auditoriamobile_actions_application_reset_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/Application/Reset.action */ "./build.definitions/AuditoriaMobile/Actions/Application/Reset.action")
	let auditoriamobile_actions_application_resetmessage_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/Application/ResetMessage.action */ "./build.definitions/AuditoriaMobile/Actions/Application/ResetMessage.action")
	let auditoriamobile_actions_application_usermenupopover_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/Application/UserMenuPopover.action */ "./build.definitions/AuditoriaMobile/Actions/Application/UserMenuPopover.action")
	let auditoriamobile_actions_auditoria_service_closeoffline_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/Auditoria/Service/CloseOffline.action */ "./build.definitions/AuditoriaMobile/Actions/Auditoria/Service/CloseOffline.action")
	let auditoriamobile_actions_auditoria_service_closeofflinefailuremessage_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/Auditoria/Service/CloseOfflineFailureMessage.action */ "./build.definitions/AuditoriaMobile/Actions/Auditoria/Service/CloseOfflineFailureMessage.action")
	let auditoriamobile_actions_auditoria_service_closeofflinesuccessmessage_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/Auditoria/Service/CloseOfflineSuccessMessage.action */ "./build.definitions/AuditoriaMobile/Actions/Auditoria/Service/CloseOfflineSuccessMessage.action")
	let auditoriamobile_actions_auditoria_service_downloadoffline_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/Auditoria/Service/DownloadOffline.action */ "./build.definitions/AuditoriaMobile/Actions/Auditoria/Service/DownloadOffline.action")
	let auditoriamobile_actions_auditoria_service_downloadstartedmessage_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/Auditoria/Service/DownloadStartedMessage.action */ "./build.definitions/AuditoriaMobile/Actions/Auditoria/Service/DownloadStartedMessage.action")
	let auditoriamobile_actions_auditoria_service_initializeoffline_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/Auditoria/Service/InitializeOffline.action */ "./build.definitions/AuditoriaMobile/Actions/Auditoria/Service/InitializeOffline.action")
	let auditoriamobile_actions_auditoria_service_initializeofflinefailuremessage_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/Auditoria/Service/InitializeOfflineFailureMessage.action */ "./build.definitions/AuditoriaMobile/Actions/Auditoria/Service/InitializeOfflineFailureMessage.action")
	let auditoriamobile_actions_auditoria_service_syncfailuremessage_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/Auditoria/Service/SyncFailureMessage.action */ "./build.definitions/AuditoriaMobile/Actions/Auditoria/Service/SyncFailureMessage.action")
	let auditoriamobile_actions_auditoria_service_syncstartedmessage_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/Auditoria/Service/SyncStartedMessage.action */ "./build.definitions/AuditoriaMobile/Actions/Auditoria/Service/SyncStartedMessage.action")
	let auditoriamobile_actions_auditoria_service_uploadoffline_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/Auditoria/Service/UploadOffline.action */ "./build.definitions/AuditoriaMobile/Actions/Auditoria/Service/UploadOffline.action")
	let auditoriamobile_actions_closemodalpage_cancel_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/CloseModalPage_Cancel.action */ "./build.definitions/AuditoriaMobile/Actions/CloseModalPage_Cancel.action")
	let auditoriamobile_actions_closemodalpage_complete_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/CloseModalPage_Complete.action */ "./build.definitions/AuditoriaMobile/Actions/CloseModalPage_Complete.action")
	let auditoriamobile_actions_closepage_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/ClosePage.action */ "./build.definitions/AuditoriaMobile/Actions/ClosePage.action")
	let auditoriamobile_actions_confirmation_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/Confirmation.action */ "./build.definitions/AuditoriaMobile/Actions/Confirmation.action")
	let auditoriamobile_actions_errorarchive_errorarchive_syncfailure_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/ErrorArchive/ErrorArchive_SyncFailure.action */ "./build.definitions/AuditoriaMobile/Actions/ErrorArchive/ErrorArchive_SyncFailure.action")
	let auditoriamobile_actions_errorarchive_errorarchive_unknownaffectedentity_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/ErrorArchive/ErrorArchive_UnknownAffectedEntity.action */ "./build.definitions/AuditoriaMobile/Actions/ErrorArchive/ErrorArchive_UnknownAffectedEntity.action")
	let auditoriamobile_actions_errorarchive_navtoerrorarchive_detail_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/ErrorArchive/NavToErrorArchive_Detail.action */ "./build.definitions/AuditoriaMobile/Actions/ErrorArchive/NavToErrorArchive_Detail.action")
	let auditoriamobile_actions_errorarchive_navtoerrorarchive_list_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/ErrorArchive/NavToErrorArchive_List.action */ "./build.definitions/AuditoriaMobile/Actions/ErrorArchive/NavToErrorArchive_List.action")
	let auditoriamobile_actions_genericbannermessage_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/GenericBannerMessage.action */ "./build.definitions/AuditoriaMobile/Actions/GenericBannerMessage.action")
	let auditoriamobile_actions_genericmessagebox_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/GenericMessageBox.action */ "./build.definitions/AuditoriaMobile/Actions/GenericMessageBox.action")
	let auditoriamobile_actions_genericnavigation_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/GenericNavigation.action */ "./build.definitions/AuditoriaMobile/Actions/GenericNavigation.action")
	let auditoriamobile_actions_generictoastmessage_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/GenericToastMessage.action */ "./build.definitions/AuditoriaMobile/Actions/GenericToastMessage.action")
	let auditoriamobile_actions_logging_loguploadfailure_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/Logging/LogUploadFailure.action */ "./build.definitions/AuditoriaMobile/Actions/Logging/LogUploadFailure.action")
	let auditoriamobile_actions_logging_loguploadsuccessful_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/Logging/LogUploadSuccessful.action */ "./build.definitions/AuditoriaMobile/Actions/Logging/LogUploadSuccessful.action")
	let auditoriamobile_actions_logging_uploadlog_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/Logging/UploadLog.action */ "./build.definitions/AuditoriaMobile/Actions/Logging/UploadLog.action")
	let auditoriamobile_actions_logging_uploadlogprogress_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/Logging/UploadLogProgress.action */ "./build.definitions/AuditoriaMobile/Actions/Logging/UploadLogProgress.action")
	let auditoriamobile_actions_messages_auditoria_auditoria_deleteconfirmation_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/Messages/Auditoria/Auditoria_DeleteConfirmation.action */ "./build.definitions/AuditoriaMobile/Actions/Messages/Auditoria/Auditoria_DeleteConfirmation.action")
	let auditoriamobile_actions_messages_auditoria_createauditoriaentityfailuremessage_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/Messages/Auditoria/CreateAuditoriaEntityFailureMessage.action */ "./build.definitions/AuditoriaMobile/Actions/Messages/Auditoria/CreateAuditoriaEntityFailureMessage.action")
	let auditoriamobile_actions_messages_auditoria_deleteauditoriaentityfailuremessage_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/Messages/Auditoria/DeleteAuditoriaEntityFailureMessage.action */ "./build.definitions/AuditoriaMobile/Actions/Messages/Auditoria/DeleteAuditoriaEntityFailureMessage.action")
	let auditoriamobile_actions_messages_auditoria_updateauditoriaentityfailuremessage_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/Messages/Auditoria/UpdateAuditoriaEntityFailureMessage.action */ "./build.definitions/AuditoriaMobile/Actions/Messages/Auditoria/UpdateAuditoriaEntityFailureMessage.action")
	let auditoriamobile_actions_messages_tipoauditoria_deletetipoauditoriaentityfailuremessage_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/Messages/TipoAuditoria/DeleteTipoAuditoriaEntityFailureMessage.action */ "./build.definitions/AuditoriaMobile/Actions/Messages/TipoAuditoria/DeleteTipoAuditoriaEntityFailureMessage.action")
	let auditoriamobile_actions_messages_tipoauditoria_tipoauditoria_deleteconfirmation_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/Messages/TipoAuditoria/TipoAuditoria_DeleteConfirmation.action */ "./build.definitions/AuditoriaMobile/Actions/Messages/TipoAuditoria/TipoAuditoria_DeleteConfirmation.action")
	let auditoriamobile_actions_messages_tipoauditoria_updateauditoriaentityfailuremessage_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/Messages/TipoAuditoria/UpdateAuditoriaEntityFailureMessage.action */ "./build.definitions/AuditoriaMobile/Actions/Messages/TipoAuditoria/UpdateAuditoriaEntityFailureMessage.action")
	let auditoriamobile_actions_messages_tipoauditoria_updatetipoauditoriaentityfailuremessage_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/Messages/TipoAuditoria/UpdateTipoAuditoriaEntityFailureMessage.action */ "./build.definitions/AuditoriaMobile/Actions/Messages/TipoAuditoria/UpdateTipoAuditoriaEntityFailureMessage.action")
	let auditoriamobile_actions_navto_auditoria_navtoauditoria_create_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/NavTo/Auditoria/NavToAuditoria_Create.action */ "./build.definitions/AuditoriaMobile/Actions/NavTo/Auditoria/NavToAuditoria_Create.action")
	let auditoriamobile_actions_navto_auditoria_navtoauditoria_detail_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/NavTo/Auditoria/NavToAuditoria_Detail.action */ "./build.definitions/AuditoriaMobile/Actions/NavTo/Auditoria/NavToAuditoria_Detail.action")
	let auditoriamobile_actions_navto_auditoria_navtoauditoria_edit_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/NavTo/Auditoria/NavToAuditoria_Edit.action */ "./build.definitions/AuditoriaMobile/Actions/NavTo/Auditoria/NavToAuditoria_Edit.action")
	let auditoriamobile_actions_navto_auditoria_navtoauditoria_list_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/NavTo/Auditoria/NavToAuditoria_List.action */ "./build.definitions/AuditoriaMobile/Actions/NavTo/Auditoria/NavToAuditoria_List.action")
	let auditoriamobile_actions_navto_auditoria_navtoauditoria_table_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/NavTo/Auditoria/NavToAuditoria_Table.action */ "./build.definitions/AuditoriaMobile/Actions/NavTo/Auditoria/NavToAuditoria_Table.action")
	let auditoriamobile_actions_navto_tipoauditoria_navtotipoauditoria_edit_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/NavTo/TipoAuditoria/NavToTipoAuditoria_Edit.action */ "./build.definitions/AuditoriaMobile/Actions/NavTo/TipoAuditoria/NavToTipoAuditoria_Edit.action")
	let auditoriamobile_actions_navto_tipoauditoria_navtotipoauditoria_list_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/NavTo/TipoAuditoria/NavToTipoAuditoria_List.action */ "./build.definitions/AuditoriaMobile/Actions/NavTo/TipoAuditoria/NavToTipoAuditoria_List.action")
	let auditoriamobile_actions_navtotipoauditoria_detail_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/NavToTipoAuditoria_Detail.action */ "./build.definitions/AuditoriaMobile/Actions/NavToTipoAuditoria_Detail.action")
	let auditoriamobile_actions_onexistmessage_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/OnExistMessage.action */ "./build.definitions/AuditoriaMobile/Actions/OnExistMessage.action")
	let auditoriamobile_actions_pushregister_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/PushRegister.action */ "./build.definitions/AuditoriaMobile/Actions/PushRegister.action")
	let auditoriamobile_actions_pushregisterfailuremessage_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/PushRegisterFailureMessage.action */ "./build.definitions/AuditoriaMobile/Actions/PushRegisterFailureMessage.action")
	let auditoriamobile_actions_pushregistersuccessmessage_action = __webpack_require__(/*! ./AuditoriaMobile/Actions/PushRegisterSuccessMessage.action */ "./build.definitions/AuditoriaMobile/Actions/PushRegisterSuccessMessage.action")
	let auditoriamobile_globals_application_appdefinition_version_global = __webpack_require__(/*! ./AuditoriaMobile/Globals/Application/AppDefinition_Version.global */ "./build.definitions/AuditoriaMobile/Globals/Application/AppDefinition_Version.global")
	let auditoriamobile_globals_application_applicationname_global = __webpack_require__(/*! ./AuditoriaMobile/Globals/Application/ApplicationName.global */ "./build.definitions/AuditoriaMobile/Globals/Application/ApplicationName.global")
	let auditoriamobile_globals_application_supportemail_global = __webpack_require__(/*! ./AuditoriaMobile/Globals/Application/SupportEmail.global */ "./build.definitions/AuditoriaMobile/Globals/Application/SupportEmail.global")
	let auditoriamobile_globals_application_supportphone_global = __webpack_require__(/*! ./AuditoriaMobile/Globals/Application/SupportPhone.global */ "./build.definitions/AuditoriaMobile/Globals/Application/SupportPhone.global")
	let auditoriamobile_i18n_i18n_properties = __webpack_require__(/*! ./AuditoriaMobile/i18n/i18n.properties */ "./build.definitions/AuditoriaMobile/i18n/i18n.properties")
	let auditoriamobile_jsconfig_json = __webpack_require__(/*! ./AuditoriaMobile/jsconfig.json */ "./build.definitions/AuditoriaMobile/jsconfig.json")
	let auditoriamobile_pages_application_about_page = __webpack_require__(/*! ./AuditoriaMobile/Pages/Application/About.page */ "./build.definitions/AuditoriaMobile/Pages/Application/About.page")
	let auditoriamobile_pages_application_support_page = __webpack_require__(/*! ./AuditoriaMobile/Pages/Application/Support.page */ "./build.definitions/AuditoriaMobile/Pages/Application/Support.page")
	let auditoriamobile_pages_application_useractivitylog_page = __webpack_require__(/*! ./AuditoriaMobile/Pages/Application/UserActivityLog.page */ "./build.definitions/AuditoriaMobile/Pages/Application/UserActivityLog.page")
	let auditoriamobile_pages_auditoria_auditoria_create_page = __webpack_require__(/*! ./AuditoriaMobile/Pages/Auditoria/Auditoria_Create.page */ "./build.definitions/AuditoriaMobile/Pages/Auditoria/Auditoria_Create.page")
	let auditoriamobile_pages_auditoria_auditoria_detail_page = __webpack_require__(/*! ./AuditoriaMobile/Pages/Auditoria/Auditoria_Detail.page */ "./build.definitions/AuditoriaMobile/Pages/Auditoria/Auditoria_Detail.page")
	let auditoriamobile_pages_auditoria_auditoria_edit_page = __webpack_require__(/*! ./AuditoriaMobile/Pages/Auditoria/Auditoria_Edit.page */ "./build.definitions/AuditoriaMobile/Pages/Auditoria/Auditoria_Edit.page")
	let auditoriamobile_pages_auditoria_auditoria_list_page = __webpack_require__(/*! ./AuditoriaMobile/Pages/Auditoria/Auditoria_List.page */ "./build.definitions/AuditoriaMobile/Pages/Auditoria/Auditoria_List.page")
	let auditoriamobile_pages_auditoria_auditoria_table_page = __webpack_require__(/*! ./AuditoriaMobile/Pages/Auditoria/Auditoria_Table.page */ "./build.definitions/AuditoriaMobile/Pages/Auditoria/Auditoria_Table.page")
	let auditoriamobile_pages_errorarchive_errorarchive_detail_page = __webpack_require__(/*! ./AuditoriaMobile/Pages/ErrorArchive/ErrorArchive_Detail.page */ "./build.definitions/AuditoriaMobile/Pages/ErrorArchive/ErrorArchive_Detail.page")
	let auditoriamobile_pages_errorarchive_errorarchive_list_page = __webpack_require__(/*! ./AuditoriaMobile/Pages/ErrorArchive/ErrorArchive_List.page */ "./build.definitions/AuditoriaMobile/Pages/ErrorArchive/ErrorArchive_List.page")
	let auditoriamobile_pages_main_page = __webpack_require__(/*! ./AuditoriaMobile/Pages/Main.page */ "./build.definitions/AuditoriaMobile/Pages/Main.page")
	let auditoriamobile_pages_tipoauditoria_tipoauditoria_detail_page = __webpack_require__(/*! ./AuditoriaMobile/Pages/TipoAuditoria/TipoAuditoria_Detail.page */ "./build.definitions/AuditoriaMobile/Pages/TipoAuditoria/TipoAuditoria_Detail.page")
	let auditoriamobile_pages_tipoauditoria_tipoauditoria_edit_page = __webpack_require__(/*! ./AuditoriaMobile/Pages/TipoAuditoria/TipoAuditoria_Edit.page */ "./build.definitions/AuditoriaMobile/Pages/TipoAuditoria/TipoAuditoria_Edit.page")
	let auditoriamobile_pages_tipoauditoria_tipoauditoria_list_page = __webpack_require__(/*! ./AuditoriaMobile/Pages/TipoAuditoria/TipoAuditoria_List.page */ "./build.definitions/AuditoriaMobile/Pages/TipoAuditoria/TipoAuditoria_List.page")
	let auditoriamobile_rules_adjunto_descargaradjunto_js = __webpack_require__(/*! ./AuditoriaMobile/Rules/Adjunto_DescargarAdjunto.js */ "./build.definitions/AuditoriaMobile/Rules/Adjunto_DescargarAdjunto.js")
	let auditoriamobile_rules_application_appupdatefailure_js = __webpack_require__(/*! ./AuditoriaMobile/Rules/Application/AppUpdateFailure.js */ "./build.definitions/AuditoriaMobile/Rules/Application/AppUpdateFailure.js")
	let auditoriamobile_rules_application_appupdatesuccess_js = __webpack_require__(/*! ./AuditoriaMobile/Rules/Application/AppUpdateSuccess.js */ "./build.definitions/AuditoriaMobile/Rules/Application/AppUpdateSuccess.js")
	let auditoriamobile_rules_application_clientismultiusermode_js = __webpack_require__(/*! ./AuditoriaMobile/Rules/Application/ClientIsMultiUserMode.js */ "./build.definitions/AuditoriaMobile/Rules/Application/ClientIsMultiUserMode.js")
	let auditoriamobile_rules_application_getclientsupportversions_js = __webpack_require__(/*! ./AuditoriaMobile/Rules/Application/GetClientSupportVersions.js */ "./build.definitions/AuditoriaMobile/Rules/Application/GetClientSupportVersions.js")
	let auditoriamobile_rules_application_getclientversion_js = __webpack_require__(/*! ./AuditoriaMobile/Rules/Application/GetClientVersion.js */ "./build.definitions/AuditoriaMobile/Rules/Application/GetClientVersion.js")
	let auditoriamobile_rules_application_onwillupdate_js = __webpack_require__(/*! ./AuditoriaMobile/Rules/Application/OnWillUpdate.js */ "./build.definitions/AuditoriaMobile/Rules/Application/OnWillUpdate.js")
	let auditoriamobile_rules_application_resetappsettingsandlogout_js = __webpack_require__(/*! ./AuditoriaMobile/Rules/Application/ResetAppSettingsAndLogout.js */ "./build.definitions/AuditoriaMobile/Rules/Application/ResetAppSettingsAndLogout.js")
	let auditoriamobile_rules_errorarchive_errorarchive_checkforsyncerror_js = __webpack_require__(/*! ./AuditoriaMobile/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js */ "./build.definitions/AuditoriaMobile/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js")
	let auditoriamobile_rules_errorarchive_errorarchive_decidewhicheditpage_js = __webpack_require__(/*! ./AuditoriaMobile/Rules/ErrorArchive/ErrorArchive_DecideWhichEditPage.js */ "./build.definitions/AuditoriaMobile/Rules/ErrorArchive/ErrorArchive_DecideWhichEditPage.js")
	let auditoriamobile_rules_formatactivo_rule_js = __webpack_require__(/*! ./AuditoriaMobile/Rules/FormatActivo.rule.js */ "./build.definitions/AuditoriaMobile/Rules/FormatActivo.rule.js")
	let auditoriamobile_rules_logging_loglevels_js = __webpack_require__(/*! ./AuditoriaMobile/Rules/Logging/LogLevels.js */ "./build.definitions/AuditoriaMobile/Rules/Logging/LogLevels.js")
	let auditoriamobile_rules_logging_settracecategories_js = __webpack_require__(/*! ./AuditoriaMobile/Rules/Logging/SetTraceCategories.js */ "./build.definitions/AuditoriaMobile/Rules/Logging/SetTraceCategories.js")
	let auditoriamobile_rules_logging_setuserloglevel_js = __webpack_require__(/*! ./AuditoriaMobile/Rules/Logging/SetUserLogLevel.js */ "./build.definitions/AuditoriaMobile/Rules/Logging/SetUserLogLevel.js")
	let auditoriamobile_rules_logging_togglelogging_js = __webpack_require__(/*! ./AuditoriaMobile/Rules/Logging/ToggleLogging.js */ "./build.definitions/AuditoriaMobile/Rules/Logging/ToggleLogging.js")
	let auditoriamobile_rules_logging_tracecategories_js = __webpack_require__(/*! ./AuditoriaMobile/Rules/Logging/TraceCategories.js */ "./build.definitions/AuditoriaMobile/Rules/Logging/TraceCategories.js")
	let auditoriamobile_rules_logging_userlogsetting_js = __webpack_require__(/*! ./AuditoriaMobile/Rules/Logging/UserLogSetting.js */ "./build.definitions/AuditoriaMobile/Rules/Logging/UserLogSetting.js")
	let auditoriamobile_rules_messages_auditoria_auditoria_deleteconfirmation_js = __webpack_require__(/*! ./AuditoriaMobile/Rules/Messages/Auditoria/Auditoria_DeleteConfirmation.js */ "./build.definitions/AuditoriaMobile/Rules/Messages/Auditoria/Auditoria_DeleteConfirmation.js")
	let auditoriamobile_rules_messages_tipoauditoria_tipoauditoria_deleteconfirmation_js = __webpack_require__(/*! ./AuditoriaMobile/Rules/Messages/TipoAuditoria/TipoAuditoria_DeleteConfirmation.js */ "./build.definitions/AuditoriaMobile/Rules/Messages/TipoAuditoria/TipoAuditoria_DeleteConfirmation.js")
	let auditoriamobile_rules_navtoexternalsites_emmsa_openemmsacontacto_js = __webpack_require__(/*! ./AuditoriaMobile/Rules/NavToExternalSites/Emmsa/OpenEmmsaContacto.js */ "./build.definitions/AuditoriaMobile/Rules/NavToExternalSites/Emmsa/OpenEmmsaContacto.js")
	let auditoriamobile_rules_navtoexternalsites_emmsa_openemmsaoficial_js = __webpack_require__(/*! ./AuditoriaMobile/Rules/NavToExternalSites/Emmsa/OpenEmmsaOficial.js */ "./build.definitions/AuditoriaMobile/Rules/NavToExternalSites/Emmsa/OpenEmmsaOficial.js")
	let auditoriamobile_rules_navtoexternalsites_ledesma_openledesmacontacto_js = __webpack_require__(/*! ./AuditoriaMobile/Rules/NavToExternalSites/Ledesma/OpenLedesmaContacto.js */ "./build.definitions/AuditoriaMobile/Rules/NavToExternalSites/Ledesma/OpenLedesmaContacto.js")
	let auditoriamobile_rules_navtoexternalsites_ledesma_openledesmaoficial_js = __webpack_require__(/*! ./AuditoriaMobile/Rules/NavToExternalSites/Ledesma/OpenLedesmaOficial.js */ "./build.definitions/AuditoriaMobile/Rules/NavToExternalSites/Ledesma/OpenLedesmaOficial.js")
	let auditoriamobile_rules_navtoexternalsites_sap_opensapcom_js = __webpack_require__(/*! ./AuditoriaMobile/Rules/NavToExternalSites/SAP/OpenSAPcom.js */ "./build.definitions/AuditoriaMobile/Rules/NavToExternalSites/SAP/OpenSAPcom.js")
	let auditoriamobile_rules_navtoexternalsites_sap_opensapmobilestart_js = __webpack_require__(/*! ./AuditoriaMobile/Rules/NavToExternalSites/SAP/OpenSAPMobileStart.js */ "./build.definitions/AuditoriaMobile/Rules/NavToExternalSites/SAP/OpenSAPMobileStart.js")
	let auditoriamobile_rules_service_initialize_js = __webpack_require__(/*! ./AuditoriaMobile/Rules/Service/Initialize.js */ "./build.definitions/AuditoriaMobile/Rules/Service/Initialize.js")
	let auditoriamobile_rules_utils_formatactivo_js = __webpack_require__(/*! ./AuditoriaMobile/Rules/Utils/FormatActivo.js */ "./build.definitions/AuditoriaMobile/Rules/Utils/FormatActivo.js")
	let auditoriamobile_services_auditoria_service = __webpack_require__(/*! ./AuditoriaMobile/Services/Auditoria.service */ "./build.definitions/AuditoriaMobile/Services/Auditoria.service")
	let auditoriamobile_styles_styles_css = __webpack_require__(/*! ./AuditoriaMobile/Styles/Styles.css */ "./build.definitions/AuditoriaMobile/Styles/Styles.css")
	let auditoriamobile_styles_styles_json = __webpack_require__(/*! ./AuditoriaMobile/Styles/Styles.json */ "./build.definitions/AuditoriaMobile/Styles/Styles.json")
	let auditoriamobile_styles_styles_less = __webpack_require__(/*! ./AuditoriaMobile/Styles/Styles.less */ "./build.definitions/AuditoriaMobile/Styles/Styles.less")
	let auditoriamobile_styles_styles_nss = __webpack_require__(/*! ./AuditoriaMobile/Styles/Styles.nss */ "./build.definitions/AuditoriaMobile/Styles/Styles.nss")
	let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
	let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")
	
	module.exports = {
		application_app : application_app,
		auditoriamobile_actions_abm_auditoria_auditoria_createentity_action : auditoriamobile_actions_abm_auditoria_auditoria_createentity_action,
		auditoriamobile_actions_abm_auditoria_auditoria_deleteentity_action : auditoriamobile_actions_abm_auditoria_auditoria_deleteentity_action,
		auditoriamobile_actions_abm_auditoria_auditoria_updateentity_action : auditoriamobile_actions_abm_auditoria_auditoria_updateentity_action,
		auditoriamobile_actions_abm_tipoauditoria_tipoauditoria_deleteentity_action : auditoriamobile_actions_abm_tipoauditoria_tipoauditoria_deleteentity_action,
		auditoriamobile_actions_abm_tipoauditoria_tipoauditoria_updateentity_action : auditoriamobile_actions_abm_tipoauditoria_tipoauditoria_updateentity_action,
		auditoriamobile_actions_adjunto_deleteconfirmation_action : auditoriamobile_actions_adjunto_deleteconfirmation_action,
		auditoriamobile_actions_application_appupdate_action : auditoriamobile_actions_application_appupdate_action,
		auditoriamobile_actions_application_appupdatefailuremessage_action : auditoriamobile_actions_application_appupdatefailuremessage_action,
		auditoriamobile_actions_application_appupdateprogressbanner_action : auditoriamobile_actions_application_appupdateprogressbanner_action,
		auditoriamobile_actions_application_appupdatesuccessmessage_action : auditoriamobile_actions_application_appupdatesuccessmessage_action,
		auditoriamobile_actions_application_logout_action : auditoriamobile_actions_application_logout_action,
		auditoriamobile_actions_application_navtoabout_action : auditoriamobile_actions_application_navtoabout_action,
		auditoriamobile_actions_application_navtoactivitylog_action : auditoriamobile_actions_application_navtoactivitylog_action,
		auditoriamobile_actions_application_navtosupport_action : auditoriamobile_actions_application_navtosupport_action,
		auditoriamobile_actions_application_onwillupdate_action : auditoriamobile_actions_application_onwillupdate_action,
		auditoriamobile_actions_application_reset_action : auditoriamobile_actions_application_reset_action,
		auditoriamobile_actions_application_resetmessage_action : auditoriamobile_actions_application_resetmessage_action,
		auditoriamobile_actions_application_usermenupopover_action : auditoriamobile_actions_application_usermenupopover_action,
		auditoriamobile_actions_auditoria_service_closeoffline_action : auditoriamobile_actions_auditoria_service_closeoffline_action,
		auditoriamobile_actions_auditoria_service_closeofflinefailuremessage_action : auditoriamobile_actions_auditoria_service_closeofflinefailuremessage_action,
		auditoriamobile_actions_auditoria_service_closeofflinesuccessmessage_action : auditoriamobile_actions_auditoria_service_closeofflinesuccessmessage_action,
		auditoriamobile_actions_auditoria_service_downloadoffline_action : auditoriamobile_actions_auditoria_service_downloadoffline_action,
		auditoriamobile_actions_auditoria_service_downloadstartedmessage_action : auditoriamobile_actions_auditoria_service_downloadstartedmessage_action,
		auditoriamobile_actions_auditoria_service_initializeoffline_action : auditoriamobile_actions_auditoria_service_initializeoffline_action,
		auditoriamobile_actions_auditoria_service_initializeofflinefailuremessage_action : auditoriamobile_actions_auditoria_service_initializeofflinefailuremessage_action,
		auditoriamobile_actions_auditoria_service_syncfailuremessage_action : auditoriamobile_actions_auditoria_service_syncfailuremessage_action,
		auditoriamobile_actions_auditoria_service_syncstartedmessage_action : auditoriamobile_actions_auditoria_service_syncstartedmessage_action,
		auditoriamobile_actions_auditoria_service_uploadoffline_action : auditoriamobile_actions_auditoria_service_uploadoffline_action,
		auditoriamobile_actions_closemodalpage_cancel_action : auditoriamobile_actions_closemodalpage_cancel_action,
		auditoriamobile_actions_closemodalpage_complete_action : auditoriamobile_actions_closemodalpage_complete_action,
		auditoriamobile_actions_closepage_action : auditoriamobile_actions_closepage_action,
		auditoriamobile_actions_confirmation_action : auditoriamobile_actions_confirmation_action,
		auditoriamobile_actions_errorarchive_errorarchive_syncfailure_action : auditoriamobile_actions_errorarchive_errorarchive_syncfailure_action,
		auditoriamobile_actions_errorarchive_errorarchive_unknownaffectedentity_action : auditoriamobile_actions_errorarchive_errorarchive_unknownaffectedentity_action,
		auditoriamobile_actions_errorarchive_navtoerrorarchive_detail_action : auditoriamobile_actions_errorarchive_navtoerrorarchive_detail_action,
		auditoriamobile_actions_errorarchive_navtoerrorarchive_list_action : auditoriamobile_actions_errorarchive_navtoerrorarchive_list_action,
		auditoriamobile_actions_genericbannermessage_action : auditoriamobile_actions_genericbannermessage_action,
		auditoriamobile_actions_genericmessagebox_action : auditoriamobile_actions_genericmessagebox_action,
		auditoriamobile_actions_genericnavigation_action : auditoriamobile_actions_genericnavigation_action,
		auditoriamobile_actions_generictoastmessage_action : auditoriamobile_actions_generictoastmessage_action,
		auditoriamobile_actions_logging_loguploadfailure_action : auditoriamobile_actions_logging_loguploadfailure_action,
		auditoriamobile_actions_logging_loguploadsuccessful_action : auditoriamobile_actions_logging_loguploadsuccessful_action,
		auditoriamobile_actions_logging_uploadlog_action : auditoriamobile_actions_logging_uploadlog_action,
		auditoriamobile_actions_logging_uploadlogprogress_action : auditoriamobile_actions_logging_uploadlogprogress_action,
		auditoriamobile_actions_messages_auditoria_auditoria_deleteconfirmation_action : auditoriamobile_actions_messages_auditoria_auditoria_deleteconfirmation_action,
		auditoriamobile_actions_messages_auditoria_createauditoriaentityfailuremessage_action : auditoriamobile_actions_messages_auditoria_createauditoriaentityfailuremessage_action,
		auditoriamobile_actions_messages_auditoria_deleteauditoriaentityfailuremessage_action : auditoriamobile_actions_messages_auditoria_deleteauditoriaentityfailuremessage_action,
		auditoriamobile_actions_messages_auditoria_updateauditoriaentityfailuremessage_action : auditoriamobile_actions_messages_auditoria_updateauditoriaentityfailuremessage_action,
		auditoriamobile_actions_messages_tipoauditoria_deletetipoauditoriaentityfailuremessage_action : auditoriamobile_actions_messages_tipoauditoria_deletetipoauditoriaentityfailuremessage_action,
		auditoriamobile_actions_messages_tipoauditoria_tipoauditoria_deleteconfirmation_action : auditoriamobile_actions_messages_tipoauditoria_tipoauditoria_deleteconfirmation_action,
		auditoriamobile_actions_messages_tipoauditoria_updateauditoriaentityfailuremessage_action : auditoriamobile_actions_messages_tipoauditoria_updateauditoriaentityfailuremessage_action,
		auditoriamobile_actions_messages_tipoauditoria_updatetipoauditoriaentityfailuremessage_action : auditoriamobile_actions_messages_tipoauditoria_updatetipoauditoriaentityfailuremessage_action,
		auditoriamobile_actions_navto_auditoria_navtoauditoria_create_action : auditoriamobile_actions_navto_auditoria_navtoauditoria_create_action,
		auditoriamobile_actions_navto_auditoria_navtoauditoria_detail_action : auditoriamobile_actions_navto_auditoria_navtoauditoria_detail_action,
		auditoriamobile_actions_navto_auditoria_navtoauditoria_edit_action : auditoriamobile_actions_navto_auditoria_navtoauditoria_edit_action,
		auditoriamobile_actions_navto_auditoria_navtoauditoria_list_action : auditoriamobile_actions_navto_auditoria_navtoauditoria_list_action,
		auditoriamobile_actions_navto_auditoria_navtoauditoria_table_action : auditoriamobile_actions_navto_auditoria_navtoauditoria_table_action,
		auditoriamobile_actions_navto_tipoauditoria_navtotipoauditoria_edit_action : auditoriamobile_actions_navto_tipoauditoria_navtotipoauditoria_edit_action,
		auditoriamobile_actions_navto_tipoauditoria_navtotipoauditoria_list_action : auditoriamobile_actions_navto_tipoauditoria_navtotipoauditoria_list_action,
		auditoriamobile_actions_navtotipoauditoria_detail_action : auditoriamobile_actions_navtotipoauditoria_detail_action,
		auditoriamobile_actions_onexistmessage_action : auditoriamobile_actions_onexistmessage_action,
		auditoriamobile_actions_pushregister_action : auditoriamobile_actions_pushregister_action,
		auditoriamobile_actions_pushregisterfailuremessage_action : auditoriamobile_actions_pushregisterfailuremessage_action,
		auditoriamobile_actions_pushregistersuccessmessage_action : auditoriamobile_actions_pushregistersuccessmessage_action,
		auditoriamobile_globals_application_appdefinition_version_global : auditoriamobile_globals_application_appdefinition_version_global,
		auditoriamobile_globals_application_applicationname_global : auditoriamobile_globals_application_applicationname_global,
		auditoriamobile_globals_application_supportemail_global : auditoriamobile_globals_application_supportemail_global,
		auditoriamobile_globals_application_supportphone_global : auditoriamobile_globals_application_supportphone_global,
		auditoriamobile_i18n_i18n_properties : auditoriamobile_i18n_i18n_properties,
		auditoriamobile_jsconfig_json : auditoriamobile_jsconfig_json,
		auditoriamobile_pages_application_about_page : auditoriamobile_pages_application_about_page,
		auditoriamobile_pages_application_support_page : auditoriamobile_pages_application_support_page,
		auditoriamobile_pages_application_useractivitylog_page : auditoriamobile_pages_application_useractivitylog_page,
		auditoriamobile_pages_auditoria_auditoria_create_page : auditoriamobile_pages_auditoria_auditoria_create_page,
		auditoriamobile_pages_auditoria_auditoria_detail_page : auditoriamobile_pages_auditoria_auditoria_detail_page,
		auditoriamobile_pages_auditoria_auditoria_edit_page : auditoriamobile_pages_auditoria_auditoria_edit_page,
		auditoriamobile_pages_auditoria_auditoria_list_page : auditoriamobile_pages_auditoria_auditoria_list_page,
		auditoriamobile_pages_auditoria_auditoria_table_page : auditoriamobile_pages_auditoria_auditoria_table_page,
		auditoriamobile_pages_errorarchive_errorarchive_detail_page : auditoriamobile_pages_errorarchive_errorarchive_detail_page,
		auditoriamobile_pages_errorarchive_errorarchive_list_page : auditoriamobile_pages_errorarchive_errorarchive_list_page,
		auditoriamobile_pages_main_page : auditoriamobile_pages_main_page,
		auditoriamobile_pages_tipoauditoria_tipoauditoria_detail_page : auditoriamobile_pages_tipoauditoria_tipoauditoria_detail_page,
		auditoriamobile_pages_tipoauditoria_tipoauditoria_edit_page : auditoriamobile_pages_tipoauditoria_tipoauditoria_edit_page,
		auditoriamobile_pages_tipoauditoria_tipoauditoria_list_page : auditoriamobile_pages_tipoauditoria_tipoauditoria_list_page,
		auditoriamobile_rules_adjunto_descargaradjunto_js : auditoriamobile_rules_adjunto_descargaradjunto_js,
		auditoriamobile_rules_application_appupdatefailure_js : auditoriamobile_rules_application_appupdatefailure_js,
		auditoriamobile_rules_application_appupdatesuccess_js : auditoriamobile_rules_application_appupdatesuccess_js,
		auditoriamobile_rules_application_clientismultiusermode_js : auditoriamobile_rules_application_clientismultiusermode_js,
		auditoriamobile_rules_application_getclientsupportversions_js : auditoriamobile_rules_application_getclientsupportversions_js,
		auditoriamobile_rules_application_getclientversion_js : auditoriamobile_rules_application_getclientversion_js,
		auditoriamobile_rules_application_onwillupdate_js : auditoriamobile_rules_application_onwillupdate_js,
		auditoriamobile_rules_application_resetappsettingsandlogout_js : auditoriamobile_rules_application_resetappsettingsandlogout_js,
		auditoriamobile_rules_errorarchive_errorarchive_checkforsyncerror_js : auditoriamobile_rules_errorarchive_errorarchive_checkforsyncerror_js,
		auditoriamobile_rules_errorarchive_errorarchive_decidewhicheditpage_js : auditoriamobile_rules_errorarchive_errorarchive_decidewhicheditpage_js,
		auditoriamobile_rules_formatactivo_rule_js : auditoriamobile_rules_formatactivo_rule_js,
		auditoriamobile_rules_logging_loglevels_js : auditoriamobile_rules_logging_loglevels_js,
		auditoriamobile_rules_logging_settracecategories_js : auditoriamobile_rules_logging_settracecategories_js,
		auditoriamobile_rules_logging_setuserloglevel_js : auditoriamobile_rules_logging_setuserloglevel_js,
		auditoriamobile_rules_logging_togglelogging_js : auditoriamobile_rules_logging_togglelogging_js,
		auditoriamobile_rules_logging_tracecategories_js : auditoriamobile_rules_logging_tracecategories_js,
		auditoriamobile_rules_logging_userlogsetting_js : auditoriamobile_rules_logging_userlogsetting_js,
		auditoriamobile_rules_messages_auditoria_auditoria_deleteconfirmation_js : auditoriamobile_rules_messages_auditoria_auditoria_deleteconfirmation_js,
		auditoriamobile_rules_messages_tipoauditoria_tipoauditoria_deleteconfirmation_js : auditoriamobile_rules_messages_tipoauditoria_tipoauditoria_deleteconfirmation_js,
		auditoriamobile_rules_navtoexternalsites_emmsa_openemmsacontacto_js : auditoriamobile_rules_navtoexternalsites_emmsa_openemmsacontacto_js,
		auditoriamobile_rules_navtoexternalsites_emmsa_openemmsaoficial_js : auditoriamobile_rules_navtoexternalsites_emmsa_openemmsaoficial_js,
		auditoriamobile_rules_navtoexternalsites_ledesma_openledesmacontacto_js : auditoriamobile_rules_navtoexternalsites_ledesma_openledesmacontacto_js,
		auditoriamobile_rules_navtoexternalsites_ledesma_openledesmaoficial_js : auditoriamobile_rules_navtoexternalsites_ledesma_openledesmaoficial_js,
		auditoriamobile_rules_navtoexternalsites_sap_opensapcom_js : auditoriamobile_rules_navtoexternalsites_sap_opensapcom_js,
		auditoriamobile_rules_navtoexternalsites_sap_opensapmobilestart_js : auditoriamobile_rules_navtoexternalsites_sap_opensapmobilestart_js,
		auditoriamobile_rules_service_initialize_js : auditoriamobile_rules_service_initialize_js,
		auditoriamobile_rules_utils_formatactivo_js : auditoriamobile_rules_utils_formatactivo_js,
		auditoriamobile_services_auditoria_service : auditoriamobile_services_auditoria_service,
		auditoriamobile_styles_styles_css : auditoriamobile_styles_styles_css,
		auditoriamobile_styles_styles_json : auditoriamobile_styles_styles_json,
		auditoriamobile_styles_styles_less : auditoriamobile_styles_styles_less,
		auditoriamobile_styles_styles_nss : auditoriamobile_styles_styles_nss,
		tsconfig_json : tsconfig_json,
		version_mdkbundlerversion : version_mdkbundlerversion
	}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Styles/Styles.css":
/*!*************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Styles/Styles.css ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
div.MDKPage

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function

.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }
*/
	MDKPage {
	  background-color: #f5f6f7;
	}
	ui5-mdk-bar.actionbar {
	  background-color: #2f4c92;
	}
	ui5-mdk-bar.actionbar>ui5-title {
	  color: #f5f6f7;
	  font-weight: 600;
	  font-style: normal;
	}
	.MainButton {
	  color: #f5f6f7;
	  background-color: #2f4c92;
	}
	.Icon {
	  color: #f5f6f7;
	}
	.MainFooter {
	  color: #f5f6f7;
	  background-color: #2f4c92;
	}
	`, "",{"version":3,"sources":["webpack://./build.definitions/AuditoriaMobile/Styles/Styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC;CACA;GACE,yBAAyB;CAC3B;CACA;GACE,yBAAyB;CAC3B;CACA;GACE,cAAc;GACd,gBAAgB;GAChB,kBAAkB;CACpB;CACA;GACE,cAAc;GACd,yBAAyB;CAC3B;CACA;GACE,cAAc;CAChB;CACA;GACE,cAAc;GACd,yBAAyB;CAC3B","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\ndiv.MDKPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n\tMDKPage {\n\t  background-color: #f5f6f7;\n\t}\n\tui5-mdk-bar.actionbar {\n\t  background-color: #2f4c92;\n\t}\n\tui5-mdk-bar.actionbar>ui5-title {\n\t  color: #f5f6f7;\n\t  font-weight: 600;\n\t  font-style: normal;\n\t}\n\t.MainButton {\n\t  color: #f5f6f7;\n\t  background-color: #2f4c92;\n\t}\n\t.Icon {\n\t  color: #f5f6f7;\n\t}\n\t.MainFooter {\n\t  color: #f5f6f7;\n\t  background-color: #2f4c92;\n\t}\n\t"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Styles/Styles.less":
/*!**************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Styles/Styles.less ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
Page

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function

.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }
*/

@ledesmaBlue: #2f4c92;
@ledesmaWhite: #f5f6f7;

MDKPage {
    background-color: @ledesmaWhite;
}

ActionBar {
    background-color: @ledesmaBlue;
}

ActionBarTitle {
    color: @ledesmaWhite; 
    font-weight: 600;
    font-style: normal;
}

.MainButton {
    color: @ledesmaWhite;
    background-color: @ledesmaBlue;
}

.Icon {
    color: @ledesmaWhite;
}

.MainFooter {
    color: @ledesmaWhite;
    background-color: @ledesmaBlue;
}`, "",{"version":3,"sources":["webpack://./build.definitions/AuditoriaMobile/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC;;AAED,qBAAqB;AACrB,sBAAsB;;AAEtB;IACI,+BAA+B;AACnC;;AAEA;IACI,8BAA8B;AAClC;;AAEA;IACI,oBAAoB;IACpB,gBAAgB;IAChB,kBAAkB;AACtB;;AAEA;IACI,oBAAoB;IACpB,8BAA8B;AAClC;;AAEA;IACI,oBAAoB;AACxB;;AAEA;IACI,oBAAoB;IACpB,8BAA8B;AAClC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n\n@ledesmaBlue: #2f4c92;\n@ledesmaWhite: #f5f6f7;\n\nMDKPage {\n    background-color: @ledesmaWhite;\n}\n\nActionBar {\n    background-color: @ledesmaBlue;\n}\n\nActionBarTitle {\n    color: @ledesmaWhite; \n    font-weight: 600;\n    font-style: normal;\n}\n\n.MainButton {\n    color: @ledesmaWhite;\n    background-color: @ledesmaBlue;\n}\n\n.Icon {\n    color: @ledesmaWhite;\n}\n\n.MainFooter {\n    color: @ledesmaWhite;\n    background-color: @ledesmaBlue;\n}"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Styles/Styles.nss":
/*!*************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Styles/Styles.nss ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@ledesmaBlue: #2f4c92;
	@ledesmaWhite: #f5f6f7;
	ActionBar {
		background-color: #2f4c92;
	}
	MainButton {
		font-color: #f5f6f7;
		background-color: #2f4c92;
	}
	Icon {
		font-color: #f5f6f7;
	}
	MainFooter {
		font-color: #f5f6f7;
		background-color: #2f4c92;
	}
	`, "",{"version":3,"sources":["webpack://./build.definitions/AuditoriaMobile/Styles/Styles.nss"],"names":[],"mappings":"AAAA,qBAAqB;CACpB,sBAAsB;CACtB;EACC,yBAAyB;CAC1B;CACA;EACC,mBAAmB;EACnB,yBAAyB;CAC1B;CACA;EACC,mBAAmB;CACpB;CACA;EACC,mBAAmB;EACnB,yBAAyB;CAC1B","sourcesContent":["@ledesmaBlue: #2f4c92;\n\t@ledesmaWhite: #f5f6f7;\n\tActionBar {\n\t\tbackground-color: #2f4c92;\n\t}\n\tMainButton {\n\t\tfont-color: #f5f6f7;\n\t\tbackground-color: #2f4c92;\n\t}\n\tIcon {\n\t\tfont-color: #f5f6f7;\n\t}\n\tMainFooter {\n\t\tfont-color: #f5f6f7;\n\t\tbackground-color: #2f4c92;\n\t}\n\t"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "../../../../css-loader/dist/runtime/api.js":
/*!**************************************************!*\
  !*** ../../../../css-loader/dist/runtime/api.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "../../../../css-loader/dist/runtime/sourceMaps.js":
/*!*********************************************************!*\
  !*** ../../../../css-loader/dist/runtime/sourceMaps.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Pages/Application/About.page":
/*!************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Pages/Application/About.page ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"KeyAndValues":[{"_Name":"KeyValue0","KeyName":"User ID","Value":"#Application/#AppData/UserId","Visible":true},{"Value":"#Application/#AppData/DeviceId","_Name":"KeyValue1","KeyName":"Device ID","Visible":true},{"Value":"/AuditoriaMobile/Globals/Application/ApplicationName.global","_Name":"KeyValue2","KeyName":"Application","Visible":true},{"Value":"/AuditoriaMobile/Globals/Application/AppDefinition_Version.global","_Name":"KeyValue3","KeyName":"Application Metadata Version","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}},{"KeyAndValues":[{"Value":"/AuditoriaMobile/Rules/Application/GetClientVersion.js","_Name":"KeyValue4","KeyName":"Client Version","Visible":"$(PLT,true,true,false)"},{"Value":"/AuditoriaMobile/Rules/Application/GetClientSupportVersions.js","_Name":"KeyValue5","KeyName":"Client Support Versions","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue1","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"About","Caption":"About","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Done","SystemItem":"Done","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/AuditoriaMobile/Actions/CloseModalPage_Complete.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Pages/Application/Support.page":
/*!**************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Pages/Application/Support.page ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ContactCell","_Name":"SectionContactCellTable1","EmptySection":{"FooterVisible":false},"ContactCells":[{"ContactCell":{"_Name":"ContactCellItem0","Headline":"Contact Support","ActivityItems":[{"ActivityType":"Phone","ActivityValue":"/AuditoriaMobile/Globals/Application/SupportPhone.global"},{"ActivityType":"Email","ActivityValue":"/AuditoriaMobile/Globals/Application/SupportEmail.global"},{"ActivityType":"Message","ActivityValue":"/AuditoriaMobile/Globals/Application/SupportPhone.global"}]}}]},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":false,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.SimplePropertyCollection","_Name":"SectionSimplePropertyCollection0","Visible":"$(PLT,true,true,false)","EmptySection":{"FooterVisible":false},"SimplePropertyCells":[{"SimplePropertyCell":{"_Name":"SectionSimplePropertyCell0","KeyName":"Activity Log","AccessoryType":"DisclosureIndicator","Visible":"$(PLT,true,true,false)","OnPress":"/AuditoriaMobile/Actions/Application/NavToActivityLog.action"}}],"Layout":{"NumberOfColumns":1,"MinimumInteritemSpacing":66}}]}],"_Type":"Page","_Name":"Settings","Caption":"Settings","PrefersLargeCaption":false,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Done","SystemItem":"Done","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/AuditoriaMobile/Actions/CloseModalPage_Complete.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Pages/Application/UserActivityLog.page":
/*!**********************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Pages/Application/UserActivityLog.page ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"Controls":[{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"EnableLogSwitch","IsVisible":true,"Separator":true,"Caption":"Enable Logging","OnValueChange":"/AuditoriaMobile/Rules/Logging/ToggleLogging.js","IsEditable":true},{"IsSearchEnabled":false,"_Type":"Control.Type.FormCell.ListPicker","_Name":"LogLevelListPicker","IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":false,"Caption":"Log Level","OnValueChange":"/AuditoriaMobile/Rules/Logging/SetUserLogLevel.js","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":true,"AllowDefaultValueIfOneItem":false,"IsEditable":false,"PickerItems":"/AuditoriaMobile/Rules/Logging/LogLevels.js"},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"TracingCategoriesListPicker","IsVisible":false,"Separator":true,"AllowMultipleSelection":true,"AllowEmptySelection":true,"Caption":"Tracing Categories","PickerPrompt":"Select Categories for Tracing","OnValueChange":"/AuditoriaMobile/Rules/Logging/SetTraceCategories.js","IsSelectedSectionEnabled":true,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"IsEditable":true,"PickerItems":"/AuditoriaMobile/Rules/Logging/TraceCategories.js"},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"odataTrace","IsVisible":false,"Separator":true,"Caption":"OData Tracing","OnValueChange":"/AuditoriaMobile/Rules/Logging/SetTraceCategories.js","IsEditable":true}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"FormCellSection0"},{"Controls":[{"_Type":"Control.Type.FormCell.Button","_Name":"Send","IsVisible":true,"Separator":true,"Title":"Send Activity Log","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","Enabled":true,"OnPress":"/AuditoriaMobile/Actions/Logging/UploadLogProgress.action"}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"FormCellSection1"}]}],"_Type":"Page","_Name":"UserActivityLog","Caption":"Activity Log","PrefersLargeCaption":false,"OnLoaded":"/AuditoriaMobile/Rules/Logging/UserLogSetting.js"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Pages/Auditoria/Auditoria_Create.page":
/*!*********************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Pages/Auditoria/Auditoria_Create.page ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCDescripcion","IsVisible":true,"Separator":true,"Caption":"Descripción","Enabled":true,"IsEditable":true},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FCTipoAuditoriaId","IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":false,"Caption":"Seleccionar un tipo de auditoría","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"AllowDefaultValueIfOneItem":false,"IsEditable":true,"Search":{"Enabled":true,"Placeholder":"Filtrar tipos de auditoría"},"PickerItems":{"Target":{"Service":"/AuditoriaMobile/Services/Auditoria.service","EntitySet":"TipoAuditoria","ReadLink":"{@odata.readLink}"},"ObjectCell":{"AvatarStack":{"Avatars":[{"Image":"sap-icon://thing-type"}],"BadgeImage":"sap-icon://cursor-arrow","ImageHasBorder":false,"ImageIsCircular":false},"Description":"{ID}","DisplayDescriptionInMobile":true,"PreserveIconStackSpacing":true,"Title":"{DESCRIPCION}","Visible":true},"ReturnValue":"{ID}"}},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"FCActivo","IsVisible":true,"Separator":true,"Caption":"Activo","IsEditable":true}],"Layout":{"NumberOfColumns":1},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0"}]}],"_Type":"Page","_Name":"Auditoria_Create","Caption":"Crear auditoría","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ABICancel","Caption":"Item","SystemItem":"Cancel","Position":"Right","IsIconCircular":false,"Visible":true,"Style":"Icon","OnPress":"/AuditoriaMobile/Actions/CloseModalPage_Cancel.action"},{"_Name":"ABISave","Caption":"Item","SystemItem":"Save","Position":"Right","IsIconCircular":false,"Visible":true,"Style":"Icon","OnPress":"/AuditoriaMobile/Actions/ABM/Auditoria/Auditoria_CreateEntity.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Pages/Auditoria/Auditoria_Detail.page":
/*!*********************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Pages/Auditoria/Auditoria_Detail.page ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"ObjectHeader":{"Subhead":"Subtítulo","Footnote":"Nota","Description":"Descripción","StatusText":"/AuditoriaMobile/Rules/Utils/FormatActivo.js","SubstatusText":"Subestado","DetailImage":"sap-icon://appointment","DetailImageIsCircular":false,"BodyText":"Cuerpo","HeadlineText":"{DESCRIPCION}","StatusPosition":"Stacked","StatusImagePosition":"Leading","SubstatusImagePosition":"Leading"},"_Type":"Section.Type.ObjectHeader","_Name":"SectionObjectHeader0","Visible":true},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"KeyAndValues":[{"Value":"{ID}","_Name":"KeyValue1","KeyName":"ID","Visible":true},{"Value":"{DESCRIPCION}","_Name":"KeyValue0","KeyName":"Descripción","Visible":true},{"Value":"{TIPOAUDITORIA/DESCRIPCION}","_Name":"KeyValue2","KeyName":"Tipo de auditoría","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":2}}]}],"DesignTimeTarget":{"Service":"/AuditoriaMobile/Services/Auditoria.service","EntitySet":"Auditoria","QueryOptions":"$expand=TIPOAUDITORIA"},"_Type":"Page","_Name":"Auditoria_Detail","Caption":"Detalles","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem1","Caption":"Eliminar","SystemItem":"Trash","Position":"Right","IsIconCircular":false,"Visible":true,"Style":"Icon","OnPress":"/AuditoriaMobile/Rules/Messages/Auditoria/Auditoria_DeleteConfirmation.js"},{"_Name":"ActionBarItem0","Caption":"Editar","SystemItem":"Edit","Position":"Right","IsIconCircular":false,"Visible":true,"Style":"Icon","OnPress":"/AuditoriaMobile/Actions/NavTo/Auditoria/NavToAuditoria_Edit.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Pages/Auditoria/Auditoria_Edit.page":
/*!*******************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Pages/Auditoria/Auditoria_Edit.page ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"Value":"{Auditoria/ID}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCID","IsVisible":true,"Separator":true,"Caption":"ID","PlaceHolder":"PlaceHolder","Enabled":true,"IsEditable":false},{"Value":"{Auditoria/DESCRIPCION}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCDescripcion","IsVisible":true,"Separator":true,"Caption":"Descripción","PlaceHolder":"PlaceHolder","Enabled":true,"IsEditable":true},{"Value":["{Auditoria/TIPOAUDITORIA_ID}"],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FCTipoAuditoriaId","IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":false,"Caption":"Seleccionar un tipo de auditoría","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"AllowDefaultValueIfOneItem":false,"IsEditable":true,"Search":{"Enabled":true,"Placeholder":"Filtrar tipos de auditoría"},"PickerItems":{"Target":{"Service":"/AuditoriaMobile/Services/Auditoria.service","EntitySet":"TipoAuditoria","ReadLink":"{@odata.readLink}"},"ObjectCell":{"AvatarStack":{"Avatars":[{"Image":"sap-icon://thing-type"}],"BadgeImage":"sap-icon://cursor-arrow","ImageHasBorder":false,"ImageIsCircular":false},"Description":"{ID}","DisplayDescriptionInMobile":true,"PreserveIconStackSpacing":true,"Title":"{DESCRIPCION}","Visible":true},"ReturnValue":"{ID}"}},{"Value":"{Auditoria/ACTIVO}","_Type":"Control.Type.FormCell.Switch","_Name":"FCActivo","IsVisible":true,"Separator":true,"Caption":"Activo","IsEditable":true}],"Layout":{"NumberOfColumns":1},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0"}]}],"_Type":"Page","_Name":"Auditoria_Edit","Caption":"Actualizar auditoría","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ABICancel","Caption":"Cancelar","SystemItem":"Cancel","Position":"Right","IsIconCircular":false,"Visible":true,"Style":"Icon","OnPress":"/AuditoriaMobile/Actions/CloseModalPage_Cancel.action"},{"_Name":"ABISave","Caption":"Guardar","SystemItem":"Save","Position":"Right","IsIconCircular":false,"Visible":true,"Style":"Icon","OnPress":"/AuditoriaMobile/Actions/ABM/Auditoria/Auditoria_UpdateEntity.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Pages/Auditoria/Auditoria_List.page":
/*!*******************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Pages/Auditoria/Auditoria_List.page ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.ContactCell","Target":{"Service":"/AuditoriaMobile/Services/Auditoria.service","EntitySet":"Auditoria","QueryOptions":"$expand=TIPOAUDITORIA"},"_Name":"SectionContactCell0","Visible":true,"EmptySection":{"FooterVisible":false},"ContactCell":{"Visible":true,"ContextMenu":{"PerformFirstActionWithFullSwipe":true},"DetailImage":"","Headline":"{DESCRIPCION}","Subheadline":"{ID}","Description":"{DESCRIPCION}","OnPress":"/AuditoriaMobile/Actions/NavTo/Auditoria/NavToAuditoria_Detail.action"},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"Search":{"Enabled":true}}]}],"_Type":"Page","_Name":"Auditoria_List","Caption":"Auditorías","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ABICreate","Caption":"Crear","SystemItem":"Add","Position":"Right","IsIconCircular":false,"Visible":true,"Style":"Icon","OnPress":"/AuditoriaMobile/Actions/NavTo/Auditoria/NavToAuditoria_Create.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Pages/Auditoria/Auditoria_Table.page":
/*!********************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Pages/Auditoria/Auditoria_Table.page ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"Section":{"Header":{"DataTable":{"Items":[{"Text":"ID","NumberOfLines":1},{"Text":"Descripción","NumberOfLines":1},{"Text":"Tipo de auditoría","NumberOfLines":1}]},"_Name":"SectionDataTableHeader6","AccessoryType":"None","UseTopPadding":true},"Separators":{"TopSectionSeparator":true,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Row":{"Items":[{"Value":"{ID}","DisplayType":"Text","EditType":"Text","NumberOfLines":1,"TextAlignment":"Left","ListPicker":{"PickerItems":[]}},{"Value":"{DESCRIPCION}","DisplayType":"Text","EditType":"Text","NumberOfLines":1,"TextAlignment":"Left","ListPicker":{"PickerItems":[]}},{"Value":"{TIPOAUDITORIA_ID}","DisplayType":"Text","EditType":"Text","NumberOfLines":1,"TextAlignment":"Left","ListPicker":{"PickerItems":[]}}],"Layout":{"ColumnWidth":[]}},"_Type":"Section.Type.DataTable","DataSubscriptions":[],"Target":{"Service":"/AuditoriaMobile/Services/Auditoria.service","EntitySet":"Auditoria","ServerSidePaging":false},"_Name":"SectionDataTable1","Visible":true,"EmptySection":{"FooterVisible":false},"EditMode":"None","Search":{"Enabled":true,"Placeholder":"Buscar..."},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Cargando...","PageSize":5},"StickyColumn":false},"_Type":"Control.Type.SectionedTable","Target":{"Service":"/AuditoriaMobile/Services/Auditoria.service","EntitySet":"Auditoria"},"_Name":"SectionedTable0"}],"_Type":"Page","_Name":"Auditoria_Table","Caption":"Auditorías","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Pages/ErrorArchive/ErrorArchive_Detail.page":
/*!***************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Pages/ErrorArchive/ErrorArchive_Detail.page ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"_Type":"Section.Type.ObjectTable","Target":"{AffectedEntity}","_Name":"SectionObjectTable0","Header":{"_Type":"SectionCommon.Type.Header","_Name":"SectionCommonTypeHeader0","AccessoryType":"None","UseTopPadding":true,"Caption":"Entidad afectada: {#Page:-Current/AffectedEntity/@odata.type}"},"Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"ObjectCell":{"Title":"Editar entidad afectada","Subhead":"{@odata.id}","DisplayDescriptionInMobile":true,"PreserveIconStackSpacing":false,"AccessoryType":"DisclosureIndicator","Tags":[],"AvatarStack":{"Avatars":[],"ImageIsCircular":true,"ImageHasBorder":false},"AvatarGrid":{"Avatars":[],"ImageIsCircular":true},"OnPress":"/AuditoriaMobile/Rules/ErrorArchive/ErrorArchive_DecideWhichEditPage.js","Selected":false,"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true,"LeadingItems":[],"TrailingItems":[]}},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}},{"KeyAndValues":[{"Value":"{Message}","_Name":"KeyValue0","KeyName":"Error","Visible":true},{"Value":"{RequestBody}","_Name":"KeyValue1","KeyName":"Request Body","Visible":true},{"Value":"{RequestURL}","_Name":"KeyValue2","KeyName":"Request URL","Visible":true},{"Value":"{HTTPStatusCode}","_Name":"KeyValue3","KeyName":"HTTP Status Code","Visible":true},{"Value":"{RequestMethod}","_Name":"KeyValue4","KeyName":"Request Method","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Layout":{"NumberOfColumns":1}}],"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"}}],"_Type":"Page","_Name":"ErrorArchive_Detail","Caption":"Details","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Pages/ErrorArchive/ErrorArchive_List.page":
/*!*************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Pages/ErrorArchive/ErrorArchive_List.page ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ObjectTable","Target":{"Service":"/AuditoriaMobile/Services/Auditoria.service","EntitySet":"ErrorArchive"},"_Name":"SectionObjectTable0","Visible":true,"EmptySection":{"FooterVisible":false,"Caption":"No record found!"},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true},"Title":"{HTTPStatusCode}","Subhead":"{RequestURL}","Footnote":"{Message}","StatusText":"{RequestMethod}","AvatarStack":{"ImageIsCircular":false},"PreserveIconStackSpacing":false,"AccessoryType":"None","OnPress":"/AuditoriaMobile/Actions/ErrorArchive/NavToErrorArchive_Detail.action","Selected":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}}]}],"_Type":"Page","_Name":"ErrorArchive_List","Caption":"Error List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Pages/Main.page":
/*!***********************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Pages/Main.page ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Layout":{"LayoutType":"Vertical","HorizontalAlignment":"Leading"},"_Type":"Section.Type.ButtonTable","_Name":"SectionButtonTable0","Header":{"_Type":"SectionCommon.Type.Header","_Name":"SectionCommonTypeHeader0","AccessoryType":"None","UseTopPadding":false,"Caption":"Acciones"},"Visible":true,"EmptySection":{"FooterVisible":false},"Buttons":[{"Styles":{"Button":"MainButton"},"_Type":"ButtonTable.Type.Button","_Name":"ButtonTableTypeButton0","Title":"Auditorías (Data Table)","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","Image":"sap-icon://search","ImagePosition":"Leading","FullWidth":true,"Visible":true,"Enabled":true,"OnPress":"/AuditoriaMobile/Actions/NavTo/Auditoria/NavToAuditoria_Table.action"},{"Styles":{"Button":"MainButton"},"_Type":"ButtonTable.Type.Button","_Name":"ButtonTableTypeButton1","Title":"Auditorías","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","Image":"sap-icon://list","ImagePosition":"Leading","FullWidth":true,"Visible":true,"Enabled":true,"OnPress":"/AuditoriaMobile/Actions/NavTo/Auditoria/NavToAuditoria_List.action"},{"_Type":"ButtonTable.Type.Button","_Name":"ButtonTableTypeButton5","Title":"Tipos de auditoría","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","Image":"sap-icon://list","ImagePosition":"Leading","FullWidth":true,"Visible":true,"Enabled":true,"Styles":{"Button":"MainButton"},"OnPress":"/AuditoriaMobile/Actions/NavTo/TipoAuditoria/NavToTipoAuditoria_List.action"}]},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Layout":{"LayoutType":"Vertical","HorizontalAlignment":"Leading"},"_Type":"Section.Type.ButtonTable","_Name":"SectionButtonTable1","Header":{"_Type":"SectionCommon.Type.Header","_Name":"SectionCommonTypeHeader1","AccessoryType":"None","UseTopPadding":false,"Caption":"Otro"},"Visible":true,"EmptySection":{"FooterVisible":false},"Buttons":[{"Styles":{"Button":"MainButton"},"_Type":"ButtonTable.Type.Button","_Name":"ButtonTableTypeButton3","Title":"Abrir SAP Mobile Start","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","Image":"sap-icon://open-command-field","ImagePosition":"Leading","FullWidth":true,"Visible":true,"Enabled":true,"OnPress":"/AuditoriaMobile/Rules/NavToExternalSites/SAP/OpenSAPMobileStart.js"},{"Styles":{"Button":"MainButton"},"_Type":"ButtonTable.Type.Button","_Name":"ButtonTableTypeButton4","Title":"Ir al sitio de sap.com","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","Image":"sap-icon://open-command-field","ImagePosition":"Leading","FullWidth":true,"Visible":true,"Enabled":true,"OnPress":"/AuditoriaMobile/Rules/NavToExternalSites/SAP/OpenSAPcom.js"}]},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Footer":{"Styles":{"Footer":"MainFooter"},"_Type":"SectionCommon.Type.Footer","_Name":"SectionCommonTypeFooter0","Caption":"Aplicación de prueba","FooterStyle":"Help","Visible":true,"UseBottomPadding":true},"_Type":"Section.Type.ObjectCardCollection","_Name":"SectionObjectCardCollection0","Visible":true,"EmptySection":{"FooterVisible":false},"Cards":[{"_Type":"Control.Type.ObjectCard","_Name":"ObjectCard0","Visible":true,"Title":"Ledesma","Subhead":"Sitios de interés","Footnote":"Seleccione para navegar","DetailImage":"sap-icon://world","DetailImageIsCircular":false,"PrimaryAction":{"OnPress":"/AuditoriaMobile/Rules/NavToExternalSites/Ledesma/OpenLedesmaOficial.js","Style":"MainButton","Title":"Sitio oficial","Visible":true},"SecondaryAction":{"OnPress":"/AuditoriaMobile/Rules/NavToExternalSites/Ledesma/OpenLedesmaContacto.js","Title":"Contacto","Visible":true}},{"_Type":"Control.Type.ObjectCard","_Name":"ObjectCard1","Visible":true,"Title":"EMMSA IT Services","Subhead":"Consultora IT","Footnote":"Seleccione para navegar","DetailImage":"sap-icon://world","DetailImageIsCircular":false,"PrimaryAction":{"OnPress":"/AuditoriaMobile/Rules/NavToExternalSites/Emmsa/OpenEmmsaOficial.js","Style":"MainButton","Title":"Sitio oficial","Visible":true},"SecondaryAction":{"OnPress":"/AuditoriaMobile/Rules/NavToExternalSites/Emmsa/OpenEmmsaContacto.js","Title":"Contacto","Visible":true}}],"Layout":{"LayoutType":"HorizontalScroll"}}]}],"_Type":"Page","_Name":"Main","Caption":"LEDESMA: Auditoria","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"User Menu","Icon":"sap-icon://customer","Position":"Right","IsIconCircular":false,"Visible":true,"Style":"Icon","OnPress":"/AuditoriaMobile/Actions/Application/UserMenuPopover.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Pages/TipoAuditoria/TipoAuditoria_Detail.page":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Pages/TipoAuditoria/TipoAuditoria_Detail.page ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"ObjectHeader":{"Subhead":"Subtítulo","Footnote":"Nota","Description":"Descripción","StatusText":"/AuditoriaMobile/Rules/Utils/FormatActivo.js","SubstatusText":"Subestado","DetailImage":"sap-icon://document-text","DetailImageIsCircular":false,"BodyText":"Cuerpo","HeadlineText":"{DESCRIPCION}","StatusPosition":"Stacked","StatusImagePosition":"Leading","SubstatusImagePosition":"Leading"},"_Type":"Section.Type.ObjectHeader","_Name":"SectionObjectHeader0","Visible":true},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"KeyAndValues":[{"Value":"{ID}","_Name":"KeyValue0","KeyName":"ID","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":2}}]}],"_Type":"Page","_Name":"TipoAuditoria_Detail","Caption":"Detalles","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Eliminar","SystemItem":"Trash","Position":"Right","IsIconCircular":false,"Visible":true,"Style":"Icon","OnPress":"/AuditoriaMobile/Rules/Messages/TipoAuditoria/TipoAuditoria_DeleteConfirmation.js"},{"_Name":"ActionBarItem1","Caption":"Editar","SystemItem":"Edit","Position":"Right","IsIconCircular":false,"Visible":true,"Style":"Icon","OnPress":"/AuditoriaMobile/Actions/NavTo/TipoAuditoria/NavToTipoAuditoria_Edit.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Pages/TipoAuditoria/TipoAuditoria_Edit.page":
/*!***************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Pages/TipoAuditoria/TipoAuditoria_Edit.page ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Controls":[{"Value":"{TipoAuditoria/DESCRIPCION}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCDescripcion","IsVisible":true,"Separator":true,"Caption":"Descripción","PlaceHolder":"PlaceHolder","Enabled":true,"IsEditable":true},{"Value":"{TipoAuditoria/ACTIVO}","_Type":"Control.Type.FormCell.Switch","_Name":"FCActivo","IsVisible":true,"Separator":true,"Caption":"Caption","IsEditable":true}],"Layout":{"NumberOfColumns":1}}],"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"}}],"_Type":"Page","_Name":"TipoAuditoria_Edit","Caption":"TipoAuditoria_Edit","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ABICancel","Caption":"Cancelar","SystemItem":"Cancel","Position":"Right","IsIconCircular":false,"Visible":true,"Style":"Icon","OnPress":"/AuditoriaMobile/Actions/CloseModalPage_Cancel.action"},{"_Name":"ActionBarItem0","Caption":"Guardar","SystemItem":"Save","Position":"Right","IsIconCircular":false,"Visible":true,"Style":"Icon","OnPress":"/AuditoriaMobile/Actions/ABM/TipoAuditoria/TipoAuditoria_UpdateEntity.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Pages/TipoAuditoria/TipoAuditoria_List.page":
/*!***************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Pages/TipoAuditoria/TipoAuditoria_List.page ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.SimplePropertyCollection","Target":{"Service":"/AuditoriaMobile/Services/Auditoria.service","EntitySet":"TipoAuditoria"},"_Name":"SectionSimplePropertyCollection0","Visible":true,"EmptySection":{"FooterVisible":false},"SimplePropertyCell":{"KeyName":"{DESCRIPCION}","Value":"/AuditoriaMobile/Rules/Utils/FormatActivo.js","AccessoryType":"DisclosureIndicator","OnPress":"/AuditoriaMobile/Actions/NavToTipoAuditoria_Detail.action"},"Layout":{"NumberOfColumns":2}}]}],"_Type":"Page","_Name":"TipoAuditoria_List","Caption":"Tipos de auditoría","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"MainPage":"/AuditoriaMobile/Pages/Main.page","OnLaunch":["/AuditoriaMobile/Rules/Service/Initialize.js"],"OnWillUpdate":"/AuditoriaMobile/Rules/Application/OnWillUpdate.js","OnDidUpdate":"/AuditoriaMobile/Actions/PushRegister.action","OnUserSwitch":"/AuditoriaMobile/Actions/Auditoria/Service/SyncStartedMessage.action","Styles":"/AuditoriaMobile/Styles/Styles.less","Version":"/AuditoriaMobile/Globals/Application/AppDefinition_Version.global","Localization":"/AuditoriaMobile/i18n/i18n.properties","_SchemaVersion":"24.7","_Name":"AuditoriaMobile","StyleSheets":{"Styles":{"css":"/AuditoriaMobile/Styles/Styles.css","ios":"/AuditoriaMobile/Styles/Styles.nss","android":"/AuditoriaMobile/Styles/Styles.json"}}}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/ABM/Auditoria/Auditoria_CreateEntity.action":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/ABM/Auditoria/Auditoria_CreateEntity.action ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.CreateEntity","ActionResult":{"_Name":"Auditoria_CreateEntity"},"OnFailure":"/AuditoriaMobile/Actions/Messages/Auditoria/CreateAuditoriaEntityFailureMessage.action","OnSuccess":"/AuditoriaMobile/Actions/CloseModalPage_Complete.action","Target":{"Service":"/AuditoriaMobile/Services/Auditoria.service","EntitySet":"Auditoria"},"Properties":{"DESCRIPCION":"#Page:Auditoria_Create/#Control:FCDescripcion/#Value","ACTIVO":"#Control:FCActivo/#Value","TIPOAUDITORIA_ID":"#Control:FCTipoAuditoriaId/#SelectedValue"}}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/ABM/Auditoria/Auditoria_DeleteEntity.action":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/ABM/Auditoria/Auditoria_DeleteEntity.action ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.DeleteEntity","ActionResult":{"_Name":"Auditoria_DeleteEntity"},"OnFailure":"/AuditoriaMobile/Actions/Messages/Auditoria/DeleteAuditoriaEntityFailureMessage.action","OnSuccess":"/AuditoriaMobile/Actions/CloseModalPage_Complete.action","Target":{"Service":"/AuditoriaMobile/Services/Auditoria.service","EntitySet":"Auditoria","ReadLink":"{@odata.readLink}"}}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/ABM/Auditoria/Auditoria_UpdateEntity.action":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/ABM/Auditoria/Auditoria_UpdateEntity.action ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","ActionResult":{"_Name":"Auditoria_UpdateEntity"},"OnFailure":"/AuditoriaMobile/Actions/Messages/Auditoria/UpdateAuditoriaEntityFailureMessage.action","OnSuccess":"/AuditoriaMobile/Actions/CloseModalPage_Complete.action","Target":{"Service":"/AuditoriaMobile/Services/Auditoria.service","EntitySet":"Auditoria","ReadLink":"{@odata.readLink}"},"Properties":{"DESCRIPCION":"#Control:FCDescripcion/#Value","ACTIVO":"#Control:FCActivo/#Value"}}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/ABM/TipoAuditoria/TipoAuditoria_DeleteEntity.action":
/*!*******************************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/ABM/TipoAuditoria/TipoAuditoria_DeleteEntity.action ***!
  \*******************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.DeleteEntity","ActionResult":{"_Name":"TipoAuditoria_DeleteEntity"},"OnFailure":"/AuditoriaMobile/Actions/Messages/TipoAuditoria/DeleteTipoAuditoriaEntityFailureMessage.action","OnSuccess":"/AuditoriaMobile/Actions/CloseModalPage_Complete.action","Target":{"Service":"/AuditoriaMobile/Services/Auditoria.service","EntitySet":"TipoAuditoria","ReadLink":"{@odata.readLink}"}}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/ABM/TipoAuditoria/TipoAuditoria_UpdateEntity.action":
/*!*******************************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/ABM/TipoAuditoria/TipoAuditoria_UpdateEntity.action ***!
  \*******************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","ActionResult":{"_Name":"TipoAuditoria_UpdateEntity"},"OnFailure":"/AuditoriaMobile/Actions/Messages/TipoAuditoria/UpdateTipoAuditoriaEntityFailureMessage.action","OnSuccess":"/AuditoriaMobile/Actions/CloseModalPage_Complete.action","Target":{"Service":"/AuditoriaMobile/Services/Auditoria.service","EntitySet":"TipoAuditoria","ReadLink":"{@odata.readLink}"},"Properties":{"DESCRIPCION":"#Control:FCDescripcion/#Value","ACTIVO":"#Control:FCActivo/#Value"}}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/Adjunto_DeleteConfirmation.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/Adjunto_DeleteConfirmation.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"Adjunto_DeleteConfirmation"},"Message":"¿Esta seguro de eliminar el adjunto?","Title":"Confirmar eliminación","OKCaption":"OK","CancelCaption":"Cancelar"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/Application/AppUpdate.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/Application/AppUpdate.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/AuditoriaMobile/Rules/Application/AppUpdateFailure.js","OnSuccess":"/AuditoriaMobile/Rules/Application/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/Application/AppUpdateFailureMessage.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/Application/AppUpdateFailureMessage.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","Message":"No se pudo actualizar la aplicación - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/Application/AppUpdateProgressBanner.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/Application/AppUpdateProgressBanner.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ProgressBanner","OnSuccess":"/AuditoriaMobile/Actions/Application/AppUpdate.action","Message":"Buscando actualizaciones...","CompletionTimeout":3,"Animated":true}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/Application/AppUpdateSuccessMessage.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/Application/AppUpdateSuccessMessage.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ToastMessage","Message":"Actualización de aplicación completa","Duration":2,"Animated":true}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/Application/Logout.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/Application/Logout.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logout","SkipReset":true}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/Application/NavToAbout.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/Application/NavToAbout.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"PageToOpen":"/AuditoriaMobile/Pages/Application/About.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/Application/NavToActivityLog.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/Application/NavToActivityLog.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"PageToOpen":"/AuditoriaMobile/Pages/Application/UserActivityLog.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/Application/NavToSupport.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/Application/NavToSupport.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"NavigationType":"Cross","PageToOpen":"/AuditoriaMobile/Pages/Application/Support.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/Application/OnWillUpdate.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/Application/OnWillUpdate.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"OnWillUpdate"},"Message":"Ya está disponible una nueva versión de la aplicación. ¿Quieres actualizar a esta versión?","Title":"¡Nueva versión disponible!","OKCaption":"Ahora","CancelCaption":"Luego"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/Application/Reset.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/Application/Reset.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logout","SkipReset":false}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/Application/ResetMessage.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/Application/ResetMessage.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","Title":"Reset","OKCaption":"Yes","OnOK":"/AuditoriaMobile/Rules/Application/ResetAppSettingsAndLogout.js","CancelCaption":"No"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/Application/UserMenuPopover.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/Application/UserMenuPopover.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Enabled":true,"Icon":"sap-icon://synchronize","OnPress":"/AuditoriaMobile/Actions/Auditoria/Service/SyncStartedMessage.action","Title":"Sync Changes","Visible":"$(PLT,true,true,false)"},{"Enabled":true,"Icon":"sap-icon://headset","OnPress":"/AuditoriaMobile/Actions/Application/NavToSupport.action","Title":"Support","Visible":true},{"Enabled":true,"Icon":"sap-icon://refresh","OnPress":"/AuditoriaMobile/Actions/Application/AppUpdateProgressBanner.action","Title":"Check for Updates","Visible":"$(PLT,true,true,false)"},{"Enabled":true,"Icon":"sap-icon://hint","OnPress":"/AuditoriaMobile/Actions/Application/NavToAbout.action","Title":"About","Visible":true},{"Enabled":true,"Icon":"sap-icon://reset","OnPress":"/AuditoriaMobile/Actions/Application/ResetMessage.action","Title":"Reset","Visible":true},{"Enabled":true,"Icon":"sap-icon://log","OnPress":"/AuditoriaMobile/Actions/Application/Logout.action","Title":"Logout","Visible":"/AuditoriaMobile/Rules/Application/ClientIsMultiUserMode.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/Auditoria/Service/CloseOffline.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/Auditoria/Service/CloseOffline.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OfflineOData.Close","Service":"/AuditoriaMobile/Services/Auditoria.service","Force":true,"ActionResult":{"_Name":"close"},"OnSuccess":"/AuditoriaMobile/Actions/Auditoria/Service/CloseOfflineSuccessMessage.action","OnFailure":"/AuditoriaMobile/Actions/Auditoria/Service/CloseOfflineFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/Auditoria/Service/CloseOfflineFailureMessage.action":
/*!*******************************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/Auditoria/Service/CloseOfflineFailureMessage.action ***!
  \*******************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ToastMessage","Message":"Error al cerrar el servicio de datos - {#ActionResults:close/error}","NumberOfLines":1,"Duration":3,"IsIconHidden":true,"Animated":true}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/Auditoria/Service/CloseOfflineSuccessMessage.action":
/*!*******************************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/Auditoria/Service/CloseOfflineSuccessMessage.action ***!
  \*******************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ToastMessage","Message":"Servicio de datos Auditoría cerrado con éxito","NumberOfLines":1,"Duration":3,"IsIconHidden":true,"Animated":true}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/Auditoria/Service/DownloadOffline.action":
/*!********************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/Auditoria/Service/DownloadOffline.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OfflineOData.Download","ActionResult":{"_Name":"sync"},"OnFailure":"/AuditoriaMobile/Actions/Auditoria/Service/SyncFailureMessage.action","OnSuccess":"/AuditoriaMobile/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js","Service":"/AuditoriaMobile/Services/Auditoria.service","DefiningRequests":[{"Name":"Auditoria","Query":"Auditoria","AutomaticallyRetrievesStreams":false},{"Name":"Recomendacion","Query":"Recomendacion"},{"Name":"TipoAuditoria","Query":"TipoAuditoria"}]}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/Auditoria/Service/DownloadStartedMessage.action":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/Auditoria/Service/DownloadStartedMessage.action ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ProgressBanner","OnSuccess":"/AuditoriaMobile/Actions/Auditoria/Service/DownloadOffline.action","Message":"Descarga en progreso...","CompletionMessage":"Descargar exitosa","CompletionTimeout":7}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/Auditoria/Service/InitializeOffline.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/Auditoria/Service/InitializeOffline.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.Initialize","ActionResult":{"_Name":"init"},"OnFailure":"/AuditoriaMobile/Actions/Auditoria/Service/InitializeOfflineFailureMessage.action","ShowActivityIndicator":true,"ActivityIndicatorText":"Downloading...","Service":"/AuditoriaMobile/Services/Auditoria.service","DefiningRequests":[{"Name":"Auditoria","Query":"Auditoria","AutomaticallyRetrievesStreams":false},{"Name":"Recomendacion","Query":"Recomendacion"},{"Name":"TipoAuditoria","Query":"TipoAuditoria"}]}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/Auditoria/Service/InitializeOfflineFailureMessage.action":
/*!************************************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/Auditoria/Service/InitializeOfflineFailureMessage.action ***!
  \************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","Message":"No se pudo inicializar el servicio de datos de la aplicación - {#ActionResults:init/error}","Duration":7,"Animated":true}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/Auditoria/Service/SyncFailureMessage.action":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/Auditoria/Service/SyncFailureMessage.action ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","Message":"Error en el servicio de sincronización de datos sin conexión - {#ActionResults:sync/error}","Duration":7,"Animated":true}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/Auditoria/Service/SyncStartedMessage.action":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/Auditoria/Service/SyncStartedMessage.action ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ProgressBanner","OnFailure":"/AuditoriaMobile/Actions/Auditoria/Service/SyncFailureMessage.action","OnSuccess":"/AuditoriaMobile/Actions/Auditoria/Service/UploadOffline.action","Message":"Subida en progreso...","CompletionMessage":"Sincronización finalizada","CompletionTimeout":7,"Animated":true}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/Auditoria/Service/UploadOffline.action":
/*!******************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/Auditoria/Service/UploadOffline.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OfflineOData.Upload","ActionResult":{"_Name":"sync"},"OnFailure":"/AuditoriaMobile/Actions/Auditoria/Service/SyncFailureMessage.action","OnSuccess":"/AuditoriaMobile/Actions/Auditoria/Service/DownloadStartedMessage.action","Service":"/AuditoriaMobile/Services/Auditoria.service"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/CloseModalPage_Cancel.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/CloseModalPage_Cancel.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/CloseModalPage_Complete.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/CloseModalPage_Complete.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/ClosePage.action":
/*!********************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/ClosePage.action ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/Confirmation.action":
/*!***********************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/Confirmation.action ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"Confirmation"},"Message":"¿Quieres salir de la aplicación actual?","Title":"Confirmar","OKCaption":"Aceptar","CancelCaption":"Cancelar"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/ErrorArchive/ErrorArchive_SyncFailure.action":
/*!************************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/ErrorArchive/ErrorArchive_SyncFailure.action ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","Message":"Upload failed!","Duration":0,"Animated":false,"OnActionLabelPress":"/AuditoriaMobile/Actions/ErrorArchive/NavToErrorArchive_List.action","ActionLabel":"View Errors"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/ErrorArchive/ErrorArchive_UnknownAffectedEntity.action":
/*!**********************************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/ErrorArchive/ErrorArchive_UnknownAffectedEntity.action ***!
  \**********************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ToastMessage","ActionResult":{"_Name":"ErrorArchive_UnknownAffectedEntity"},"Message":"La entidad afectada {AffectedEntity/@odata.id} aún no tiene controlador.","Duration":4,"Animated":true}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/ErrorArchive/NavToErrorArchive_Detail.action":
/*!************************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/ErrorArchive/NavToErrorArchive_Detail.action ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/AuditoriaMobile/Pages/ErrorArchive/ErrorArchive_Detail.page","NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/ErrorArchive/NavToErrorArchive_List.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/ErrorArchive/NavToErrorArchive_List.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/AuditoriaMobile/Pages/ErrorArchive/ErrorArchive_List.page","NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/GenericBannerMessage.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/GenericBannerMessage.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","ActionResult":{"_Name":"GenericBannerMessage"},"Message":"Message"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/GenericMessageBox.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/GenericMessageBox.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"GenericMessageBox"},"Message":"Message","OKCaption":"OK"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/GenericNavigation.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/GenericNavigation.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"GenericNavigation"},"PageToOpen":"/AuditoriaMobile/Pages/Main.page"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/GenericToastMessage.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/GenericToastMessage.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ToastMessage","ActionResult":{"_Name":"GenericToastMessage"},"Message":"Message"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/Logging/LogUploadFailure.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/Logging/LogUploadFailure.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Uploading log file failed with error: {#ActionResults:UploadLog/error}","OKCaption":"OK","Title":"Log Upload Failed","_Type":"Action.Type.Message"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/Logging/LogUploadSuccessful.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/Logging/LogUploadSuccessful.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":3,"IsIconHidden":false,"MaxNumberOfLines":1,"Message":"Log File Uploaded","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/Logging/UploadLog.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/Logging/UploadLog.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"ActionResult":{"_Name":"UploadLog"},"ActivityIndicatorText":"Uploading...","OnFailure":"/AuditoriaMobile/Actions/Logging/LogUploadFailure.action","OnSuccess":"/AuditoriaMobile/Actions/Logging/LogUploadSuccessful.action","ShowActivityIndicator":false,"_Type":"Action.Type.Logger.Upload"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/Logging/UploadLogProgress.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/Logging/UploadLogProgress.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionMessage":"Logs Uploaded","CompletionTimeout":2,"Message":"Uploading Log Files...","OnSuccess":"/AuditoriaMobile/Actions/Logging/UploadLog.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/Messages/Auditoria/Auditoria_DeleteConfirmation.action":
/*!**********************************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/Messages/Auditoria/Auditoria_DeleteConfirmation.action ***!
  \**********************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"Auditoria_DeleteConfirmation"},"Message":"¿Esta seguro de eliminar {Auditoria/DESCRIPCION}?","Title":"Confirmar eliminación","OKCaption":"Aceptar","CancelCaption":"Cancelar"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/Messages/Auditoria/CreateAuditoriaEntityFailureMessage.action":
/*!*****************************************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/Messages/Auditoria/CreateAuditoriaEntityFailureMessage.action ***!
  \*****************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"CreateAuditoriaEntityFailureMessage"},"Message":"No se pudo crear el nuevo registro de Auditoría - {#ActionResults:Auditoria_CreateEntity/error}","Title":"Crear auditoría","OKCaption":"Aceptar"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/Messages/Auditoria/DeleteAuditoriaEntityFailureMessage.action":
/*!*****************************************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/Messages/Auditoria/DeleteAuditoriaEntityFailureMessage.action ***!
  \*****************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"DeleteAuditoriaEntityFailureMessage"},"Message":"No se pudo eliminar {Auditoria/DESCRIPCION} - {#ActionResults:Auditoria_DeleteEntity/error}","Title":"Eliminar {Auditoria/DESCRIPCION}","OKCaption":"Confirmar","CancelCaption":"Cancelar"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/Messages/Auditoria/UpdateAuditoriaEntityFailureMessage.action":
/*!*****************************************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/Messages/Auditoria/UpdateAuditoriaEntityFailureMessage.action ***!
  \*****************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"UpdateAuditoriaEntityFailureMessage"},"Message":"No se pudieron guardar las actualizaciones sobre {Auditoria/DESCRIPCION} - {#ActionResults:Auditoria_UpdateEntity/error}","Title":"Actualizar {Auditoria/DESCRIPCION}","OKCaption":"Aceptar"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/Messages/TipoAuditoria/DeleteTipoAuditoriaEntityFailureMessage.action":
/*!*************************************************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/Messages/TipoAuditoria/DeleteTipoAuditoriaEntityFailureMessage.action ***!
  \*************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"DeleteTipoAuditoriaEntityFailureMessage"},"Message":"No se pudo eliminar {TipoAuditoria/DESCRIPCION} - {#ActionResults:TipoAuditoria_DeleteEntity/error}","Title":"Eliminar {TipoAuditoria/DESCRIPCION}","OKCaption":"Aceptar"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/Messages/TipoAuditoria/TipoAuditoria_DeleteConfirmation.action":
/*!******************************************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/Messages/TipoAuditoria/TipoAuditoria_DeleteConfirmation.action ***!
  \******************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"TipoAuditoria_DeleteConfirmation"},"Message":"¿Esta seguro de eliminar {TipoAuditoria/DESCRIPCION}?","Title":"Confirmar eliminación","OKCaption":"Aceptar","CancelCaption":"Cancelar"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/Messages/TipoAuditoria/UpdateAuditoriaEntityFailureMessage.action":
/*!*********************************************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/Messages/TipoAuditoria/UpdateAuditoriaEntityFailureMessage.action ***!
  \*********************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"UpdateAuditoriaEntityFailureMessage"},"Message":"No se pudieron guardar las actualizaciones sobre {TipoAuditoria/DESCRIPCION} - #ActionResults:TipoAuditoria_UpdateEntity/error","Title":"Actualizar {TipoAuditoria/DESCRIPCION}","OKCaption":"Aceptar"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/Messages/TipoAuditoria/UpdateTipoAuditoriaEntityFailureMessage.action":
/*!*************************************************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/Messages/TipoAuditoria/UpdateTipoAuditoriaEntityFailureMessage.action ***!
  \*************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"UpdateTipoAuditoriaEntityFailureMessage"},"Message":"Actualizar {Auditoria/DESCRIPCION}","Title":"Aceptar"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/NavTo/Auditoria/NavToAuditoria_Create.action":
/*!************************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/NavTo/Auditoria/NavToAuditoria_Create.action ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToAuditoria_Create"},"PageToOpen":"/AuditoriaMobile/Pages/Auditoria/Auditoria_Create.page","ModalPage":true}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/NavTo/Auditoria/NavToAuditoria_Detail.action":
/*!************************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/NavTo/Auditoria/NavToAuditoria_Detail.action ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToAuditoria_Detail"},"PageToOpen":"/AuditoriaMobile/Pages/Auditoria/Auditoria_Detail.page"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/NavTo/Auditoria/NavToAuditoria_Edit.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/NavTo/Auditoria/NavToAuditoria_Edit.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToAuditoria_Edit"},"PageToOpen":"/AuditoriaMobile/Pages/Auditoria/Auditoria_Edit.page","ModalPage":true}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/NavTo/Auditoria/NavToAuditoria_List.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/NavTo/Auditoria/NavToAuditoria_List.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToAuditoria_List"},"PageToOpen":"/AuditoriaMobile/Pages/Auditoria/Auditoria_List.page"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/NavTo/Auditoria/NavToAuditoria_Table.action":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/NavTo/Auditoria/NavToAuditoria_Table.action ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToAuditoria_Table"},"PageToOpen":"/AuditoriaMobile/Pages/Auditoria/Auditoria_Table.page"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/NavTo/TipoAuditoria/NavToTipoAuditoria_Edit.action":
/*!******************************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/NavTo/TipoAuditoria/NavToTipoAuditoria_Edit.action ***!
  \******************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToTipoAuditoria_Edit"},"PageToOpen":"/AuditoriaMobile/Pages/TipoAuditoria/TipoAuditoria_Edit.page","ModalPage":true}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/NavTo/TipoAuditoria/NavToTipoAuditoria_List.action":
/*!******************************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/NavTo/TipoAuditoria/NavToTipoAuditoria_List.action ***!
  \******************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToTipoAuditoria_List"},"PageToOpen":"/AuditoriaMobile/Pages/TipoAuditoria/TipoAuditoria_List.page"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/NavToTipoAuditoria_Detail.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/NavToTipoAuditoria_Detail.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToTipoAuditoria_Detail"},"PageToOpen":"/AuditoriaMobile/Pages/TipoAuditoria/TipoAuditoria_Detail.page"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/OnExistMessage.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/OnExistMessage.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"OnExistMessage"},"Message":"¿Esta seguro que desea salir?","Title":"Cerrar sesión","OKCaption":"Aceptar"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/PushRegister.action":
/*!***********************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/PushRegister.action ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.PushNotificationRegister","ActionResult":{"_Name":"PushRegister"},"OnFailure":"/AuditoriaMobile/Actions/PushRegisterFailureMessage.action","OnSuccess":"/AuditoriaMobile/Actions/PushRegisterSuccessMessage.action"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/PushRegisterFailureMessage.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/PushRegisterFailureMessage.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"PushRegisterFailureMessage"},"Message":"Las actualizaciones no se pudieron aplicar.","Title":"Operación fallida","OKCaption":"Aceptar"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Actions/PushRegisterSuccessMessage.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Actions/PushRegisterSuccessMessage.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"PushRegisterSuccessMessage"},"OnSuccess":"/AuditoriaMobile/Rules/Service/Initialize.js","Message":"Las actualizaciones se aplicaron con éxito.","Title":"Actualizado","OKCaption":"Aceptar"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Globals/Application/AppDefinition_Version.global":
/*!********************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Globals/Application/AppDefinition_Version.global ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Globals/Application/ApplicationName.global":
/*!**************************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Globals/Application/ApplicationName.global ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"MDK App","_Type":"String"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Globals/Application/SupportEmail.global":
/*!***********************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Globals/Application/SupportEmail.global ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"String","Value":"emorales@emmsa.net"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Globals/Application/SupportPhone.global":
/*!***********************************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Globals/Application/SupportPhone.global ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1-800-677-7271","_Type":"String"}

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Services/Auditoria.service":
/*!**********************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Services/Auditoria.service ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"Auditoria","OfflineEnabled":true,"SourceType":"Mobile","RestService":false}

/***/ }),

/***/ "./build.definitions/version.mdkbundlerversion":
/*!*****************************************************!*\
  !*** ./build.definitions/version.mdkbundlerversion ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = "1.1\n";

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/Styles/Styles.json":
/*!**************************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/Styles/Styles.json ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"ActionBar":{"background-color":"#2f4c92"},"MainButton":{"font-color":"#f5f6f7","background-color":"#2f4c92"},"Icon":{"font-color":"#f5f6f7"},"MainFooter":{"font-color":"#f5f6f7","background-color":"#2f4c92"}}');

/***/ }),

/***/ "./build.definitions/AuditoriaMobile/jsconfig.json":
/*!*********************************************************!*\
  !*** ./build.definitions/AuditoriaMobile/jsconfig.json ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"include":["Rules/**/*",".typings/**/*"]}');

/***/ }),

/***/ "./build.definitions/tsconfig.json":
/*!*****************************************!*\
  !*** ./build.definitions/tsconfig.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"compilerOptions":{"module":"esnext","target":"es2019","moduleResolution":"node","lib":["esnext","dom"],"experimentalDecorators":true,"emitDecoratorMetadata":true,"removeComments":true,"inlineSourceMap":true,"noEmitOnError":false,"noEmitHelpers":true,"baseUrl":".","plugins":[{"transform":"@nativescript/webpack/dist/transformers/NativeClass","type":"raw"}]},"exclude":["node_modules"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./build.definitions/application-index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bundle.js.map