import { getBlogPostById } from "../../action";
import EditBlogForm from "./EditBlogForm";
import { notFound } from "next/navigation";

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const post = await getBlogPostById(params.id);

  if (!post) {
    notFound();
  }

  return <EditBlogForm post={post} />;
}