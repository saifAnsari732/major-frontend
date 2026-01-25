import React, { useEffect } from 'react'
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';
const AI = () => {
    useEffect(() => {
		createChat({
			webhookUrl: 'http://localhost:5678/webhook/332260a3-3c80-438b-9809-a9e6ab653069/chat'
		});
	}, []);
  return (
    <div className='absolute top-2 h-screen w-full'>

    </div>
  )
}

export default AI