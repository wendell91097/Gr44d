import { useState } from 'react'

export const usePrivacyToggle = (defaultPrivacy: boolean, updatePrivacy: (value: boolean) => void) => {
    const [privacy, setPrivacy] = useState<boolean>(defaultPrivacy);
  
    const togglePrivacy = () => {
      setPrivacy(!privacy);
      updatePrivacy(!privacy);
    };
  
    return {
      privacy,
      togglePrivacy
    };
  };