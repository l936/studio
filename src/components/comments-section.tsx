'use client';

import type { Comment as CommentType } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useState } from 'react';

const initialComments: CommentType[] = [
  {
    id: '1',
    name: 'Hasan Mahmud',
    comment: 'আমি খুব খুশি। আমি সত্যিই এই ফ্রি 100GB Internet উপহার পেয়েছি। আপনি ও এখনই এটি পেতে পারেন!',
    time: '31m ago',
    profilePictureUrl: PlaceHolderImages.find((p) => p.id === 'pfp-hasan')!.imageUrl,
    imageHint: PlaceHolderImages.find((p) => p.id === 'pfp-hasan')!.imageHint,
  },
  {
    id: '2',
    name: 'Aminul Islam',
    comment: 'ফ্রি 100GB Internet! আমাকে এটি দেওয়ার জন্য আপনাকে ধন্যবাদ। আপনি ও এখনই এটি পেতে পারেন!',
    time: '2h ago',
    profilePictureUrl: PlaceHolderImages.find((p) => p.id === 'pfp-aminul')!.imageUrl,
    imageHint: PlaceHolderImages.find((p) => p.id === 'pfp-aminul')!.imageHint,
  },
  {
    id: '3',
    name: 'Farzana Rahman',
    comment: 'I am disappointed. I got only 75GB!',
    time: '1d ago',
    profilePictureUrl: PlaceHolderImages.find((p) => p.id === 'pfp-farzana')!.imageUrl,
    imageHint: PlaceHolderImages.find((p) => p.id === 'pfp-farzana')!.imageHint,
  },
  {
    id: '4',
    name: 'Nafisa Begum',
    comment: 'আশ্চর্য.. তুমিও কি আমার মতো ১০০GB পেয়েছো?',
    time: '5m',
    profilePictureUrl: PlaceHolderImages.find((p) => p.id === 'pfp-nafisa')!.imageUrl,
    imageHint: PlaceHolderImages.find((p) => p.id === 'pfp-nafisa')!.imageHint,
  },
];

function CommentCard({ comment }: { comment: CommentType }) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="flex items-start space-x-4">
      <Avatar>
        <AvatarImage src={comment.profilePictureUrl} alt={comment.name} data-ai-hint={comment.imageHint} />
        <AvatarFallback>{getInitials(comment.name)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="bg-secondary rounded-lg p-3">
          <p className="font-semibold text-card-foreground">{comment.name} <span className="text-xs text-muted-foreground font-normal">{comment.time}</span></p>
          <p className="text-sm text-muted-foreground">{comment.comment}</p>
        </div>
        <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1 pl-3">
          <button className="hover:underline">Like</button>
          <span>&middot;</span>
          <button className="hover:underline">Reply</button>
        </div>
      </div>
    </div>
  );
}

export function CommentsSection() {
  const [comments, setComments] = useState<CommentType[]>(initialComments);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">What people are saying</h2>
      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
