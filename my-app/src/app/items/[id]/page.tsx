import SpecificItemWrapper from "@/app/components/specificItemsWrapper";

export default async function ItemDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  return (
    <div>
      <SpecificItemWrapper id={id} />
    </div>
  );
}
