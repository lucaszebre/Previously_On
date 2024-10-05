/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSeriesVideo } from '@/actions/getSerieVideo';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { YouTubeEmbed } from '@next/third-parties/google';

const DisplayVideo = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useQuery({
    queryFn: async () => {
      const data = await getSeriesVideo(id);
      return data as any;
    },
    queryKey: ['videoserie', id],
    enabled: true,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading videos.</p>;
  }

  if (data && data.videos.length > 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 my-10">
        {data.videos.map((video: any) => {
          if (video.host === 'youtube') {
            return (
              <div key={video.id} className="video-player">
                <YouTubeEmbed videoid={video.slug} />
                <span className='line-clamp-1 font-bold text-xl'>
                    {video.title}
                </span>
              </div>
            );
          } else if (video.host === 'dailymotion') {
            return (
              <div key={video.id} className="video-player">
              <iframe
                  src={`https://www.dailymotion.com/embed/video/${video.slug}`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; fullscreen"
                  title={video.title}
                ></iframe>
                  <span className='line-clamp-1 font-bold text-xl'>
                    {video.title}
                </span>
            </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    );
  }

  return null;
};

export default DisplayVideo;

