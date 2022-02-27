"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePatient = exports.updatePatient = exports.createPatient = exports.getPatient = exports.getPatients = void 0;
const mysql_config_1 = require("../config/mysql.config");
const response_1 = require("../domain/response");
const code_enum_1 = require("../enum/code.enum");
const status_enum_1 = require("../enum/status.enum");
const patient_query_1 = require("../query/patient.query");
const getPatients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    try {
        const pool = yield (0, mysql_config_1.connection)();
        const result = yield pool.query(patient_query_1.QUERY.SELECT_PATIENTS);
        return res
            .status(code_enum_1.Code.OK)
            .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, "Patients retrieved", result[0]));
    }
    catch (error) {
        console.error(error);
        return res
            .status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, "An error ocurred!"));
    }
});
exports.getPatients = getPatients;
const getPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    try {
        const pool = yield (0, mysql_config_1.connection)();
        const result = yield pool.query(patient_query_1.QUERY.SELECT_PATIENT, [
            req.params.patientId
        ]);
        if (result[0].length > 0) {
            return res
                .status(code_enum_1.Code.OK)
                .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, "Patient retrieved", result[0]));
        }
        else {
            return res
                .status(code_enum_1.Code.NOT_FOUND)
                .send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, "Patient not found!"));
        }
    }
    catch (error) {
        console.error(error);
        return res
            .status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, "An error ocurred!"));
    }
});
exports.getPatient = getPatient;
const createPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    let patient = Object.assign({}, req.body);
    try {
        const pool = yield (0, mysql_config_1.connection)();
        const result = yield pool.query(patient_query_1.QUERY.CREATE_PATIENT, Object.values(patient));
        patient = Object.assign({ id: result[0].insertId }, req.body);
        return res
            .status(code_enum_1.Code.CREATED)
            .send(new response_1.HttpResponse(code_enum_1.Code.CREATED, status_enum_1.Status.CREATED, "Patient created", patient));
    }
    catch (error) {
        console.error(error);
        return res
            .status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, "An error ocurred!"));
    }
});
exports.createPatient = createPatient;
const updatePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    let patient = Object.assign({}, req.body);
    try {
        const pool = yield (0, mysql_config_1.connection)();
        const result = yield pool.query(patient_query_1.QUERY.SELECT_PATIENT, [
            req.params.patientId
        ]);
        if (result[0].length > 0) {
            const result = yield pool.query(patient_query_1.QUERY.UPDATE_PATIENT, [...Object.values(patient), req.params.patientId]);
            return res
                .status(code_enum_1.Code.OK)
                .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, "Patient updated", Object.assign(Object.assign({}, patient), { id: req.params.patientId })));
        }
        else {
            return res
                .status(code_enum_1.Code.NOT_FOUND)
                .send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, "Patient not updated because it was not found!"));
        }
    }
    catch (error) {
        console.error(error);
        return res
            .status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, "An error ocurred!"));
    }
});
exports.updatePatient = updatePatient;
const deletePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    let patient = Object.assign({}, req.body);
    try {
        const pool = yield (0, mysql_config_1.connection)();
        const result = yield pool.query(patient_query_1.QUERY.SELECT_PATIENT, [
            req.params.patientId
        ]);
        if (result[0].length > 0) {
            const result = yield pool.query(patient_query_1.QUERY.DELETE_PATIENT, [req.params.patientId]);
            return res
                .status(code_enum_1.Code.OK)
                .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, "Patient deleted"));
        }
        else {
            return res
                .status(code_enum_1.Code.NOT_FOUND)
                .send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, "Patient not deleted because it was not found!"));
        }
    }
    catch (error) {
        console.error(error);
        return res
            .status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, "An error ocurred!"));
    }
});
exports.deletePatient = deletePatient;
