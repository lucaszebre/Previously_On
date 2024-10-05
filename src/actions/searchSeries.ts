'use server'

import betaseries from '@api/betaseries';

export async function searchSeries(title:string) {


  try {
    
    betaseries.auth(process.env.NEXT_PUBLIC_BETASERIES_KEY as string);

    
    const series = (await betaseries.getSearchShows({text:title})).data




    return series

    
  } catch (error) {
    console.error('Error getting the series:', error);
    
  }
}