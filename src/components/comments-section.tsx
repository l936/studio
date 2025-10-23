'use client';

import type { Comment as CommentType } from '@/lib/types';
import { generateComment } from '@/app/actions';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useRef, useState, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

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
    comment: 'ফ্রি 100GB Internet! আমাকে এটি দেওয়ার জন্য আপনাকে ধন্যবাদ। আপনি ও এখনই এটি পেতে পারেন!',
    time: '2h ago',
    profilePictureUrl: PlaceHolderImages.find((p) => p.id === 'pfp-aminul')!.imageUrl,
    imageHint: PlaceHolderImages.find((p) => p.id === 'pfp-aminul')!.imageHint,
  },
  {
    id: '3',
    name: 'Farzana Rahman',
    comment: 'I am disappointed, I got only 75GB!',
    time: '1d ago',
    profilePictureUrl: PlaceHolderImages.find((p) => p.id === 'pfp-farzana')!.imageUrl,
    imageHint: PlaceHolderImages.find((p) => p.id === 'pfp-farzana')!.imageHint,
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
    <div className="flex items-start space-x-4 animate-in fade-in duration-500">
      <Avatar>
        <AvatarImage src={comment.profilePictureUrl} alt={comment.name} data-ai-hint={comment.imageHint} />
        <AvatarFallback>{getInitials(comment.name)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="bg-secondary rounded-lg p-3">
          <p className="font-semibold text-card-foreground">{comment.name}</p>
          <p className="text-sm text-muted-foreground">{comment.comment}</p>
        </div>
        <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1 pl-3">
          <button className="hover:underline">Like</button>
          <span>&middot;</span>
          <button className="hover:underline">Reply</button>
          <span>&middot;</span>
          <span>{comment.time}</span>
        </div>
      </div>
    </div>
  );
}

const addCommentInitialState = { newComment: null, error: null };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? 'Posting...' : 'Post Comment with AI'} <Send className="ml-2 h-4 w-4" />
    </Button>
  );
}

function AddCommentForm({ onCommentAdded }: { onCommentAdded: (comment: CommentType) => void }) {
  const [state, formAction] = useActionState(generateComment, addCommentInitialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.newComment) {
      onCommentAdded(state.newComment);
      formRef.current?.reset();
      toast({
        title: 'Comment Added!',
        description: 'Your AI-enhanced comment has been posted.',
      });
    }
    if (state.error?.form) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.error.form[0],
      });
    }
  }, [state, onCommentAdded, toast]);

  return (
    <form action={formAction} ref={formRef} className="w-full space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Your Name</Label>
        <Input id="name" name="name" placeholder="e.g., Jane Doe" required />
        {state.error?.name && (
          <p className="text-sm font-medium text-destructive">{state.error.name[0]}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="comment">Your Comment</Label>
        <Textarea id="comment" name="comment" placeholder="Share your experience with the offer..." required />
        {state.error?.comment && (
          <p className="text-sm font-medium text-destructive">{state.error.comment[0]}</p>
        )}
      </div>
      <SubmitButton />
    </form>
  );
}

export function CommentsSection() {
  const [comments, setComments] = useState<CommentType[]>(initialComments);

  const handleCommentAdded = (newComment: CommentType) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle>Comments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </CardContent>
      <CardFooter className="flex-col items-start gap-4 border-t bg-secondary/30 p-6">
        <h3 className="font-semibold text-lg">Leave a comment</h3>
        <AddCommentForm onCommentAdded={handleCommentAdded} />
      </CardFooter>
    </Card>
  );
}
