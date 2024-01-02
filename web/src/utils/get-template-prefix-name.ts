export function getTemplatePrefixName(prefix: string): string {
	const regex_template = /(S\d{4})|(S-\d{4})/;
	const is_template = prefix
		.split('.')[0]
		.match(regex_template) as RegExpMatchArray;
	return is_template[0].includes('-')
		? is_template[0]
		: is_template[0].replace('S', 'S-');
}
