
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { SparklesIcon, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HashtagGeneratorProps {
  imageFile: File | null;
  description: string;
  selectedPlatforms: string[];
  onGenerateHashtags: (hashtags: string[]) => void;
  className?: string;
}

const HashtagGenerator = ({
  imageFile,
  description,
  selectedPlatforms,
  onGenerateHashtags,
  className,
}: HashtagGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerateHashtags = async () => {
    if (!imageFile && !description) {
      toast({
        title: "Missing content",
        description: "Please upload an image or provide a description",
        variant: "destructive",
      });
      return;
    }

    if (selectedPlatforms.length === 0) {
      toast({
        title: "No platforms selected",
        description: "Please select at least one social media platform",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    // Simulate API call for hashtag generation (replace with actual API call)
    setTimeout(() => {
      // Mock response - In a real app, this would come from the API
      const generatedHashtags = [
        "#photography", "#nature", "#travel", "#instagood", 
        "#photooftheday", "#beautiful", "#picoftheday", "#art", 
        "#happy", "#love", "#fashion", "#followme", "#summer", 
        "#style", "#instadaily", "#sunset", "#smile", "#friends", 
        "#fitness", "#amazing", "#life", "#beauty", "#nofilter"
      ];
      
      // Filter to get random subset (simulating platform-specific tags)
      const randomSubset = [...generatedHashtags]
        .sort(() => 0.5 - Math.random())
        .slice(0, 12);
      
      onGenerateHashtags(randomSubset);
      setIsGenerating(false);
      
      toast({
        title: "Hashtags generated!",
        description: "Your hashtags are ready to use",
      });
    }, 2000);
  };

  return (
    <div className={cn("flex justify-center animate-fade-in", className)}>
      <Button
        onClick={handleGenerateHashtags}
        disabled={isGenerating}
        className="px-8 py-6 h-auto text-lg group"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <SparklesIcon className="mr-2 h-5 w-5 group-hover:animate-pulse" />
            Generate Hashtags
          </>
        )}
      </Button>
    </div>
  );
};

export default HashtagGenerator;
