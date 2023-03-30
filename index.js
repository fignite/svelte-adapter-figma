import path from 'path';
import fs from 'fs';
import { platforms } from './platforms.js';

/** @type {import('.').default} */
export default function (options) {
	return {
		name: 'adapter-figma',

		async adapt(builder) {
			const dest = builder.getBuildDirectory('figma');

			builder.rimraf(dest);

			const dest_dir = `${dest}${builder.config.kit.paths.base}`;

			const prerendered_pages = builder.writePrerendered(dest_dir);

			for (const page of pages) {

				console.log(page)
			}
		}
	};
}
