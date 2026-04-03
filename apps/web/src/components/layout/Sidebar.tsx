import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

export function Sidebar() {
  const tags = [{name: 'tag1'}, {name: 'tag2'}, {name: 'tag3'}, {name: 'tag4'}, {name: 'tag5'}];
  const topUsers = [{id: 1, name: 'user1'}, {id: 2, name: 'user2'}, {id: 3, name: 'user3'}];
  return (
    <aside className="w-80 space-y-6 hidden lg:block">
      {/* Популярные теги */}
      <section className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-3">🔥 Popular tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <Badge key={tag.name}>{tag.name}</Badge>
          ))}
        </div>
      </section>
      
      {/* Топ авторов */}
      <section className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-3">👑 Top authors</h3>
        <AvatarGroup className="grayscale">
          {topUsers.map(user => (
              <Avatar key={user.id}>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
          ))}
          <AvatarGroupCount>+3</AvatarGroupCount>
        </AvatarGroup>
      </section>
      
      {/* Статистика */}
      <section className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-3">📊 Today&apos;s stats</h3>
        {/* <StatItem label="Новых постов" value="1.2k" />
        <StatItem label="Ревью" value="3.4k" /> */}
      </section>
    </aside>
  );
}