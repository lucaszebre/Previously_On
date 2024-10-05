'use server'

import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function editComment(id: number,idComment:number, text: string) {
  try {
    const cookiesStore = cookies();
    const access_token = cookiesStore.get('access_token')?.value;

    if (access_token) {

      try {
        const data = await axios.post(
          'https://api.betaseries.com/comments/comment',
          { id, type: 'episode', text,edit_id:idComment },
          {
            headers: {
              'X-BetaSeries-Key': process.env.NEXT_PUBLIC_BETASERIES_KEY || 'default_key',
              'X-BetaSeries-Token': access_token,
            },
          }
        );

        return data.data;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error(`Error ${id}:`, {
            message: err.message,
            status: err.response?.status,
            data: err.response?.data,
          });
          console.error(err.response?.data.errors);
        } else {
          console.error(`Unexpected error ${id}:`, err);
        }
      }
    } else {
      redirect('/auth');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error:', {
        message: error.message,
        code: error.code,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
      });
      throw new Error(error.message);
    } else {
      console.error('Error:', error);
      throw new Error('Server error');
    }
  }
}
