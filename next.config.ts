import MDX from "@next/mdx";
import type { NextConfig } from "next/types";

const withMDX = MDX();

const nextConfig: NextConfig = {
	reactStrictMode: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
	output: "export",
	distDir: ".next",
	images: {
		unoptimized: true,
		remotePatterns: [
			{ hostname: "files.stripe.com" },
			{ hostname: "d1wqzb5bdbcre6.cloudfront.net" },
			{ hostname: "*.blob.vercel-storage.com" },
		],
		formats: ["image/avif", "image/webp"],
	},
	transpilePackages: ["next-mdx-remote", "commerce-kit"],
	experimental: {
		esmExternals: true,
		scrollRestoration: true,
		ppr: false,
		cpus: 1,
		reactCompiler: true,
		mdxRs: true,
		inlineCss: true,
	},
	webpack: (config) => {
		return {
			...config,
			resolve: {
				...config.resolve,
				extensionAlias: {
					".js": [".js", ".ts"],
					".jsx": [".jsx", ".tsx"],
				},
			},
		};
	},
	rewrites: async () => [
		{
			source: "/stats/:match*",
			destination: "https://eu.umami.is/:match*",
		},
	],
};

export default withMDX(nextConfig);
