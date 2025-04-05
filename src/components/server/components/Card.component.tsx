import React from 'react';

interface EventServerCardProps {
  title: string; // The title of the card
  description: string; // The description text
  imageSrc: string; // The image source URL
}

const EventServerCard: React.FC<EventServerCardProps> = ({
  title,
  description,
  imageSrc,
}) => {
  return (
    <div
      key={`${title}-event-card`}
      className="flex flex-row items-center  border-black border-l-[1px] border-r-4 border-t-[1px] border-b-4  rounded-lg shadow-md p-4 gap-4 max-w-sm"
    >
      {/* Image */}
      <img
        src={imageSrc}
        alt={title}
        className="w-16 h-16 object-cover rounded-lg"
        key={`${title}-event-card-image`}
      />

      {/* Text Content */}
      <div className="flex flex-col">
        <h2 key="event-card-title" className="text-lg font-bold text-gray-900">
          {title}
        </h2>
        <p key="event-card-description" className="text-sm text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
};

export default EventServerCard;
