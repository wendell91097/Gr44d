export const server_calls = {
    get: async (showPrivateReviews: boolean, token: string) => {
      const reviewURL = showPrivateReviews ? 'privatereviews' : 'reviews';
      const response = await fetch(`https://review-keybase.glitch.me/api/${reviewURL}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch data from the server');
      }
  
      return await response.json();
    },
  
    create: async (data: any = {}, showPrivateReviews: boolean, token: string) => {
      const reviewURL = showPrivateReviews ? 'privatereviews' : 'reviews';
      const response = await fetch(`https://review-keybase.glitch.me/api/${reviewURL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create new data on the server');
      }
  
      return await response.json();
    },
  
    update: async (id: string, data: any = {}, showPrivateReviews: boolean, token: string) => {
      const reviewURL = showPrivateReviews ? 'privatereviews' : 'reviews';
      const response = await fetch(`https://review-keybase.glitch.me/api/${reviewURL}/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update data on server');
      }
  
      return await response.json();
    },
  
    delete: async (id: string, showPrivateReviews: boolean, token: string) => {
      const reviewURL = showPrivateReviews ? 'privatereviews' : 'reviews';
      const response = await fetch(`https://review-keybase.glitch.me/api/${reviewURL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete data on server');
      }
  
      return;
    },
  };