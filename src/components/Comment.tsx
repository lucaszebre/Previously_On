import React, { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment } from '@/actions/deleteComment';
import { editComment } from '@/actions/editComment';
import { Pencil, Trash2 } from 'lucide-react';

interface CommentProps {
  comment: Comment;
  currentUserId: number | null;
  episodeId: number | null;

}

interface Comment {
  id: number;
  user_id: number;
  login: string;
  avatar: string;
  date: string;
  text: string;
}

const CommentCard: React.FC<CommentProps> = ({
  comment,
  currentUserId,
  episodeId

}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);
    const queryClient = useQueryClient()
    const editCommentMutation = useMutation({
        mutationFn: async ({id,comment_id}:{id:number,comment_id:number}) => {
          try {
    
            await editComment(id,comment_id,editText) 
    
            
          } catch (error) {
              console.log(error)
          }
        },
        onSuccess: ()=>{
          queryClient.invalidateQueries({ queryKey: ['comments'] });
          
        }
      }) 
  const handleEdit = () => {
    setIsEditing(true);
    setEditText(comment.text);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditText(comment.text);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    editCommentMutation.mutate({id:episodeId ? episodeId: 2,comment_id:comment.id})
    setIsEditing(false);
  };



  const deleteCommentMutation = useMutation({
    mutationFn: async (id:number) => {
      try {

        await deleteComment(id) 

        
      } catch (error) {
          console.log(error)
      }
    },
    onSuccess: ()=>{
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      
    }
  })  

  return (
    <Card className="comment p-4">
      <div className="comment-header flex items-center justify-between">
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src={comment.avatar} alt={comment.login} />
            <AvatarFallback>{comment.login.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <div className="font-semibold">{comment.login}</div>
            <div className="text-sm text-gray-500">
              {new Date(comment.date).toLocaleString()}
            </div>
          </div>
        </div>
        {currentUserId === comment.user_id && (
          <div className="flex space-x-2">

<Pencil  className='cursor-pointer'             onClick={handleEdit}
  />
           
           
              <Trash2 className='cursor-pointer' onClick={() => deleteCommentMutation.mutate(comment.id)} />
          </div>
        )}
      </div>
      <div className="comment-text mt-2">
        {isEditing ? (
          <form onSubmit={handleUpdate}>
            <Textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              required
            />
            <div className="flex space-x-2 mt-2">
              <Button type="submit">
                Update
              </Button>
              <Button variant="secondary" onClick={handleCancelEdit}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <p>{editText}</p>
        )}
      </div>
    </Card>
  );
};

export default CommentCard;
