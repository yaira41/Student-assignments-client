import { useState, useEffect } from "react";

const useClassNumbers = (dataService) => {
  const [classNumbers, setClassNumbers] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClassNumbers = async () => {
      setIsLoading(true);
      try {
        const response = await (await dataService.getClassesNumbers()).json();
        setClassNumbers(response);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch class numbers:", err);
        setError(err);
        setClassNumbers({});
      } finally {
        setIsLoading(false);
      }
    };

    fetchClassNumbers();
  }, [dataService]);

  return { classNumbers, setClassNumbers, error, isLoading };
};

export default useClassNumbers;
