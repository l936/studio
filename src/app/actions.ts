'use server';

import {
  personalizeOfferText as personalizeOfferTextFlow,
  PersonalizeOfferTextInput,
} from '@/ai/flows/personalize-offer-text';
import {
  generateVisualSocialProof as generateVisualSocialProofFlow,
  GenerateVisualSocialProofInput,
} from '@/ai/flows/generate-visual-social-proof';
import { z } from 'zod';

const personalizeSchema = z.object({
  interests: z
    .string()
    .min(10, { message: 'Please describe your interests in a bit more detail.' })
    .max(200),
});

export async function personalizeOffer(prevState: any, formData: FormData) {
  const validatedFields = personalizeSchema.safeParse({
    interests: formData.get('interests'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.interests?.[0],
      personalizedOffer: null,
    };
  }

  const offerDescription =
    'Get 100GB of blazing fast 4G internet for free! This offer is available for all major networks including Grameenphone, Banglalink, Airtel, Robi, and Teletalk. Enjoy seamless streaming, gaming, and browsing without any cost.';

  try {
    const input: PersonalizeOfferTextInput = {
      offerDescription,
      userInterests: validatedFields.data.interests,
    };
    const result = await personalizeOfferTextFlow(input);
    return {
      personalizedOffer: result.personalizedOfferText,
      error: null,
    };
  } catch (e) {
    return {
      error: "We couldn't personalize this offer right now. Please try again later.",
      personalizedOffer: null,
    };
  }
}

const commentSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }).max(50),
  comment: z.string().min(10, { message: 'Comment must be at least 10 characters.' }).max(200),
});

export async function generateComment(prevState: any, formData: FormData) {
  const validatedFields = commentSchema.safeParse({
    name: formData.get('name'),
    comment: formData.get('comment'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
      newComment: null,
    };
  }

  try {
    const input: GenerateVisualSocialProofInput = {
      userName: validatedFields.data.name,
      comment: validatedFields.data.comment,
    };
    const result = await generateVisualSocialProofFlow(input);

    const newComment = {
      id: new Date().toISOString(),
      name: validatedFields.data.name,
      comment: result.commentText,
      time: 'Just now',
      profilePictureUrl: result.profilePicture,
    };

    return {
      newComment,
      error: null,
    };
  } catch (e) {
    console.error(e);
    return {
      error: { form: ["We couldn't generate the comment right now. Please try again later."] },
      newComment: null,
    };
  }
}
