'use client';

import { Button } from './ui/button';
import { ThumbsUp, MessageCircle, Share2 } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function SocialProof() {
  const [likes, setLikes] = useState(153000);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  const handleCommentClick = () => {
    document.getElementById('comment-form')?.scrollIntoView({ behavior: 'smooth' });
    document.getElementById('name')?.focus();
  };
  
  const formatCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(0)}k`;
    }
    return count;
  };

  return (
    <Card className="shadow-md">
      <CardContent className="p-4">
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-4 flex-wrap gap-2">
          <span>{`Adi, Esther Nurul & ${formatCount(likes)} others`}</span>
          <div className="flex gap-4">
            <span>153k comments</span>
            <span>337 shares</span>
          </div>
        </div>
        <div className="grid grid-cols-3 divide-x border-t pt-2">
          <Button variant="ghost" onClick={handleLike} className={cn('text-muted-foreground hover:text-primary rounded-none', liked && 'text-primary font-bold')}>
            <ThumbsUp className="mr-2 h-4 w-4" /> Like
          </Button>
          <Button variant="ghost" onClick={handleCommentClick} className="text-muted-foreground hover:text-accent rounded-none">
            <MessageCircle className="mr-2 h-4 w-4" /> Comment
          </Button>
          <Button variant="ghost" className="text-muted-foreground hover:text-accent rounded-none">
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
