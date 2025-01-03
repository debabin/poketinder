import { CheckIcon, LucideCircleFadingPlus } from 'lucide-react';
import { useState } from 'react';

import {
  Badge,
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  pokemonTypesVariants,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
  Separator
} from '@/components/ui';
import { cn } from '@/lib/utils';

const MAX_SHOWN_TYPES = 3;

interface TypesComboboxProps {
  disabled?: boolean;
  items: { label: string; value: string }[];
  values: string[];
  onSelect: (value: string[]) => void;
}

export const TypesCombobox = ({ values, onSelect, items, disabled }: TypesComboboxProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover modal onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          className='h-9 border-dashed text-sm font-normal text-foreground'
          disabled={disabled}
          size='sm'
          variant='outline'
        >
          <LucideCircleFadingPlus className='mr-2 size-4' />
          <div>Choose types</div>
          {!!values.length && (
            <>
              <Separator className='mx-2 h-4' orientation='vertical' />
              <Badge className='rounded-sm px-1 text-xs font-normal lg:hidden' variant='secondary'>
                {values.length}
              </Badge>
              <div className='hidden space-x-1 lg:flex'>
                {values.length > MAX_SHOWN_TYPES && (
                  <Badge className='rounded-sm px-1 text-xs font-normal' variant='secondary'>
                    {values.length}
                  </Badge>
                )}
                {values.length <= MAX_SHOWN_TYPES &&
                  items
                    .filter((item) => values.includes(item.value))
                    .map((item) => (
                      <Badge
                        key={item.value}
                        className='rounded-sm px-1 text-xs font-normal'
                        variant='secondary'
                      >
                        <span className='max-w-[90px] truncate'>{item.label}</span>
                      </Badge>
                    ))}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandList>
            <CommandInput placeholder='Search types' />
            <CommandEmpty>No types found</CommandEmpty>
            <ScrollArea className={cn('max-h-[220px] overflow-auto', !items.length && 'hidden')}>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={item.value}
                    className={cn(
                      values.includes(item.value) && 'bg-foreground/5',
                      'cursor-pointer'
                    )}
                    onSelect={() => {
                      if (values.includes(item.value)) {
                        onSelect(values.filter((value) => value !== item.value));
                      } else {
                        onSelect([...values, item.value]);
                      }
                    }}
                  >
                    <div className='capitalize flex gap-2 items-center p-1'>
                      <div
                        className={cn(
                          pokemonTypesVariants({ type: item.value }),
                          'size-4 rounded-full'
                        )}
                      />
                      <div>{item.label}</div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
