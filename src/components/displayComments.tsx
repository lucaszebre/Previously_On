/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCommentsEpisodes } from '@/actions/getCommentsEpisodes';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { commentEpisode } from '@/actions/commentEpisode';
import { Textarea } from "@/components/ui/textarea"
import { Button } from './ui/button';
import { getUserInfo } from '@/actions/getUserInfo';
import CommentCard from './Comment';

interface Comment {
  id: number;
  user_id: number;
  login: string;
  avatar: string;
  date: string;
  text: string;
}

const DisplayComments = ({ id }: { id: string }) => {
  const [commentText, setCommentText] = useState('');

  const { data, isLoading, isError, error } = useQuery<Comment[]>({
    queryFn: async () => {
      const data = await getCommentsEpisodes(id);
      return data.comments; 
    },
    queryKey: ['comments', id],
    enabled: true,
  });

  const queryClient = useQueryClient()
  const commentMutation = useMutation(
   
    {
      mutationFn: async (text:string) => {

         await commentEpisode(id, text);

         return 
      },
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['comments', id] });
      },
    }
  );

  const currentUser = useQuery({
    queryFn: async () => {
      const data = await getUserInfo() as any
      console.log(data,'inside the header')
      return data  
    },
    queryKey: ['currentuser'],
    enabled: true,
  })

  if (isLoading && currentUser.isLoading) {
    return <div>Loading comments...</div>;
  }

  if (isError) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return <div>Error loading comments: {errorMessage}</div>;
  }

  
  

  return (
    <div className='flex flex-col gap-8 justify-start'>
      <h2 className='font-bold text-2xl'>
        Comments
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(commentText)
          commentMutation.mutate(commentText);
          setCommentText('');
        }}
        className="comment-form mt-4"
      >
        <Textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-2 border border-gray-300 rounded"
          required
        ></Textarea>
        <Button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={commentMutation.isPending}
        >
          {commentMutation.isPending ? 'Posting...' : 'Post Comment'}
        </Button>
      </form>

      {data?.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          episodeId={parseInt(id) }
          currentUserId={currentUser.data?.member.id ? currentUser.data.member.id : 233}
        />
      ))}
    </div>
  );
};

export default DisplayComments;
