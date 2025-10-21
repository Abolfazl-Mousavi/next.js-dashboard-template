// config/site.ts
export interface SiteConfig {
	name: string;
	description: string;
	url: string;
	ogImage: string;
	author: string;
	keywords: string[];
	links: {
		twitter?: string;
		github?: string;
		linkedin?: string;
		[key: string]: string | undefined;
	};
}

export const siteConfig: SiteConfig = {
	name: "Tavana Portal",
	description: "",
	url: "",
	ogImage: "",
	author: "Tavana Gold Team",
	keywords: [],
	links: {
		twitter: "https://twitter.com/",
		github: "https://github.com/",
		linkedin: "https://linkedin.com/",
	},
} as const;

export type SiteConfigKeys = keyof typeof siteConfig;
