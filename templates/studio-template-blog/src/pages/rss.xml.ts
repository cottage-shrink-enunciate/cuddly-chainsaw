import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { Blog, db } from 'astro:db';

export async function GET(context: APIContext) {
	const posts = await db.select().from(Blog);
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site!,
		items: posts.map((post) => ({
			title: post.title,
			description: post.description,
			link: `/blog/${post.slug || post.id}`,
			pubDate: post.publishedAt,
			content: post.content,
		})),
	});
}
