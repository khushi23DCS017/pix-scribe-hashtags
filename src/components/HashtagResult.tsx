
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface HashtagResultProps {
  hashtags: string[];
  className?: string;
}

const HashtagResult = ({ hashtags, className }: HashtagResultProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 2000);
      
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  const copyToClipboard = () => {
    const hashtagsText = hashtags.join(' ');
    navigator.clipboard.writeText(hashtagsText);
    setCopied(true);
    
    toast({
      title: "Copied to clipboard!",
      description: "Hashtags are ready to paste",
    });
  };

  if (hashtags.length === 0) return null;

  return (
    <div className={cn("animate-slide-up", className)}>
      <Card className="card-gradient">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Your Hashtags</CardTitle>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={copyToClipboard}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy All</span>
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap">
            {hashtags.map((hashtag, index) => (
              <span key={index} className="hashtag">
                {hashtag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HashtagResult;
