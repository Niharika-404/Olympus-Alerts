import { useState, useEffect } from 'react';
import axios from 'axios';

const useDataFetching = (initialData, apiEndpoint, requestData) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post(apiEndpoint, requestData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const resultData = response.data.alerts;
        console.log('Raw response data:', resultData); // Log the raw response data
        setData(resultData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiEndpoint, requestData]);

  console.log('Options:', requestData); // Log the requestData options

  return { data, loading };
};

export default useDataFetching;
