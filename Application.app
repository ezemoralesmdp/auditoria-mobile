{
	"MainPage": "/AuditoriaMobile/Pages/Main.page",
	"OnLaunch": [
		"/AuditoriaMobile/Rules/Service/Initialize.js"
	],
	"OnWillUpdate": "/AuditoriaMobile/Rules/Application/OnWillUpdate.js",
	"OnDidUpdate": "/AuditoriaMobile/Actions/PushRegister.action",
	"OnUserSwitch": "/AuditoriaMobile/Actions/Auditoria/Service/SyncStartedMessage.action",
	"Styles": "/AuditoriaMobile/Styles/Styles.less",
	"Version": "/AuditoriaMobile/Globals/Application/AppDefinition_Version.global",
	"Localization": "/AuditoriaMobile/i18n/i18n.properties",
	"_SchemaVersion": "24.7",
	"_Name": "AuditoriaMobile"
}