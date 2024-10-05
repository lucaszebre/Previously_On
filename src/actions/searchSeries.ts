'use server'

import betaseries from '@api/betaseries';

export async function searchSeries(title:string) {


  try {
    
    betaseries.auth('b510be640b15');

    
    const series = (await betaseries.getSearchShows({text:title})).data




    return series

    
  } catch (error) {
    console.error('Error getting the series:', error);
    
  }
}