import dynamic from 'next/dynamic';

const Story = dynamic(() => import('../../components/story_components.js'), {
  ssr: false,
});

export default Story;