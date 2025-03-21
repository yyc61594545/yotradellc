import { getLocale } from "@/i18n/server";
import { formatMoney } from "@/lib/utils";
import { accountGet, productGet, productBrowse } from "commerce-kit";
import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const revalidate = false;

export async function generateStaticParams() {
	const products = await productBrowse({ first: 100 });
	return products.map((product) => ({
		slug: product.metadata.slug,
	}));
}

export const size = {
	width: 1200,
	height: 630,
};

export const contentType = "image/png";
export const alt = "";

export default async function Image(props: { params: { slug: string } }) {
	const locale = await getLocale();
	const [accountResult, [product]] = await Promise.all([
		accountGet(),
		productGet({ slug: props.params.slug }),
	]);

	if (!product) {
		return new ImageResponse(
			(
				<div
					style={{
						width: '100%',
						height: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: '#fff',
					}}
				>
					<div style={{ fontSize: 48, fontWeight: 600, color: '#000' }}>
						Product Not Found
					</div>
				</div>
			),
			size
		);
	}

	return new ImageResponse(
		<div
			style={{ fontFamily: "sans-serif" }}
			tw="bg-neutral-100 w-full h-full flex flex-row items-stretch justify-center"
		>
			<div tw="flex-1 flex justify-center items-center">
				<div
					style={{
						backgroundImage: `url(${product.images[0]})`,
						backgroundSize: "600px 630px",
						backgroundPosition: "center center",
						width: "600px",
						height: "630px",
						display: "flex",
					}}
				/>
			</div>
			<div tw="flex-1 flex flex-col items-center justify-center border-l border-neutral-200">
				<div tw="w-full mt-8 text-left px-16 font-normal text-4xl">
					{accountResult?.account?.business_profile?.name ?? "Your Next Store"}
				</div>
				<div tw="flex-1 -mt-8 flex flex-col items-start justify-center px-16">
					<p tw="font-black text-5xl mb-0">{product.name}</p>
					<p tw="font-normal text-neutral-800 mt-0 text-3xl">
						{formatMoney({
							amount: product.default_price.unit_amount ?? 0,
							currency: product.default_price.currency,
							locale,
						})}
					</p>
					<p tw="font-normal text-xl max-h-[7rem]">{product.description}</p>
				</div>
			</div>
		</div>,
		{
			...size,
		},
	);
}
