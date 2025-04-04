
import React, { useState } from 'react';
import Header from '@/components/Header';
import ImageUpload from '@/components/ImageUpload';
import Description from '@/components/Description';
import PlatformSelector, { Platform } from '@/components/PlatformSelector';
import HashtagGenerator from '@/components/HashtagGenerator';
import HashtagResult from '@/components/HashtagResult';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(['instagram']);
  const [generatedHashtags, setGeneratedHashtags] = useState<string[]>([]);

  const handleTogglePlatform = (platform: Platform) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight animate-fade-in">
              Generate Perfect <span className="bg-gradient-brand bg-clip-text text-transparent">Hashtags</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto animate-fade-in">
              Upload an image, add a description, and get AI-generated hashtags optimized for your favorite social platforms.
            </p>
          </div>

          <Card className="hover-scale">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ImageUpload
                  onImageChange={setImageFile}
                />
                
                <div className="space-y-6">
                  <Description
                    value={description}
                    onChange={setDescription}
                  />
                  
                  <PlatformSelector
                    selectedPlatforms={selectedPlatforms}
                    onTogglePlatform={handleTogglePlatform}
                  />
                </div>
              </div>
              
              <div className="mt-8">
                <HashtagGenerator
                  imageFile={imageFile}
                  description={description}
                  selectedPlatforms={selectedPlatforms}
                  onGenerateHashtags={setGeneratedHashtags}
                />
              </div>
            </CardContent>
          </Card>
          
          {generatedHashtags.length > 0 && (
            <HashtagResult hashtags={generatedHashtags} />
          )}
        </div>
      </main>

      <footer className="py-6 border-t">
        <div className="container">
          <p className="text-sm text-center text-muted-foreground">
            © {new Date().getFullYear()} PixScribe Hashtags. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
