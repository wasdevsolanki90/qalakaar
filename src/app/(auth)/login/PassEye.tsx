import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function PassEye() {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };
  return (
    <div className="relative w-full sm:w-3/4">
      <Input 
            placeholder="Password" 
            name="password"
            type={passwordVisible ? 'text' : 'password'} 
            className="w-full pr-10 bg-white"
        />
      <button 
          type="button" 
          onClick={togglePasswordVisibility} 
          className="absolute inset-y-0 right-0 px-3 flex items-center focus:outline-none"
      >
          {passwordVisible ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
      </button>
    </div>
  )
}
