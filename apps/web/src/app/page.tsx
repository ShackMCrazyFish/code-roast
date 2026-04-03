// import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostCard } from "@/components/posts/PostCard";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function HomePage() {
  // const [filters, setFilters] = useState({ language: null, tags: [] });
  const filters = { language: 'javascript', tags: [] };
  // const { data: posts, fetchNextPage, hasNextPage } = useInfiniteQuery(...);
  const posts = [
    {
      id: 1, 
      title: 'post1', 
      codeSnippet: 'console.log("Hello, world!");', 
      language: 'javascript', 
      commentsCount: 10, 
      upvotes: 10, 
      tags: ['tag1', 'tag2', 'tag3'],
      author: {
        username: 'john_doe',
        avatar: 'https://github.com/shadcn.png'
      },
      createdAt: new Date()
    }, 
    {
      id: 2,
      title: 'post2', 
      codeSnippet: 'console.log("Hello, world!");', 
      language: 'javascript', 
      commentsCount: 10, 
      upvotes: 10, 
      tags: ['tag1', 'tag2', 'tag3'],
      author: {
        username: 'john_doe',
        avatar: 'https://github.com/shadcn.png'
      },
      createdAt: new Date()
    }, 
    {
      id: 3,
      title:
      'post3',
      codeSnippet: 'console.log("Hello, world!");',
      language: 'javascript',
      commentsCount: 10,
      upvotes: 10,
      tags: ['tag1', 'tag2', 'tag3'],
      author: {
        username: 'john_doe',
        avatar: 'https://github.com/shadcn.png'
      },
      createdAt: new Date()
    },
  ];
  
  return (
    <div>
      {/* Фильтры и вкладки */}
      <div className="bg-white rounded-lg border p-4 flex flex-wrap gap-4 items-center">
        <Tabs defaultValue="hot" className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="hot">🔥 Hot</TabsTrigger>
            <TabsTrigger value="new">🆕 New</TabsTrigger>
            <TabsTrigger value="following">👤 Following</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex gap-2 ml-auto">
          <Select>
            <SelectTrigger className="w-full max-w-48">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Language</SelectLabel>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="c++">C++</SelectItem>
                <SelectItem value="c#">C#</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full max-w-48">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort</SelectLabel>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="old">Old</SelectItem>  
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Список постов */}
      <div className="space-y-4">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      
      {/* Пагинация / Infinite scroll */}
      {/* {hasNextPage && (
        <button 
          onClick={() => fetchNextPage()}
          className="w-full py-3 text-center text-blue-600 hover:bg-blue-50 rounded-lg"
        >
          Загрузить ещё ↓
        </button>
      )} */}
        
    </div>
  );
}