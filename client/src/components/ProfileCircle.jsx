// src/components/ProfileCircle.jsx
import React from 'react';

export default function ProfileCircle({ name }) {
    // Get the first two initials
    const initials = name
        ? name
              .split(' ')
              .map((word) => word[0])
              .join('')
              .substring(0, 2)
              .toUpperCase()
        : 'NA';

    return (
        <div
            className="bg-white text-blue-600 font-bold rounded-full flex items-center justify-center"
            style={{ width: 40, height: 40 }}
            title={name}
        >
            {initials}
        </div>
    );
}
