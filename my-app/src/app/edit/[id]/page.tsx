import EditItem from "@/app/components/EditItem";

export default async function EditItemPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return <EditItem id={id} />;
}
