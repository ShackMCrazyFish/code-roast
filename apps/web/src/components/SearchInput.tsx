import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";
import { Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function SearchInput( { count }: { count?: number } ) {
  return (
    <InputGroup className="max-w-xs">
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon>
        <HugeiconsIcon icon={Search01Icon} />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">{count ? `${count} results` : '13 results'}</InputGroupAddon>
    </InputGroup>
  );
}