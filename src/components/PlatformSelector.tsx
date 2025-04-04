
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Instagram, Twitter, TiktokIcon } from './SocialIcons';

export type Platform = 'instagram' | 'twitter' | 'tiktok';

interface PlatformSelectorProps {
  selectedPlatforms: Platform[];
  onTogglePlatform: (platform: Platform) => void;
  className?: string;
}

const PlatformSelector = ({ selectedPlatforms, onTogglePlatform, className }: PlatformSelectorProps) => {
  return (
    <div className={cn("space-y-2 animate-fade-in", className)}>
      <label className="text-sm font-medium">Select platforms</label>
      <div className="flex flex-wrap gap-2">
        <PlatformButton
          platform="instagram"
          icon={<Instagram />}
          label="Instagram"
          isSelected={selectedPlatforms.includes('instagram')}
          onClick={() => onTogglePlatform('instagram')}
        />
        <PlatformButton
          platform="twitter"
          icon={<Twitter />}
          label="Twitter"
          isSelected={selectedPlatforms.includes('twitter')}
          onClick={() => onTogglePlatform('twitter')}
        />
        <PlatformButton
          platform="tiktok"
          icon={<TiktokIcon />}
          label="TikTok"
          isSelected={selectedPlatforms.includes('tiktok')}
          onClick={() => onTogglePlatform('tiktok')}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Select the platforms where you'll be posting
      </p>
    </div>
  );
};

interface PlatformButtonProps {
  platform: Platform;
  icon: React.ReactNode;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const PlatformButton = ({ 
  platform, 
  icon, 
  label, 
  isSelected, 
  onClick 
}: PlatformButtonProps) => {
  return (
    <Button
      type="button"
      variant={isSelected ? "default" : "outline"}
      className={cn(
        "flex items-center gap-2 px-4 py-2 h-auto",
        isSelected && "relative"
      )}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
      {isSelected && (
        <span className="absolute -top-1 -right-1 bg-primary rounded-full w-5 h-5 flex items-center justify-center">
          <Check className="h-3 w-3 text-white" />
        </span>
      )}
    </Button>
  );
};

export default PlatformSelector;
