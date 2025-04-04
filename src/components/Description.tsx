
import React from 'react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface DescriptionProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const Description = ({ value, onChange, className }: DescriptionProps) => {
  return (
    <div className={cn("space-y-2 animate-fade-in", className)}>
      <Label htmlFor="description">Description</Label>
      <Textarea
        id="description"
        placeholder="Describe your image (e.g. sunset at the beach with palm trees)"
        className="resize-none min-h-[120px]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <p className="text-xs text-muted-foreground">
        Add details about your image to generate more relevant hashtags
      </p>
    </div>
  );
};

export default Description;
