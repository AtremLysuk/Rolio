import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader width={360} height={500}>
    <rect x="14" y="318" rx="0" ry="0" width="349" height="203" /> 
    <circle cx="185" cy="119" r="104" />
  </ContentLoader>
);

export default Skeleton;
