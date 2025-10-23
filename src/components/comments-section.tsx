'use client';

import type { Comment as CommentType } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useState, useActionState, useRef, useEffect } from 'react';
import { ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { generateComment } from '@/app/actions';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { useFormStatus } from 'react-dom';

const initialComments: CommentType[] = [
  {
    id: '1',
    name: 'Hasan Mahmud',
    comment: 'আমি খুব খুশি। আমি সত্যিই এই ফ্রি 100GB Internet উপহার পেয়েছি। আপনি ও এখনই এটি পেতে পারেন!',
    time: '31m ago',
    profilePictureUrl: PlaceHolderImages.find((p) => p.id === 'pfp-hasan')!.imageUrl,
    imageHint: PlaceHolderImages.find((p) => p.id === 'pfp-hasan')!.imageHint,
    likes: 152,
  },
  {
    id: '2',
    name: 'Aminul Islam',
    comment: 'ফ্রি 100GB Internet! আমাকে এটি দেওয়ার জন্য আপনাকে ধন্যবাদ। আপনি ও এখনই এটি পেতে পারেন!',
    time: '2h ago',
    profilePictureUrl: PlaceHolderImages.find((p) => p.id === 'pfp-aminul')!.imageUrl,
    imageHint: PlaceHolderImages.find((p) => p.id === 'pfp-aminul')!.imageHint,
    likes: 88,
  },
  {
    id: '3',
    name: 'Farzana Rahman',
    comment: 'I am disappointed. I got only 75GB!',
    time: '1d ago',
    profilePictureUrl: PlaceHolderImages.find((p) => p.id === 'pfp-farzana')!.imageUrl,
    imageHint: PlaceHolderImages.find((p) => p.id === 'pfp-farzana')!.imageHint,
    likes: 12,
  },
  {
    id: '4',
    name: 'Nafisa Begum',
    comment: 'আশ্চর্য.. তুমিও কি আমার মতো ১০০GB পেয়েছো?',
    time: '5m',
    profilePictureUrl: PlaceHolderImages.find((p) => p.id === 'pfp-nafisa')!.imageUrl,
    imageHint: PlaceHolderImages.find((p) => p.id === 'pfp-nafisa')!.imageHint,
    likes: 210,
  },
];

function CommentCard({ comment }: { comment: CommentType }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likes);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };
  
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
        <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1 pl-3">
          <button onClick={handleLike} className={cn('hover:underline', liked && 'text-primary font-bold')}>
            Like
          </button>
          <span>&middot;</span>
          <button className="hover:underline">Reply</button>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ThumbsUp className="w-3 h-3 text-primary" />
              <span>{likeCount}</span>
            </div>
        </div>
      </div>
    </div>
  );
}

const initialState = {
  newComment: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Posting...' : 'Post Comment'}
    </Button>
  );
}

export function CommentsSection() {
  const [comments, setComments] = useState<CommentType[]>(initialComments);
  const [state, formAction] = useActionState(generateComment, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.newComment) {
      setComments((prevComments) => [state.newComment!, ...prevComments]);
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">What people are saying</h2>

      <div className="bg-card border rounded-lg p-4">
        <h3 className="font-semibold mb-2">Add a comment</h3>
        <form action={formAction} ref={formRef} className="space-y-4" id="comment-form">
          <Input name="name" id="name" placeholder="Your name" required />
          {state.error?.name && <p className="text-red-500 text-sm">{state.error.name[0]}</p>}
          <Textarea name="comment" placeholder="Write your comment..." required />
          {state.error?.comment && <p className="text-red-500 text-sm">{state.error.comment[0]}</p>}
          <SubmitButton />
          {state.error?.form && <p className="text-red-500 text-sm">{state.error.form[0]}</p>}
        </form>
      </div>

      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
