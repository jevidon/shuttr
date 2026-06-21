import { Info } from 'lucide-react';

type DisclosureNoteProps = {
  children: string;
};

export function DisclosureNote({ children }: DisclosureNoteProps) {
  return (
    <p className="disclosure-note">
      <Info size={16} aria-hidden="true" />
      {children}
    </p>
  );
}
