/* eslint-disable no-unused-vars */
import type { Base } from './base';
import type { Query } from './query';
import { Version } from './version';

export interface Leiaute extends Base {
	name: string;
	prefix: string;
	version: Version;
	active: boolean;
	description: string;
	version_id?: string;
	event_type?: string;
}

export type Create = Pick<Leiaute, 'name' | 'prefix' | 'version'>;

export interface ExtractData {
	extracts: { [key: string]: number | string }[];
}

export interface Column {
	key: string;
	type: 'string' | 'number';
}

export interface ColumnData {
	columns: Column[];
}

export type ExtractRequest = Pick<Extract, 'version' | 'prefix'> & {
	leiautes: FormData;
};

export interface Extract extends Base {
	e_social_id: string;
	event_type: string;
	leiaute_id?: string;
	prefix?: string;
	version?: string;
	count: number;
}

export interface LeiauteQuery extends Query {
	id?: string;
	prefix: LeiautePrefix;
	version: LeiauteVersion;
	e_social_id?: string;
	export_type?: 'json' | 'csv' | 'xlsx';
	columns?: string;
}

export type LeiautePrefix = keyof typeof LeiautePrefixEnum;
export type LeiauteVersion = keyof typeof LeiauteVersionEnum;

export enum LeiautePrefixEnum {
	// TABELAS/EVENTOS INICIAIS
	S1000 = 'S1000',
	S1005 = 'S1005',
	S1010 = 'S1010',
	S1020 = 'S1020',
	S1070 = 'S1070',

	// EVENTOS PERIÓDICOS
	S1200 = 'S1200',
	S1202 = 'S1202',
	S1207 = 'S1207',
	S1210 = 'S1210',
	S1260 = 'S1260',
	S1270 = 'S1270',
	S1280 = 'S1280',
	S1298 = 'S1298',
	S1299 = 'S1299',

	// EVENTOS NÃO PERIÓDICOS

	S2190 = 'S2190',
	S2200 = 'S2200',
	S2205 = 'S2205',
	S2206 = 'S2206',
	S2210 = 'S2210',
	S2220 = 'S2220',
	S2230 = 'S2230',
	S2240 = 'S2240',
	S2231 = 'S2231',
	S2298 = 'S2298',
	S2299 = 'S2299',
	S2300 = 'S2300',
	S2306 = 'S2306',
	S2399 = 'S2399',
	S2400 = 'S2400',
	S2405 = 'S2405',
	S2410 = 'S2410',
	S2416 = 'S2416',
	S2418 = 'S2418',
	S2420 = 'S2420',
	S3000 = 'S3000',
	S2500 = 'S2500',
	S2501 = 'S2501',
	S3500 = 'S3500',

	// RETORNOS
	S5001 = 'S5001',
	S5002 = 'S5002',
	S5003 = 'S5003',
	S5011 = 'S5011',
	S5012 = 'S5012',
	S5013 = 'S5013',
}

export enum LeiauteVersionEnum {
	S_1_0 = 'S_1_0',
	S_1_1 = 'S_1_1',
}

export enum LeiauteVersionNormalize {
	'S_1_0' = '1.0',
	'S_1_1' = '1.1',
}

export enum ColumnNormalize {
	string = 'Texto/Caractere',
	number = 'Inteiro/Decimal',
}

export const LeiauteStatusList = [
	{
		id: '1a3f6205-8c8a-4ea3-9b9c-21b8c2f592a1',
		label: 'Ativo',
		value: 'active',
	},
	{
		id: ' f1dcb8e4-6e08-4d7a-b8e2-3f1e6e5f98d7',
		label: 'Inativo',
		value: 'inactive',
	},
];

export const LeiauteVersionList = [
	{
		id: '1a3f6205-8c8a-4ea3-9b9c-21b8c2f532a1',
		label: '1.0',
		value: 'S_1_0',
	},
	{
		id: ' f1dcb8e4-6e08-4d7a-b8e2-3f1e6e5e98d7',
		label: '1.1',
		value: 'S_1_1',
	},
];
