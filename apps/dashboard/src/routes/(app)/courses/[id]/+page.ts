export const ssr = false;

export const load = ({ params }) => {
  return {
    courseId: params.id || ''
  };
};
