'use client'
import { useState, useEffect } from 'react';

import ImageUploadForm  from './ImageUploadForm';

export default function UploadBar(){

    return(
        <div className="flex items-center text-white rounded-lg w-full bg-white bg-opacity-20 px-4 py-2 mb-6">
             <ImageUploadForm />
        </div>
    )
}