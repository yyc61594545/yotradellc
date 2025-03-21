import { productBrowse } from "commerce-kit";
import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const revalidate = false;

export async function generateStaticParams() {
  const products = await productBrowse({ first: 100 });
  return products.map((product) => ({
    slug: product.metadata.slug,
  }));
}

export default async function Image() {
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
        <div
          style={{
            fontSize: 48,
            fontWeight: 600,
            color: '#000',
          }}
        >
          Product Image
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
} 