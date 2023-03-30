import path from 'path';
import fs from 'fs';
import { platforms } from './platforms.js';
import { inlineSource } from 'inline-source';

/** @type {import('.').default} */
export default function (options) {
	return {
		name: 'adapter-figma',

		async adapt(builder) {
			const dest = builder.getBuildDirectory('figma');
			const tmp = builder.getBuildDirectory('figma_tmp');

			builder.rimraf(dest);
			builder.rimraf(tmp);
			builder.mkdirp(tmp);

			const dest_dir = `${dest}${builder.config.kit.paths.base}`;
			const tmp_dir = `${tmp}${builder.config.kit.paths.base}`;


			const written_files = builder.writeClient(dest_dir);
			const prerendered_pages = builder.writePrerendered(dest_dir);

			// console.log(prerendered_pages)

			for (const page of prerendered_pages) {

				const htmlpath = path.resolve(dest_dir, page)
				const tmphtmlpath = path.resolve(tmp_dir, page)
				// const data = fs.readFileSync(htmlpath, { encoding: 'utf8', flag: 'r' })

				// console.log(data)

				// console.log(path.resolve(dest_dir))

				try {
					const html = await inlineSource(htmlpath, {
						attribute: false,
						compress: false,
						rootpath: dest_dir,
						ignore: ['png'],
						// handlers: [function (source, context) {
						// 	if (source.type == 'js') {
						// 		console.log(source)
						// 		source.content = "Hey! I'm overriding the file's content!";
						// 	}
						// 	else {

						// 	}
						// 	return Promise.resolve();
						// }]
					});

					fs.writeFile(tmphtmlpath, html, (err) => {
						if (err)
							console.log(err);
						else {
							// console.log(fs.readFileSync("books.txt", "utf8"));
						}
					});

				} catch (err) {
					console.log(err)

				}
			}
		}
	};
}
