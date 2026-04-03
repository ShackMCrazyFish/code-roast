import Link from "next/link";
import { CodePreview } from "../CodePreview";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function PostCard({ post }: { 
  post: {
    id: number,
    title: string,
    codeSnippet: string,
    language: string,
    commentsCount: number,
    upvotes: number,
    tags: string[],
    author: {
      username: string,
      avatar: string
    },
    createdAt: Date
  } 
}) {
  function formatDistance(createdAt: Date, arg1: Date): import("react").ReactNode {
    const distance = Math.floor((arg1.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
    if (distance < 1) {
      return 'today';
    } else if (distance < 2) {
      return 'yesterday';
    } else {
      return `${distance} days ago`;
    }
    
  }

  return (
    <article className="border rounded-lg hover:shadow-md transition bg-white">
      {/* Заголовок */}
      <Link href={`/post/${post.id}`} className="block p-4 pb-2">
        <h2 className="font-semibold text-lg hover:text-blue-600">
          {post.title}
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
          <Avatar className="h-6 w-6 rounded-lg">
            <AvatarImage src={post.author.avatar} alt={post.author.username} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <span>@{post.author.username}</span>
          <span>•</span>
          <time>{formatDistance(post.createdAt, new Date())}</time>
        </div>
      </Link>
      
      {/* Превью кода (не интерактивное!) */}
      <div className="px-4 pb-2">
        <CodePreview 
          code={post.codeSnippet} 
          language={post.language}
          maxLines={5} // Показываем только 5 строк
        />
      </div>
      
      {/* Футер карточки */}
      <div className="flex items-center justify-between px-4 py-3 border-t bg-gray-50 rounded-b-lg">
        <div className="flex items-center gap-4 text-sm">
          <button className="flex items-center gap-1 hover:text-blue-600">
            💬 {post.commentsCount}
          </button>
          <button className="flex items-center gap-1 hover:text-green-600">
            👍 {post.upvotes}
          </button>
        </div>
        <div className="flex gap-1">
          {/* {post.tags.slice(0, 3).map(tag => (
            <Tag key={tag} name={tag} size="sm" />
          ))} */}
        </div>
      </div>
    </article>
  );
}