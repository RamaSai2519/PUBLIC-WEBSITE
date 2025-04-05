import React from "react";
export interface FAQData {
  title: string;
  details: React.ReactNode; // Allows JSX content
}

import { helpNumber } from "@/utils/helpers";

export const data:FAQData[] = [
  {
    title: "How can Sukoon Unlimited make a difference in my life?",
    details:
    (
      <>
      Sukoon Unlimited can make a meaningful difference in your life by offering a supportive community where you can connect with others, share experiences, and find companionship. Whether you're looking for emotional support, learning new skills, or just someone to chat with, Sukoon provides a space where you’re always valued. It helps you stay engaged, enjoy meaningful activities, and find a sense of purpose. Through Sarathis, coaches, and events, Sukoon ensures you’re never alone, enriching your life with joy, friendship, and opportunities for growth.
      </>
    ),
  },
  {
    title: "Who are Sukoon Sarathis, and how can they support me?",
    details: (
      <>
        <p>Sukoon Sarathis are experienced seniors who offer guidance, companionship, and support within the Sukoon Unlimited community. With a wealth of life experience, they are dedicated to helping others navigate the challenges of aging, while creating meaningful connections.</p>
        <p>Sukoon Sarathis provide emotional support, offer valuable advice, and share their experiences to inspire others. They also provide companionship and help build lasting friendships, ensuring that every senior feels valued and connected.</p>
      </>
    ),
  },
  {
    title: "What community events does sukoon unlimited offer and why should I join?",
    details:(
      <>
      <p>Sukoon Unlimited offers a variety of community events designed to bring seniors together for connection, fun, and growth. These include:</p>
      <ul>
        <li><strong>Meetups & Social Gatherings:</strong> Opportunities to connect with like-minded people through informal gatherings, hobbies, and shared experiences.</li>
        <li><strong>Workshops & Learning Sessions:</strong> Educational events where you can learn new skills, stay active, and explore topics that interest you.</li>
        <li><strong>Support Groups:</strong>Safe spaces to discuss life’s challenges, share experiences, and receive encouragement.</li>
        <li><strong>Special Interest Groups:</strong>Events focused on activities like fitness, arts, music, and more, providing a chance to discover new passions.</li>
      </ul>
      <p>Joining Sukoon Unlimited's community events helps you stay engaged, find new friendships, and add joy to your life. Whether it’s a simple conversation or learning something new, these events help you live a fulfilling, connected, and enriched life.</p>
      </>
    ),
  },
  
  {
    title: "What’s the process of becoming a member?",
    details:(
      <>
      <p>Becoming a part of Sukoon Unlimited is simple and effortless. <strong><a href="https://sukoonunlimited.com/">Sign up on our website or download the app</a></strong> to join with just a click—designed especially for seniors. Step into a warm and inclusive community where friendships flourish, experiences enrich, and every day brings connection, support, and joy</p>
      </>
    )
      
  },
  {
    title: "What is Support Groups, and how can they help me?",
    details:(
      <>
      <p>Our Therapist-led Support Groups provide a safe space to discuss challenges like anxiety, depression, and life changes. Led by trained professionals, these groups offer a chance to share your experiences and gain support from others who understand what you're going through.</p>
      </>
    )
  },
];
